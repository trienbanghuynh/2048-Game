document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector("#score");
  const resultDisplay = document.querySelector("#result");
  const width = 4;
  let squares = [];
  let score = 0;

  // create a playing board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      let square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  createBoard();

  // create a number randomly

  function generate() {
    let ranNum = Math.floor(Math.random() * squares.length);
    if (squares[ranNum].innerHTML == 0) {
      squares[ranNum].innerHTML = 2;
      checkForGameOver();
    } else generate();
  }


  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filterRow = row.filter((num) => num);
        let missing = 4 - filterRow.length;
        let zeroes = Array(missing).fill(0);
        let newRow = zeroes.concat(filterRow);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }



  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filterRow = row.filter((num) => num);
        let missing = 4 - filterRow.length;
        let zeroes = Array(missing).fill(0);
        let newRow = filterRow.concat(zeroes);
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filterCol = column.filter((num) => num);
      let missing = 4 - filterCol.length;
      let zeroes = Array(missing).fill(0);
      let newCol = zeroes.concat(filterCol);
      squares[i].innerHTML = newCol[0];
      squares[i + width].innerHTML = newCol[1];
      squares[i + width * 2].innerHTML = newCol[2];
      squares[i + width * 3].innerHTML = newCol[3];
    }
  }
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filterCol = column.filter((num) => num);
      let missing = 4 - filterCol.length;
      let zeroes = Array(missing).fill(0);
      let newCol = filterCol.concat(zeroes);
      squares[i].innerHTML = newCol[0];
      squares[i + width].innerHTML = newCol[1];
      squares[i + width * 2].innerHTML = newCol[2];
      squares[i + width * 3].innerHTML = newCol[3];
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }
  function combineCol() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  //   assign key codes
  function control(e) {
    if (e.keyCode == 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }

  document.addEventListener("keyup", control);
  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }
  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }
  function keyDown() {
    moveDown();
    combineCol();
    moveDown();
    generate();
  }
  function keyUp() {
    moveUp();
    combineCol();
    moveUp();
    generate();
  }

  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You Win!";
        document.removeEventListener("keyup", control);
      }
    }
  }

  function checkForGameOver() {
    let zeroes = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeroes++;
      }
    }
    if (zeroes === 0) {
      resultDisplay.innerHTML = "You lose!";
      document.removeEventListener("keyup", control);
    }
  }
});
