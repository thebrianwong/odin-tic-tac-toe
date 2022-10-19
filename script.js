const GameBoard = (() => {
    let gameBoardState = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    const updateGameBoardState = (playerSign, boardPosition) => {
        gameBoardState[boardPosition] = playerSign;
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
    return {updateGameBoardState, resetGameBoardState, checkForWinner, 
        // just for testing purposes, remove later as access is unnecessary
        gameBoardState};
})();