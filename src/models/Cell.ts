import { Figure, FigureNames } from "./figures/Figure";
import { Queen } from "./figures/Queen";
import { Pawn } from "./figures/Pawn";
import { Board } from "./Board";
import { Colors } from "./Colors";
import { Player } from "./Player";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean; //можно ли переместить фигуру
  id: number; // для реакт ключей

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    figure: Figure | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target);
      if (target.figure) {
        this.board.addLostFigure(target.figure);
      }
      target.setFigureForLoop(this.figure, target);
      //  if (
      //this.figure.canMove(this) &&
      //   target.figure?.name === FigureNames.KING
      //  ) {
      //   console.log("шах");
      //  }
      this.pawnToQueenCheck(target);
      this.figure = null;
    }
  }
  pawnToQueenCheck(target: Cell): void {
    let xColor = null;
    if (
      this.figure?.name === FigureNames.PAWN &&
      (target.y === 0 || target.y === 7)
    ) {
      if (this.figure.color === Colors.BLACK) {
        xColor = Colors.BLACK;
      } else {
        xColor = Colors.WHITE;
      }
      new Queen(xColor, target);
    }
  }

  setFigureForLoop(figure: Figure, target: Cell) {
    this.figure = figure;
    this.figure.cell = this;
  }
  //кольцевая зависимость. Рефакторинг?

  isEmpty(): boolean {
    return this.figure === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.figure) {
      return this.figure?.color !== target.figure.color;
    }
    return false;
  }

  isEmptyVertical(target: Cell) {
    if (this.x !== target.x) {
      return false;
    }

    const min = Math.min(this.y, target.y);
    const max = Math.max(this.y, target.y);

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyHorizontal(target: Cell) {
    if (this.y !== target.y) {
      return false;
    }

    const min = Math.min(this.x, target.x);
    const max = Math.max(this.x, target.x);

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false;
      }
    }
    return true;
  }

  isEmptyDiagonal(target: Cell) {
    const absX = Math.abs(target.x - this.x);
    const absY = Math.abs(target.y - this.y);
    if (absX !== absY) return false;

    const dy = this.y < target.y ? 1 : -1;
    const dx = this.x < target.x ? 1 : -1;

    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
        return false;
    }
    return true;
  }

  canBlackPawnMoveForward(target: Cell) {
    const check = this.y === 1 ? target.y - 2 > this.y : target.y - 1 > this.y;

    if (this.x !== target.x || target.y < this.y || check) {
      return false;
    }
    if (!this.board.getCell(this.x, this.y + 2).isEmpty()) {
      return false;
    }
    return true;
  }
  canWhitePawnMoveForward(target: Cell) {
    const check = this.y === 6 ? target.y + 2 < this.y : target.y + 1 < this.y;

    if (this.x !== target.x || target.y > this.y || check) {
      return false;
    }
    if (!this.board.getCell(this.x, this.y - 2).isEmpty() && this.y === 6) {
      return false;
    }
    return true;
  }
}
