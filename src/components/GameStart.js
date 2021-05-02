import React from "react";

const GameStart = ({
  handleSubmit,
  handleFieldSizeChange,
  fieldSize,
  player1,
  player2,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="player1">Játékos (X): </label>
      <input
        type="text"
        name="player1"
        id=""
        onChange={handleFieldSizeChange}
        value={player1}
      />
      <label htmlFor="player2"> Játékos (O): </label>
      <input
        type="text"
        name="player2"
        id=""
        onChange={handleFieldSizeChange}
        value={player2}
      />
      <label className="field-size-input" htmlFor="fieldSize">
        Add meg az amőba pálya méretét (5-15):{" "}
      </label>
      <input
        type="number"
        name="fieldSize"
        id="fieldSize"
        onChange={handleFieldSizeChange}
        value={fieldSize}
        min="5"
        max="15"
        required
      />
      <button type="submit">Start</button>
    </form>
  );
};

export default GameStart;
