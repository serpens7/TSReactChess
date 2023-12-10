import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";
import { Board } from "../Board";

export class Rook extends Figure {
  alreadyMadeAMove: boolean = false;
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.name = FigureNames.ROOK;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    return false;
  }
  moveFigure(target: Cell) {
    console.log(this.madeAMove);
    super.moveFigure(target);
    console.log(this.madeAMove);
  }
}
