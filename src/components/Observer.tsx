import React, { FC, useState, useRef, useEffect } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import EndOfTheGame from "./endOfTheGame/EndOfTheGame";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";

interface EndOfTheGameComponentProps {
  board: Board;
  selectedCell: Cell | null;
  currentPlayer: Player | null;
  restart: () => void;
  swapPlayer: () => void;
  setSelectedCell: (cell: Cell | null) => void;
}

const EndOfTheGameComponent: FC<EndOfTheGameComponentProps> = ({
  setSelectedCell,
  selectedCell,
  board,
  currentPlayer,
  restart,
  swapPlayer,
}) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (whiteTime > 0 && blackTime > 0) startTimer();
    //   board.checkCheckMate();
  }, [currentPlayer]);

  useEffect(() => {
    createEndGameForm();
  }, [whiteTime, blackTime]);

  useEffect(() => {
    createEndGameForm();
  }, [board]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTime
        : decrementBlackTime;
    timer.current = setInterval(callback, 1000);
  }

  function stopTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }

  function decrementBlackTime() {
    setBlackTime((prev) => prev - 1);
  }

  function decrementWhiteTime() {
    setWhiteTime((prev) => prev - 1);
  }

  const handleRestart = () => {
    setSelectedCell(null);
    setWhiteTime(300);
    setBlackTime(300);
    setModal(false);
    restart();
  };

  const createEndGameForm = () => {
    looseCauseOfTimer();
    looseCauseOfCheckMate();
  };

  function looseCauseOfTimer() {
    if (whiteTime === 0 || blackTime === 0) {
      stopTimer();
      setModal(true);
    }
  }

  function looseCauseOfCheckMate() {
    if (board.checkMate) {
      console.log("mate");
      stopTimer();
      setModal(true);

      return;
    }
  }

  return (
    <div onChange={createEndGameForm}>
      <h2 className="marginleft">Черные: {blackTime}</h2>
      <div>
        <button
          className="c-button"
          style={{ marginRight: 30 }}
          onClick={handleRestart}
        >
          Перезапустить
        </button>
        <div>
          <EndOfTheGame
            setSelectedCell={setSelectedCell}
            board={board}
            restart={handleRestart}
            visible={modal}
            setVisible={setModal}
            currentPlayer={currentPlayer}
          ></EndOfTheGame>
        </div>
      </div>
      <h2 className="marginleft">Белые: {whiteTime}</h2>
    </div>
  );
};

export default EndOfTheGameComponent;
