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

function GameController(gameboard) {
    this.gameboard = gameboard;
    this.currentPlayer = Object.keys(cellState)[1]; 
}

GameController.prototype.switchPlayer = function () {
    this.currentPlayer =
        this.currentPlayer === cellState.X
            ? cellState.O
            : cellState.X;
};

GameController.prototype.playTurn = function (x, y) {
    const validMove = this.gameboard.setCell(
        x,
        y,
        this.currentPlayer
    );

    if (validMove) {
        this.switchPlayer();
    }

    return validMove;
}




// TEST

const board = new Gameboard(3, 3);
const game = new GameController(board);

game.playTurn(0,0)
game.playTurn(0,0)//should not be O
game.playTurn(1,1)
game.playTurn(1,2)

console.log(board.board);