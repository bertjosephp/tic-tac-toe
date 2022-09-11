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