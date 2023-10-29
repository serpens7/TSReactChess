import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import isCheckMate from "../models/checkMateChecker";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
  setSelectedCell: (cell: Cell | null) => void;
  selectedCell: Cell | null;
}

const BoardComponent: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
  setSelectedCell,
  selectedCell,
}) => {

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      if (!board.isAvailableMove(selectedCell.figure, selectedCell, cell))
        return;
      selectedCell?.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
      updateBoard();
    } else {
      if (cell.figure?.color === currentPlayer?.color) setSelectedCell(cell);
    }
    if (selectedCell) {
      setSelectedCell(null);
    }
    if (selectedCell === null && !cell.figure) {
      setSelectedCell(null);
    }
  }

  useEffect(() => {
    highLightCells();
  }, [selectedCell]);

  function highLightCells() {
    board.highLightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard); //форсапдейт компонента
  }

  return (
    <div>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedCell?.x && cell.y === selectedCell?.y
                }
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <h2 className="right-side">
        Ход {currentPlayer?.color === Colors.WHITE ? "белых" : "черных"} фигур
      </h2>
    </div>
  );
};

export default BoardComponent;
