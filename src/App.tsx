import React, { useEffect, useState, useRef } from "react";
import { Board } from "./models/Board";
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures";
import EndOfTheGameComponent from "./components/Observer";
import "./App.css";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import { Cell } from "./models/Cell";

const App = () => {
  const [board, setBoard] = useState(new Board());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    console.log(newBoard);
    setCurrentPlayer(whitePlayer);
  }

  function swapPlayer(): void {
    if (currentPlayer?.color === Colors.WHITE) {
      setCurrentPlayer(blackPlayer);
    } else {
      setCurrentPlayer(whitePlayer);
    }
  }

  return (
    <div className="app">
      <EndOfTheGameComponent
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        board={board}
        currentPlayer={currentPlayer}
        restart={restart}
        swapPlayer={swapPlayer}
      />
      <BoardComponent
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
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
