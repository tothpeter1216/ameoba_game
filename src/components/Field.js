import React from "react";
import Row from "./Row";

const Field = ({ field, handleTileClick }) => {
  return (
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
  );
};

export default Field;
