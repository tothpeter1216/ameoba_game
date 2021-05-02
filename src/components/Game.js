import React, { useState } from "react";
import { checkWinner, checkDraw } from "../utilityFunctions/checkWinner";
import Field from "./Field";
import GameStart from "./GameStart";

let gamePhase = {
  START: 0,
  GAME: 1,
  WINNER: 2,
  DRAW: 3,
};

const Game = () => {
  const [field, setfield] = useState([]);
  const [gameState, setgameState] = useState(gamePhase.START);
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [fieldSize, setfieldSize] = useState(10);

  const handleTileClick = (x, y) => {
    if (gameState === gamePhase.GAME) {
      let newField = [...field];
      isFirstPlayer ? (newField[x][y] = 1) : (newField[x][y] = 2);
      setfield(newField);
      if (checkWinner(x, y, fieldSize, field)) {
        setgameState(gamePhase.WINNER);
      } else if (checkDraw(field)) {
        setgameState(gamePhase.DRAW);
      } else {
        setIsFirstPlayer(!isFirstPlayer);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newField = [];
    for (let i = 0; i < fieldSize; i++) {
      let newRow = [];
      for (let j = 0; j < fieldSize; j++) {
        newRow.push(0);
      }
      newField.push(newRow);
    }
    setfield(newField);
    setgameState(1);
  };

  const handleFieldSizeChange = (e) => {
    setfieldSize(e.target.value);
  };

  const handleStartNewGameClick = () => {
    setgameState(0);
  };

  return (
    <div>
      <h1>Amőba</h1>

      {gameState === gamePhase.START && (
        <GameStart
          handleSubmit={handleSubmit}
          handleFieldSizeChange={handleFieldSizeChange}
          fieldSize={fieldSize}
        />
      )}

      {gameState === gamePhase.WINNER && (
        <div>
          <p>
            Játék vége. A győztes: {isFirstPlayer ? "Játékos1" : "Játékos2"}
          </p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {gameState === gamePhase.DRAW && (
        <div>
          <p>Játék vége. Döntetlen.</p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {gameState === gamePhase.GAME && (
        <div>
          <p>{isFirstPlayer ? "Játékos: X" : "Játékos: O"}</p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {gameState !== gamePhase.START && (
        <Field field={field} handleTileClick={handleTileClick} />
      )}
    </div>
  );
};

export default Game;
