const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const setSymbol = (index, symbol) => {
        board[index] = symbol;
    };

    const getSymbol = (index) => board[index];

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {
        getBoard,
        setSymbol,
        getSymbol,
        resetBoard
    };

})();

const Player = (symbol) => {
    const getSymbol = () => symbol;

    return {getSymbol};

}

const displayController = (() => {
    const boardTiles = document.querySelectorAll('.board-tile');
    const messageBox = document.querySelector('.message-box');
    const restartButton = document.querySelector('.restart-button');

    boardTiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            if (!gameController.isGameOver() && !isTaken(e)) {
                gameController.playRound(parseInt(e.target.dataset.index));
                updateGameBoard();
                updateMessageBox();
            }
        });
    });

    restartButton.addEventListener('click', () => {
        gameBoard.resetBoard();
        gameController.resetGame();
        resetDisplay();
        updateMessageBox();

    });

    const isTaken = (e) => {
        if (e.target.textContent === 'X' || e.target.textContent === 'O') {
            return true;
        } else {
            return false;
        }
    }

    const updateGameBoard = () => {
        for (let i = 0; i < boardTiles.length; i++) {
            boardTiles[i].textContent = gameBoard.getSymbol(i);
            if (gameBoard.getSymbol(i) === 'X') {
                boardTiles[i].setAttribute('style', 'color: blue');
            } else if (gameBoard.getSymbol(i) === 'O') {
                boardTiles[i].setAttribute('style', 'color: red');
            } 
        }
    };

    const updateMessageBox = () => {
        if (gameController.isGameOver()) {
            if (!gameController.hasWinner()) {
                messageBox.textContent = "It's a draw!";
            } else {
                switch(gameController.getTurnCount() % 2) {
                    case 0:
                        messageBox.textContent = "Player O wins!";
                        break;
                    case 1:
                        messageBox.textContent = "Player X wins!";
                        break;
                    default:
                        messageBox.textContent = "";
                }
            }
        } else {
            switch(gameController.getTurnCount() % 2) {
                case 0:
                    messageBox.textContent = "Player X's turn";
                    break;
                case 1:
                    messageBox.textContent = "Player O's turn";
                    break;
                default:
                    messageBox.textContent = "";
            }
        }
    };

    const resetDisplay = () => {
        for (let i = 0; i < boardTiles.length; i++) {
            boardTiles[i].textContent = "";
        }
    };

})();

const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');
    let turnCount = 0;

    const playRound = (index) => {
        gameBoard.setSymbol(index, getCurrentPlayerSymbol());
        turnCount++;
    };

    const getCurrentPlayerSymbol = () => {
        if (turnCount % 2 === 0) {
            return playerX.getSymbol();
        } else {
            return playerO.getSymbol();
        }
    };

    const getTurnCount = () => turnCount;

    const exceedTurnCount = () => {
        if (0 <= turnCount && turnCount <= 8) {
            return false;
        } else {
            return true;
        }
    };

    const hasWinner = () => {
        // check horizontals
        if (
            ((gameBoard.getBoard()[0] === gameBoard.getBoard()[1]) && (gameBoard.getBoard()[1] === gameBoard.getBoard()[2]) && (gameBoard.getBoard()[2] !== "")) || 
            ((gameBoard.getBoard()[3] === gameBoard.getBoard()[4]) && (gameBoard.getBoard()[4] === gameBoard.getBoard()[5]) && (gameBoard.getBoard()[5] !== "")) || 
            ((gameBoard.getBoard()[6] === gameBoard.getBoard()[7]) && (gameBoard.getBoard()[7] === gameBoard.getBoard()[8]) && (gameBoard.getBoard()[8] !== ""))
        ) {
            return true;
        }

        // check verticals
        if (
            ((gameBoard.getBoard()[0] === gameBoard.getBoard()[3]) && (gameBoard.getBoard()[3] === gameBoard.getBoard()[6]) && (gameBoard.getBoard()[6] !== "")) || 
            ((gameBoard.getBoard()[1] === gameBoard.getBoard()[4]) && (gameBoard.getBoard()[4] === gameBoard.getBoard()[7]) && (gameBoard.getBoard()[7] !== "")) || 
            ((gameBoard.getBoard()[2] === gameBoard.getBoard()[5]) && (gameBoard.getBoard()[5] === gameBoard.getBoard()[8]) && (gameBoard.getBoard()[8] !== ""))
        ) {
            return true;
        }

        // check diagonals
        if (
            ((gameBoard.getBoard()[0] === gameBoard.getBoard()[4]) && (gameBoard.getBoard()[4] === gameBoard.getBoard()[8]) && (gameBoard.getBoard()[8] !== "")) || 
            ((gameBoard.getBoard()[2] === gameBoard.getBoard()[4]) && (gameBoard.getBoard()[4] === gameBoard.getBoard()[6]) && (gameBoard.getBoard()[6] !== ""))
        ) {
            return true;
        }

        // no winner
        return false;
    };

    const isGameOver = () => {
        if (exceedTurnCount() || hasWinner()) {
            return true;
        } else {
            return false;
        }
    };

    const resetGame = () => {
        turnCount = 0;
    };

    return {
        playRound,
        getCurrentPlayerSymbol,
        getTurnCount,
        exceedTurnCount,
        hasWinner,
        isGameOver,
        resetGame
    };

})();