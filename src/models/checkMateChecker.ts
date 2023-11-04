import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Board } from "./Board";
import { Player } from "./Player";
import { Figure } from "./figures/Figure";

class checkMateChecker {
  static isCheckMate(myBoard: Board): boolean {
    for (let k = 0; k < 8; k++) {
      for (let i = 0; i < 8; i++) {
        const row = myBoard.cells[i];
        for (let j = 0; j < 8; j++) {
          const target = row[j];
          const cell = myBoard.getCell(i, k);
          //  if (
          //     cell?.figure?.color !== target?.figure?.color ||
          //     cell.figure === null
          //  )
          //    continue;

          if (
            cell?.figure &&
            myBoard.isAvailableMove(cell.figure, cell, target)
          )
            return false;
        }
      }
    }
    return true;
  }
}
export default checkMateChecker;
