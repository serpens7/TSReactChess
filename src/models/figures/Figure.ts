import { Cell } from "../Cell";
import { Board } from "../Board";
import { Colors } from "../Colors";
import logo from "../../assets/black-king.png";

export enum FigureNames {
  FIGURE = "Figure",
  KING = "King",
  ROOK = "Rook",
  PAWN = "Pawn",
  QUEEN = "Queen",
  BISHOP = "Bishop",
  KNIGHT = "Knight",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureNames;
  id: number;
  madeAMove: boolean;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
    this.madeAMove = false;
  }
  canMove(target: Cell | undefined): boolean {
    if (target?.figure?.color === this.color) return false;
    return true;
  }

  moveFigure(target: Cell) {}
}
