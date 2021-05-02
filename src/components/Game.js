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
  const [gameData, setGameData] = useState({
    field: [],
    gameState: gamePhase.START,
    isFirstPlayer: true,
    fieldSize: 10,
    player1: "játékos1",
    player2: "játékos2",
  });

  const handleTileClick = (x, y) => {
    if (gameData.gameState === gamePhase.GAME) {
      let newField = [...gameData.field];
      gameData.isFirstPlayer ? (newField[x][y] = 1) : (newField[x][y] = 2);
      setGameData({ ...gameData, field: newField });
      if (checkWinner(x, y, gameData.fieldSize, gameData.field)) {
        setGameData({ ...gameData, gameState: gamePhase.WINNER });
      } else if (checkDraw(gameData.field)) {
        setGameData({ ...gameData, gameState: gamePhase.DRAW });
      } else {
        setGameData({ ...gameData, isFirstPlayer: !gameData.isFirstPlayer });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newField = [];
    for (let i = 0; i < gameData.fieldSize; i++) {
      let newRow = [];
      for (let j = 0; j < gameData.fieldSize; j++) {
        newRow.push(0);
      }
      newField.push(newRow);
    }
    console.log(newField);
    setGameData({ ...gameData, field: newField, gameState: gamePhase.GAME });
  };

  const handleFieldSizeChange = (e) => {
    // setGameData({ ...gameData, fieldSize: e.target.value });
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  const handleStartNewGameClick = () => {
    setGameData({ ...gameData, gameState: gamePhase.START });
  };

  return (
    <div>
      <h1>Amőba</h1>
      <p>
        {gameData.player1} (X) vs {gameData.player2} (O)
      </p>

      {gameData.gameState === gamePhase.START && (
        <GameStart
          handleSubmit={handleSubmit}
          handleFieldSizeChange={handleFieldSizeChange}
          fieldSize={gameData.fieldSize}
        />
      )}

      {gameData.gameState === gamePhase.WINNER && (
        <div>
          <p>
            Játék vége. A győztes:{" "}
            {gameData.isFirstPlayer ? gameData.player1 : gameData.player2}
          </p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {gameData.gameState === gamePhase.DRAW && (
        <div>
          <p>Játék vége. Döntetlen.</p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {gameData.gameState === gamePhase.GAME && (
        <div>
          <p>
            {gameData.isFirstPlayer
              ? "Következik: " + gameData.player1 + " (X)"
              : gameData.player2 + " (O)"}
          </p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {gameData.gameState !== gamePhase.START && (
        <Field field={gameData.field} handleTileClick={handleTileClick} />
      )}
    </div>
  );
};

export default Game;
