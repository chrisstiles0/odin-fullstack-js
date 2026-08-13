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

Gameboard.prototype.setCell = function (x, y, state) {
    // No overwriting non-empties
    if (this.board[y][x] !== cellState.EMPTY) {
        return false;
    }

    this.board[y][x] = state;
    return true;
}

// TEST
const gb = new Gameboard(3, 3);
gb.setCell(1, 2, cellState.X);
console.log(gb.board);