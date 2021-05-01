import React from "react";
import Tile from "./Tile";

const Row = ({ rowInfo, rowNumber, handleTileClick }) => {
  return (
    <div className="row">
      {rowInfo.map((tile, i) => {
        return (
          <Tile
            type={tile}
            rowNumber={rowNumber}
            tileNumber={i}
            key={i}
            handleTileClick={handleTileClick}
          />
        );
      })}
    </div>
  );
};

export default Row;
