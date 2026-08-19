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
        if (board[y][x] !== cellState.EMPTY) {
            return false;
        }

        board[y][x] = state;
        return true;
    };

    const getCell = (x, y) => board[y]?.[x];

    const getBoard = () => board;

    const isBoardFull = () => {
        let hasEmpty = false;
        for (let y = 0; y < board.length; y++) {
            hasEmpty = hasEmpty || board[y].includes(cellState.EMPTY)
        }
        return !hasEmpty;
    }

    const reset = () => {
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                board[y][x] = cellState.EMPTY;
            }
        }
    };

    return {
        setCell,
        getCell,
        getBoard,
        isBoardFull,
        reset
    };

})();


const gameController = (() => {
    let currentPlayer = cellState.X;
    let winner = null;

    const switchPlayer = () => {
        currentPlayer = 
            currentPlayer === cellState.X
                ? cellState.O
                : cellState.X;
    };

    const playTurn = (x, y) => {
        if (winner) {
            return false;
        }

        const validMove = gameboard.setCell(x, y, currentPlayer);

        if (!validMove) {
            return false;
        }

        if (checkWin(x, y, currentPlayer)) {
            winner = currentPlayer;
            return true;
        }

        switchPlayer();
        return true;
    };

    const reset = () => {
        currentPlayer = cellState.X;
        winner = null;
        gameboard.reset();
    };

    const getCurrentPlayer = () => currentPlayer;

    const getWinner = () => winner;

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
        getWinner,
        checkWin,
        reset
    };

})();




const boardElement = document.querySelector("#gameboard");
const statusElement = document.querySelector("#status");
const resetButton = document.querySelector("#reset-button");


const displayBoard = () => {
    boardElement.innerHTML = "";

    const boardArray = gameboard.getBoard();

    for (let y = 0; y < boardArray.length; y++) {
        for (let x = 0; x < boardArray[y].length; x++) {
            const cell = document.createElement("button");

            cell.textContent = boardArray[y][x];

            cell.addEventListener("click", () => {
                const validMove = gameController.playTurn(x, y);

                if (validMove) {
                    displayBoard();
                }
            });

            boardElement.appendChild(cell);
        }
    }

    if (gameController.getWinner()) {
        statusElement.textContent =
            `${gameController.getCurrentPlayer()} wins!`;
    } else if (gameboard.isBoardFull()) {
        statusElement.textContent = 
            "Draw!";
    } else {
        statusElement.textContent =
            `${gameController.getCurrentPlayer()}'s turn`;
    }
}

resetButton.addEventListener("click", () => {
    gameController.reset();
    displayBoard();
});

displayBoard();