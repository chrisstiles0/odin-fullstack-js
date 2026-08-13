const cellState = Object.freeze({
    EMPTY: " ",
    X: "X",
    O: "O"
});

function Gameboard(width, height) {
    this.boardWidth = width;
    this.boardHeight = height;
    this.board = Array.from(
        { length: height },
        () => Array(width).fill(cellState.EMPTY)
    );
}

// TEST

const gb = new Gameboard(3, 3);
console.log(gb.board);