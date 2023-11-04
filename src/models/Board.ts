import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Figure } from "./figures/Figure";
import checkMateChecker from "./checkMateChecker";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];
  checkMate: boolean = false;
  isPawnWentTwoCellLastTurn: boolean = false;
  currentEnPassantFigure = null;

  whiteKing?: King;
  blackKing?: King;

  isRoqueAvailable(king: any, rook: any): boolean {
    //if (this.isCellUnderAttack(board.getCell(kingCell.x, kingCell.y), kingCell?.figure.color))
    const direction = king.cell.x - rook.cell.x > 0 ? 1 : -1;
    if (
      king.color === rook.color &&
      king.madeAMove === false &&
      rook.madeAMove === false &&
      this.isCellUnderAttack(king.cell, this.getOppositeColor(king.color)) &&
      !this.isCellUnderAttack(
        this.getCell(king.cell.x + direction, king.cell.y),
        this.getOppositeColor(king.color),
      ) &&
      !this.isCellUnderAttack(
        this.getCell(king.cell.x + 2 * direction, king.cell.y),
        this.getOppositeColor(king.color),
      )
    )
      return true;
    return false;
  }

  checkCheckMate(this: Board): boolean {
    for (let k = 0; k < this.cells.length; k++) {
      for (let i = 0; i < this.cells.length; i++) {
        const row = this.cells[i];
        for (let j = 0; j < this.cells.length; j++) {
          const target = row[j];
          const selectedCell = this.getCell(k, i);
          if (
            selectedCell?.figure &&
            this.isAvailableMove(selectedCell.figure, selectedCell, target)
          ) {
            console.log("nt");
            return false;
          }
        }
      }
    }
    console.log("bt");
    return true;
  }

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
    startCell: Cell,
    targetCell: Cell,
  ): boolean {
    let targetFigure = targetCell.figure;
    targetCell.figure = figure;
    figure.cell = targetCell;
    startCell.figure = null;
    let king: any;
    if (figure.color === Colors.WHITE) {
      king = this.whiteKing;
    } else {
      king = this.blackKing;
    }
    var isKingUnderAttack: boolean = this.isCellUnderAttack(
      king.cell,
      this.getOppositeColor(king.color),
    );
    figure.cell = startCell;
    startCell.figure = figure;
    targetCell.figure = targetFigure;

    return !isKingUnderAttack;
  }

  getOppositeColor(color: Colors) {
    if (color === Colors.WHITE) return Colors.BLACK;
    if (color === Colors.BLACK) return Colors.WHITE;
    return Colors.WHITE; //заглушка
  }

  public isCellUnderAttack(targetCell: Cell, enemyColor: Colors): boolean {
    for (let i = 0; i < this.cells.length; i++) {
      let row = this.cells[i];
      let cellWithCheckFigure = row.find(
        (cell) =>
          cell.figure &&
          cell.figure.color === enemyColor &&
          cell.figure.canMove(targetCell),
      );
      if (cellWithCheckFigure) return true;
    }
    return false;
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.checkMate = this.checkMate;
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
        if (
          selectedCell?.figure &&
          !this.isAvailableMove(selectedCell.figure, selectedCell, target)
        ) {
          this.checkMate = true;
        }
      }
    }
  }

  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.lostBlackFigures.push(figure)
      : this.lostWhiteFigures.push(figure);
  }

  public addFigures() {
    this.addQueen();
    this.addKing();
    this.addKnight();
    this.addRook();
    this.addBishop();
    this.addPawn();
  }

  private addBishop() {
    new Bishop(Colors.WHITE, this.getCell(2, 7), this);
    new Bishop(Colors.WHITE, this.getCell(5, 7), this);
    new Bishop(Colors.BLACK, this.getCell(2, 0), this);
    new Bishop(Colors.BLACK, this.getCell(5, 0), this);
  }
  private addKing() {
    this.whiteKing = new King(Colors.WHITE, this.getCell(4, 7), this, false);
    this.blackKing = new King(Colors.BLACK, this.getCell(4, 0), this, false);
  }

  private addPawn() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6), this);
      new Pawn(Colors.BLACK, this.getCell(i, 1), this);
    }
  }

  private addQueen() {
    new Queen(Colors.WHITE, this.getCell(3, 7), this);
    new Queen(Colors.BLACK, this.getCell(3, 0), this);
  }

  private addKnight() {
    new Knight(Colors.WHITE, this.getCell(1, 7), this);
    new Knight(Colors.WHITE, this.getCell(6, 7), this);
    new Knight(Colors.BLACK, this.getCell(1, 0), this);
    new Knight(Colors.BLACK, this.getCell(6, 0), this);
  }

  private addRook() {
    new Rook(Colors.WHITE, this.getCell(0, 7), this, false);
    new Rook(Colors.WHITE, this.getCell(7, 7), this, false);
    new Rook(Colors.BLACK, this.getCell(0, 0), this, false);
    new Rook(Colors.BLACK, this.getCell(7, 0), this, false);
  }
}
