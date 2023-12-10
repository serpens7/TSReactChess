import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Board } from "../Board";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-king.png";

import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.name = FigureNames.KING;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.board = board;
  }

  isShortRoque(target: Cell): boolean {
    const longRoque = target.x - this.cell.x;
    if (
      longRoque === 2 &&
      target.y === this.cell.y &&
      this.board.isRoqueAvailable(this, target)
    )
      return true;
    return false;
  }

  isLongRoque(target: Cell): boolean {
    const longRoque = target.x - this.cell.x;
    if (
      longRoque === -2 &&
      target.y === this.cell.y &&
      this.board.isRoqueAvailable(this, target)
    )
      return true;
    return false;
  }

  canMove(target: Cell): boolean {
    const absX = Math.abs(target.x - this.cell.x);
    const absY = Math.abs(target.y - this.cell.y);
    if (this.isShortRoque(target)) return true;
    if (this.isLongRoque(target)) return true;
    if (!super.canMove(target)) return false;

    if (absX <= 1 && absY <= 1) {
      return true;
    }
    return false;
  }
  moveFigure(target: Cell): void {
    if (this.isLongRoque(target)) {
      const rook = this.board.getCell(0, this.cell.y).figure;
      if (rook !== null) {
        const cell = this.board.getCell(3, this.cell.y);
        rook.cell.figure = null;
        rook.cell = cell;
        cell.figure = rook;
      }
    }
    if (this.isShortRoque(target)) {
      const rook = this.board.getCell(7, this.cell.y).figure;
      if (rook !== null) {
        const cell = this.board.getCell(5, this.cell.y);
        rook.cell.figure = null;
        rook.cell = cell;
        cell.figure = rook;
      }
    }
    super.moveFigure(target);
  }
}
