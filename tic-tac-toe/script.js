const cellState = Object.freeze({
    EMPTY: " ",
    X: "X",
    O: "O"
});

const gameboard = (() => {
    const width = 3;
    const height = 3;

    const board = Array.from(
        { length: height },
        () => Array(width).fill(cellState.EMPTY)
    );

    const setCell = (x, y, state) => {
        if (board[x][y] !== cellState.EMPTY) {
            return false;
        }

        board[x][y] = state;
        return true;
    };

    const getBoard = () => board;

    return {
        setCell,
        getBoard
    };

})();


const gameController = (() => {
    let currentPlayer = cellState.X;

    const switchPlayer = () => {
        currentPlayer = 
            currentPlayer === cellState.X
                ? cellState.O
                : cellState.X;
    };

    const playTurn = (x, y) => {
        const validMove = gameboard.setCell(x, y, currentPlayer);

        if (validMove) {switchPlayer()};

        return validMove;
    };

    const checkWin = () => {

    };
    
    return {
        playTurn,
        getCurrentPlayer,
        checkWin
    };

})();



