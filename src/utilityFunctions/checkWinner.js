const checkWinner = (x, y, fieldSize, field) => {
  return (
    checkHorizontalWinner(x, y, fieldSize, field) ||
    checkVerticalWinner(x, y, fieldSize, field) ||
    checkDiagonalWinnerOne(x, y, fieldSize, field) ||
    checkDiagonalWinnerTwo(x, y, fieldSize, field)
  );
};

const checkVerticalWinner = (x, y, fieldSize, field) => {
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
  if (point >= 4) {
    return true;
  } else {
    return false;
  }
};

const checkHorizontalWinner = (x, y, fieldSize, field) => {
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
  if (point >= 4) {
    return true;
  } else {
    return false;
  }
};

const checkDiagonalWinnerOne = (x, y, fieldSize, field) => {
  let xPos = x + 1;
  let yPos = y + 1;
  let point = 0;
  let type = field[x][y];
  while (xPos < 10 && xPos <= fieldSize && field[xPos][yPos] === type) {
    xPos++;
    yPos++;
    point++;
  }
  xPos = x - 1;
  yPos = y - 1;
  while (xPos >= 0 && xPos <= fieldSize && field[xPos][yPos] === type) {
    xPos--;
    yPos--;
    point++;
  }
  if (point >= 4) {
    return true;
  } else {
    return false;
  }
};

const checkDiagonalWinnerTwo = (x, y, fieldSize, field) => {
  let xPos = x + 1;
  let yPos = y - 1;
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
  if (point >= 4) {
    return true;
  } else {
    return false;
  }
};

export default checkWinner;
