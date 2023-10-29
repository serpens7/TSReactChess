import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";
import { Board } from "../Board";

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.name = FigureNames.QUEEN;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    if (this.cell.isEmptyDiagonal(target)) return true;
    return false;
  }
}
