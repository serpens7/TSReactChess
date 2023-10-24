import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Figure } from "./figures/Figure";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  whiteKing?: King;
  blackKing?: King;

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];

      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  public isAvailableMove(
    figure: Figure,
    currentCell: Cell,
    targetCell: Cell
  ): boolean {
    let targetFigure = targetCell.figure;
    targetCell.figure = figure;
    figure.cell = targetCell;
    currentCell.figure = null;
    let king: any;
    if (figure.color === Colors.WHITE) {
      king = this.whiteKing;
    } else {
      king = this.blackKing;
    }
    var isKingUnderAttack: boolean = this.isCellUnderAttack(
      king.cell,
      this.getOppositeColor(king.color)
    );
    figure.cell = currentCell;
    currentCell.figure = figure;
    targetCell.figure = targetFigure;

    return !isKingUnderAttack;
  }

  getOppositeColor(color: Colors) {
    if (color === Colors.WHITE) return Colors.BLACK;
    if (color === Colors.BLACK) return Colors.WHITE;
    return Colors.WHITE; //заглушка
  }

  private isCellUnderAttack(targetCell: Cell, enemyColor: Colors): boolean {
    for (let i = 0; i < this.cells.length; i++) {
      let row = this.cells[i];
      let cellWithCheckFigure = row.find(
        (cell) =>
          cell.figure &&
          cell.figure.color === enemyColor &&
          cell.figure.canMove(targetCell)
      );
      if (cellWithCheckFigure) return true;
    }
    return false;
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public addFigures() {
    this.addBishop();
    this.addQueen();
    this.addKing();
    this.addKnight();
    this.addRook();
    this.addPawn();
  }

  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.lostBlackFigures.push(figure)
      : this.lostWhiteFigures.push(figure);
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.whiteKing = this.whiteKing;
    newBoard.blackKing = this.blackKing;
    return newBoard;
  }

  public highLightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < this.cells.length; j++) {
        const target = row[j];
        target.available = !!(
          selectedCell?.figure?.canMove(target) &&
          this.isAvailableMove(selectedCell.figure, selectedCell, target)
        );
      }
    }
  }

  private addBishop() {
    new Bishop(Colors.WHITE, this.getCell(2, 7));
    new Bishop(Colors.WHITE, this.getCell(5, 7));
    new Bishop(Colors.BLACK, this.getCell(2, 0));
    new Bishop(Colors.BLACK, this.getCell(5, 0));
  }
  private addKing() {
    this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7));
    this.blackKing = new King(Colors.BLACK, this.getCell(4, 0));
    console.log(this.whiteKing);
    console.log(this.blackKing);
  }

  private addPawn() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6));
      new Pawn(Colors.BLACK, this.getCell(i, 1));
    }
  }

  private addQueen() {
    new Queen(Colors.WHITE, this.getCell(3, 7));
    new Queen(Colors.BLACK, this.getCell(3, 0));
  }

  private addKnight() {
    new Knight(Colors.WHITE, this.getCell(1, 7));
    new Knight(Colors.WHITE, this.getCell(6, 7));
    new Knight(Colors.BLACK, this.getCell(1, 0));
    new Knight(Colors.BLACK, this.getCell(6, 0));
  }

  private addRook() {
    new Rook(Colors.WHITE, this.getCell(0, 7));
    new Rook(Colors.WHITE, this.getCell(7, 7));
    new Rook(Colors.BLACK, this.getCell(0, 0));
    new Rook(Colors.BLACK, this.getCell(7, 0));
  }
}
