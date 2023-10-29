import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";
import { Board } from "../Board";

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.name = FigureNames.KNIGHT;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  canMove(target: Cell): boolean {
    const absX = Math.abs(target.x - this.cell.x);
    const absY = Math.abs(target.y - this.cell.y);

    if (!super.canMove(target)) return false;
    if (absX + absY === 3 && absX !== 0 && absY !== 0) return true;
    return false;
  }
}
