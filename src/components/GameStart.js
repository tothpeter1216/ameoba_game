import React from "react";

const GameStart = ({ handleSubmit, handleFieldSizeChange, fieldSize }) => {
  return (
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
        required
      />
      <button type="submit">Start</button>
    </form>
  );
};

export default GameStart;
