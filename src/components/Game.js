import React, { useState } from "react";
import { checkWinner, checkDraw } from "../utilityFunctions/checkWinner";
import Field from "./Field";
import GameStart from "./GameStart";

// a játék lehetséges fázisai enumként
let gamePhase = {
  START: 0,
  GAME: 1,
  WINNER: 2,
  DRAW: 3,
};

const Game = () => {
  // A játékhoz szükséges adatok.
  // A field a fieldsize input alapján dinamikusan feltöltött.
  // A játékos nevek szintén inputra változnak
  const [gameData, setGameData] = useState({
    field: [],
    gameState: gamePhase.START,
    isFirstPlayer: true,
    fieldSize: 10,
    player1: "játékos1",
    player2: "játékos2",
  });

  // A pályára érkező kattintások kezelése. Csak a játék fázisban, figyelembe véve, hogy ki az aktuális játékos.
  // A módosítás után ellenőrzés, hogy győzött-e a játékos vagy betelt-e az összes mező (döntetlen)
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

  // A játék elindtása után a fieldsize alapján elkotódik meg a field mátrix,
  // a gamestate pedig átvált, kezdődik a játék
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
    setGameData({ ...gameData, field: newField, gameState: gamePhase.GAME });
  };

  // A fieldsize mező inputját kezeli
  const handleFieldSizeChange = (e) => {
    setGameData({ ...gameData, [e.target.name]: e.target.value });
  };

  // Az új játék gombra kattintva a gamestate startra vált
  const handleStartNewGameClick = () => {
    setGameData({ ...gameData, gameState: gamePhase.START });
  };

  return (
    <div>
      <h1>Amőba</h1>
      {/* nevek megjelenítése */}
      <p>
        {gameData.player1} (X) vs {gameData.player2} (O)
      </p>

      {/* a játék kezdeti szakasza */}
      {gameData.gameState === gamePhase.START && (
        <GameStart
          handleSubmit={handleSubmit}
          handleFieldSizeChange={handleFieldSizeChange}
          fieldSize={gameData.fieldSize}
        />
      )}

      {/* Győztes kiírása a játék végén */}
      {gameData.gameState === gamePhase.WINNER && (
        <div>
          <p>
            Játék vége. A győztes:{" "}
            {gameData.isFirstPlayer
              ? gameData.player1 + " (X)"
              : gameData.player2 + " (O)"}
          </p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {/* kiírás döntetlen esetén */}
      {gameData.gameState === gamePhase.DRAW && (
        <div>
          <p>Játék vége. Döntetlen.</p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {/* soron következő játékos kiírása */}
      {gameData.gameState === gamePhase.GAME && (
        <div>
          <p>
            {gameData.isFirstPlayer
              ? "Következik: " + gameData.player1 + " (X)"
              : "Következik: " + gameData.player2 + " (O)"}
          </p>
          <button onClick={handleStartNewGameClick}>Új játék</button>
        </div>
      )}

      {/* A játékmező megjelenítése */}
      {gameData.gameState !== gamePhase.START && (
        <Field field={gameData.field} handleTileClick={handleTileClick} />
      )}
    </div>
  );
};

export default Game;
