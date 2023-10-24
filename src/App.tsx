import React, { useEffect, useState, useRef } from "react";
import { Board } from "./models/Board";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";
import "./App.css";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [previousPlayer, setPreviousPlayer] = useState<Player | null>(null);
  const savedPreviousPlayer = useRef(previousPlayer);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  function swapPlayer() {
    if (currentPlayer?.color === Colors.WHITE) {
      setPreviousPlayer(whitePlayer);
      setCurrentPlayer(blackPlayer);
    } else {
      setPreviousPlayer(blackPlayer);
      setCurrentPlayer(whitePlayer);
    }
  }

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title="Черные фигуры:" figures={board.lostBlackFigures} />
        <LostFigures title="Белые фигуры:" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
};

export default App;
