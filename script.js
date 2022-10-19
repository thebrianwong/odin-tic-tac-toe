const GameBoard = (() => {
    let gameBoardState = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    const getGameBoardState = () => {
        return gameBoardState;
    };
    const updateGameBoardState = (player, boardPosition) => {
        gameBoardState[boardPosition] = player.getSign();
        // probably will want to call some function to render this update change.
        // function will be written in a displayController module object.
        // or maybe that render function part of the displayController object will call this function, idk yet
    };
    const resetGameBoardState = () => {
        gameBoardState.forEach((boardPosition) => {
            boardPosition = null;
        })
    };
    const checkForWinner = () => {
        // check for 3 in a row, will write later
        console.log("test");
        return;
    };
    return {getGameBoardState, updateGameBoardState, resetGameBoardState, checkForWinner, 
        // just for testing purposes, remove later as access is unnecessary
        gameBoardState};
})();

const Player = (name, sign) => {
    const getName = () => {
        return name;
    };
    const getSign = () => {
        return sign;
    };
    return {getName, getSign};
};




// originally put these into the Player object but might be better to actually put them in the game logic module
const setPlayerSign = (sign) => {
    //  will set the playerSign variable to X or O
    playerSign = sign;
};
const choosePlayerSign = () => {
    // will link to DOM elements for choosing either X or O
    // diff between this and setPlayerSign is that only player 1 chooses sign (choose and set),
        // whereas player 2 is forced to have the remaining sign (set)
    // "x" is a placeholder, will be whatever value is returned from the targeted DOM element selected
    setPlayerSign("x");
    return;
};