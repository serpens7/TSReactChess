import React, { FC } from "react";
import cl from "./endOfTheGame.module.css";
import { Colors } from "../../models/Colors";
import { Player } from "../../models/Player";
import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";

interface endOfTheGameProps {
  setSelectedCell: (cell: Cell | null) => void;
  board: Board;
  visible: boolean;
  setVisible: any;
  currentPlayer: Player | null;
  restart: () => void;
}

const EndOfTheGame: FC<endOfTheGameProps> = ({
  board,
  restart,
  visible,
  setVisible,
  currentPlayer,
  setSelectedCell,
}) => {
  const rootClasses = [cl.myModal];
  let winner;
  whoIsAWinner(currentPlayer);

  if (visible) {
    rootClasses.push(cl.active);
  }

  function whoIsAWinner(currentPlayer: Player | null) {
    if (board.checkMate && currentPlayer?.color === Colors.WHITE) {
      winner = "Мат! Белый игрок";
    }
    if (currentPlayer?.color === Colors.WHITE) {
      winner = "Время вышло! Белый игрок";
    }
    if (board.checkMate && currentPlayer?.color === Colors.BLACK) {
      winner = "Мат! Черный игрок";
    }
    if (currentPlayer?.color === Colors.BLACK) {
      winner = "Время вышло! Черный игрок";
    }
  }

  const newGameStart = () => {
    restart();
    setSelectedCell(null);
    setVisible(false);
  };

  return (
    <div className={rootClasses.join(" ")}>
      <div
        className={cl.myModalContent}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>{winner} победил! </h3>
        <button className="c-button" onClick={newGameStart}>
          {" "}
          Новая игра
        </button>
      </div>
    </div>
  );
};

export default EndOfTheGame;
