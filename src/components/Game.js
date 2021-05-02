import React, { useState } from "react";
import Row from "./Row";
import { checkWinner, checkDraw } from "../utilityFunctions/checkWinner";
import Field from "./Field";
import GameStart from "./GameStart";

const Game = () => {
  const [field, setfield] = useState([]);
  const [gameState, setgameState] = useState(0);
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [fieldSize, setfieldSize] = useState(10);

  const handleTileClick = (x, y) => {
    if (gameState === 1) {
      let newField = [...field];
      isFirstPlayer ? (newField[x][y] = 1) : (newField[x][y] = 2);
      setfield(newField);
      if (checkWinner(x, y, fieldSize, field)) {
        setgameState(2);
      } else if (checkDraw(field)) {
        setgameState(3);
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

      {gameState === 0 && (
        <GameStart
          handleSubmit={handleSubmit}
          handleFieldSizeChange={handleFieldSizeChange}
          fieldSize={fieldSize}
        />
      )}

      {gameState === 2 && (
        <div>
          <p>
            Játék vége. A győztes: {isFirstPlayer ? "Játékos1" : "Játékos2"}
          </p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {gameState === 3 && (
        <div>
          <p>Játék vége. Döntetlen.</p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {gameState === 1 && <p>{isFirstPlayer ? "Játékos: 1" : "Játékos: 2"}</p>}

      {gameState && <Field field={field} handleTileClick={handleTileClick} />}
    </div>
  );
};

export default Game;
