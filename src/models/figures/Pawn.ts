import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";
import { Board } from "../Board";
import BoardComponent from "../../components/BoardComponent";

export class Pawn extends Figure {
  direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
  alreadyMadeAMove: boolean = false;

  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.name = FigureNames.PAWN;
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
  }

  enPassant(target: Cell) {
    let leftPassant = this.cell.board.getCell(this.cell.x - 1, this.cell.y);
    let rightPassant = this.cell.board.getCell(this.cell.x + 1, this.cell.y);

    const passantCondition = (n: Cell) => {
      if (
        n.figure &&
        n.figure?.color !== this.color &&
        n.figure?.name === FigureNames.PAWN
      ) {
        return true;
      }
      return false;
    };
    if ( 
      this.board.isPawnWentTwoCellLastTurn === true &&
      target.y === this.cell.y + this.direction &&
      ((target.x === this.cell.x - 1 && passantCondition(leftPassant)) ||
        (target.x === this.cell.x + 1 && passantCondition(rightPassant)))
    ) {
      return true;
    }

    return false;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) return false;

    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.cell.y + this.direction ||
        (!this.alreadyMadeAMove &&
          target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true; //пешка идет
    }

    if (
      target.y === this.cell.y + this.direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
      this.cell.isEnemy(target)
    )
      return true; //пешка ест

    if (this.enPassant(target)) {
      return true; //взятие на проходе
    }
    return false;
  }

  moveFigure(target: Cell) {
    super.moveFigure(target);
    this.alreadyMadeAMove = true; //условие для шага на 2 клетки

    if (Math.abs(this.cell.y - target.y) === 2) {
      this.board.isPawnWentTwoCellLastTurn = true;
    } else this.board.isPawnWentTwoCellLastTurn = false; //условие для взятия на проходе

    if (Math.abs(target.x - this.cell.x) === 1 && target.figure === null) {
      this.cell.board.getCell(target.x, target.y - this.direction).figure =
        null; //взятие на проходе
    }
  }
}
