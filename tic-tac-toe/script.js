const cellState = Object.freeze({
    EMPTY: " ",
    X: "X",
    O: "O"
});

// Board dims
const width = 3;
const height = 3;


const gameboard = (() => {
    const board = Array.from(
        { length: height },
        () => Array(width).fill(cellState.EMPTY)
    );

    const setCell = (x, y, state) => {
        if (board[x][y] !== cellState.EMPTY) {
            return false;
        }

        board[y][x] = state;
        return true;
    };

    const getCell = (x, y) => board[y]?.[x];

    const getBoard = () => board;

    return {
        setCell,
        getCell,
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

        if (!validMove) {
            return false;
        }

        if (checkWin(x, y, currentPlayer)) {
            console.log("win");
            return true;
        }

        switchPlayer();
        return true;
    };

    const getCurrentPlayer = () => currentPlayer;

    const checkWin = (x, y, player) => {
        const directions = [
            [1, 0],   // |
            [0, 1],   // -
            [1, 1],   // \
            [1, -1]   // /
        ];

        for (const [dx, dy] of directions) {
            let count = 1;

            // forwards check
            let currentX = x + dx;
            let currentY = y + dy;

            while (gameboard.getCell(currentX, currentY) === player) {
                count++;
                currentX += dx;
                currentY += dy;
            }

            // backwards check
            currentX = x - dx;
            currentY = y - dy;

            while (gameboard.getCell(currentX, currentY) === player) {
                count++;
                currentX -= dx;
                currentY -= dy;
            }

            if (count >= 3) {
                return true;
            }
        }

        return false;
    };
    
    return {
        playTurn,
        getCurrentPlayer,
        checkWin
    };

})();



// TEST
gameController.playTurn(0,0);
gameController.playTurn(0,0);
gameController.playTurn(1,0);
gameController.playTurn(1,1);
gameController.playTurn(2,1);


console.log(gameboard.getBoard());