import React, { FC, useState, useRef, useEffect } from "react";
import { Figure } from "../models/figures/Figure";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";
import BoardComponent from "./BoardComponent";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [whiteTime, setWhiteTime] = useState(300);
  const [blackTime, setBlackTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

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

  function decrementBlackTime() {
    setBlackTime((prev) => prev - 1);
  }

  function decrementWhiteTime() {
    setWhiteTime((prev) => prev - 1);
  }

  const handleRestart = () => {
    setWhiteTime(300);
    setBlackTime(300);

    restart();
  };

  return (
    <div>
      <h2 className="marginleft">Черные: {blackTime}</h2>
      <div>
        <button className="c-button" onClick={handleRestart}>
          Перезапустить
        </button>
      </div>
      <h2 className="marginleft">Белые: {whiteTime}</h2>
    </div>
  );
};

export default Timer;
