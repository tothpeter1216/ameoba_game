import React, { useState } from "react";
import Row from "./Row";

const Game = () => {
  const [field, setfield] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [gameState, setgameState] = useState(1);
  const [isFirstPlayer, setIsFirstPlayer] = useState(true);
  const [fieldSize, setfieldSize] = useState(10);

  const handleTileClick = (x, y) => {
    console.log("click");
    let newField = [...field];
    isFirstPlayer ? (newField[x][y] = 1) : (newField[x][y] = 2);
    setfield(newField);
    setIsFirstPlayer(!isFirstPlayer);
    checkWinner(x, y);
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
    console.log(newField);
    setfield(newField);
  };

  const handleFieldSizeChange = (e) => {
    setfieldSize(e.target.value);
  };

  const checkWinner = (x, y) => {
    checkHorizontalWinner(x, y);
    checkVerticalWinner(x, y);
    checkDiagonalWinnerOne(x, y);
    checkDiagonalWinnerTwo(x, y);
  };

  const checkVerticalWinner = (x, y) => {
    let xPos = x + 1;
    let yPos = y;
    let point = 0;
    let type = field[x][y];
    while (xPos < 10 && xPos <= fieldSize && field[xPos][yPos] === type) {
      xPos++;
      point++;
    }
    xPos = x - 1;
    yPos = y;
    while (xPos >= 0 && xPos <= fieldSize && field[xPos][yPos] === type) {
      xPos--;
      point++;
    }
    if (point === 4) {
      alert("vertical winner");
    }
  };

  const checkHorizontalWinner = (x, y) => {
    let xPos = x;
    let yPos = y + 1;
    let point = 0;
    let type = field[x][y];
    while (field[xPos][yPos] === type) {
      yPos++;
      point++;
    }
    xPos = x;
    yPos = y - 1;
    while (field[xPos][yPos] === type) {
      yPos--;
      point++;
    }
    if (point === 4) {
      alert("horizontal winner");
    }
  };

  const checkDiagonalWinnerOne = (x, y) => {
    let xPos = x + 1;
    let yPos = y + 1;
    let point = 0;
    let type = field[x][y];
    while (xPos < 10 && xPos <= fieldSize && field[xPos][yPos] === type) {
      xPos++;
      yPos++;
      point++;
      console.log("diagonal", point);
    }
    xPos = x - 1;
    yPos = y - 1;
    while (xPos >= 0 && xPos <= fieldSize && field[xPos][yPos] === type) {
      xPos--;
      yPos--;
      point++;
    }

    if (point === 4) {
      alert("diagonal1 winner");
    }
  };

  const checkDiagonalWinnerTwo = (x, y) => {
    let xPos = x + 1;
    let yPos = y + 1;
    let point = 0;
    let type = field[x][y];
    while (xPos < 10 && xPos <= fieldSize && field[xPos][yPos] === type) {
      xPos++;
      yPos--;
      point++;
    }
    xPos = x - 1;
    yPos = y + 1;
    while (xPos >= 0 && xPos <= fieldSize && field[xPos][yPos] === type) {
      xPos--;
      yPos++;
      point++;
    }
    if (point === 4) {
      alert("diagonal2 winner");
    }
  };

  return (
    <div>
      <h1>Amőba</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fieldSize">Add meg az amőba pálya méretét: </label>
        <input
          type="number"
          name="fieldSize"
          id="fieldSize"
          onChange={handleFieldSizeChange}
          value={fieldSize}
          min="5"
          max="10"
        />
        <button type="submit">Start</button>
      </form>

      {gameState && (
        <div id="field">
          {field.map((e, i) => {
            return (
              <Row
                rowInfo={e}
                rowNumber={i}
                key={i}
                handleTileClick={handleTileClick}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Game;
