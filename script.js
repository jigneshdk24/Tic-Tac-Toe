const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_SCREEN = "show";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardElement = document.querySelector(".board");
const cellElements = document.querySelectorAll("[data-cell]");
const resultscreen = document.querySelector(".winning-message");
const winnersTitle = document.querySelector("[data-winning-message-text]");
const restartButton = document.getElementById("restartButton");

let circlesTurn;

startGame();

function startGame() {
  resultscreen.classList.remove(WINNING_SCREEN);
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
  });
  circlesTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
}

restartButton.addEventListener("click", startGame);

function handleClick(e) {
  const cell = e.target;
  const currentClass = circlesTurn ? CIRCLE_CLASS : X_CLASS;
  placemark(cell, currentClass);
  //check for win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  //check for draw
  else if (isDraw()) {
    endGame(true);
  }
  //switch turns
  swapTurn();
  setBoardHoverClass();
}

function endGame(draw) {
  if (draw) {
    winnersTitle.innerText = "Draw";
  } else {
    winnersTitle.innerText = `${circlesTurn ? "O's Win!" : "X's Win!"}`;
  }
  resultscreen.classList.add(WINNING_SCREEN);
}

function placemark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurn() {
  circlesTurn = !circlesTurn;
}

function setBoardHoverClass() {
  boardElement.classList.remove(CIRCLE_CLASS);
  boardElement.classList.remove(X_CLASS);
  if (circlesTurn) boardElement.classList.add(CIRCLE_CLASS);
  else boardElement.classList.add(X_CLASS);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cellElements].every(
    (cell) =>
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  );
}
