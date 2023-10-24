import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Board } from "../Board";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-king.png";

import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  alreadyMadeAMove: boolean = false;
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureNames.KING;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  shortRoque(target: Cell): boolean {
    const shortRotate = target.x - this.cell.x;
    if (shortRotate === 2 && target.y === this.cell.y) {
      return true;
    }
    return false;
  }

  longRoque(target: Cell): boolean {
    const longRotate = target.x - this.cell.x;
    if (!this.madeAMove && longRotate === -3) {
      return true;
    }
    return false;
  }

  canMove(target: Cell): boolean {
    const absX = Math.abs(target.x - this.cell.x);
    const absY = Math.abs(target.y - this.cell.y);

    if (this.shortRoque(target)) return true;
    if (!super.canMove(target)) return false;
    if (absX <= 1 && absY <= 1) {
      return true;
    }
    return false;
  }
  moveFigure(target: Cell): void {
    super.moveFigure(target);
    this.alreadyMadeAMove = true;
  }
}
