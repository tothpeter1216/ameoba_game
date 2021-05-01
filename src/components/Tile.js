import React from "react";

const Tile = ({ type, rowNumber, tileNumber, handleTileClick }) => {
  const handleClick = () => {
    type === 0
      ? handleTileClick(rowNumber, tileNumber)
      : console.log("wrongClick");
  };

  let className = "";

  switch (type) {
    case 0:
      className = "tile";
      break;
    case 1:
      className = "tile xTile";
      break;
    case 2:
      className = "tile oTile";
      break;
    default:
      className = "tile";
      break;
  }
  return (
    <div className={className} onClick={handleClick}>
      {/* {rowNumber}:{tileNumber}={type} */}
    </div>
  );
};

export default Tile;
