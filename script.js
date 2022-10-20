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

    // moved this to the GameFlowController object, but will keep this commented here for now
    // const checkForWinner = () => {
    //     // check for 3 in a row, will write later
    //     console.log("test");
    //     return;
    // };

    // consider making update and reset functions private as player could mess with the game via console
        // perhaps call them in the getGameBoardState() function, with an if statement determining which, if any, needs to be called
    return {getGameBoardState, updateGameBoardState, resetGameBoardState, 
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

const GameFlowController = (() => {
    const checkForWinner = (player) => {
        const currentPlayerSign = player.getSign();
        let gameBoardState = getGameBoardState();
        if (gameBoardState[0] === currentPlayerSign) {
            if (gameBoardState[1] === currentPlayerSign && gameBoardState[2] === currentPlayerSign) {
                return true;
            } else if (gameBoardState[3] === currentPlayerSign && gameBoardState[6] === currentPlayerSign) {
                return true;
            } else if (gameBoardState[4] === currentPlayerSign && gameBoardState[8] === currentPlayerSign) {
                return true;
            }
        } else if (gameBoardState[1] === currentPlayerSign && gameBoardState[4] === currentPlayerSign && gameBoardState[7] === currentPlayerSign) {
            return true;
        } else if (gameBoardState[2] === currentPlayerSign) {
            if (gameBoardState[5] === currentPlayerSign && gameBoardState[8] === currentPlayerSign) {
                return true;
            } else if (gameBoardState[4] === currentPlayerSign && gameBoardState[6] === currentPlayerSign) {
                return true;
            }
        } else if (gameBoardState[3] === currentPlayerSign && gameBoardState[4] === currentPlayerSign && gameBoardState[5] === currentPlayerSign) {
            return true;
        } else if (gameBoardState[6] === currentPlayerSign && gameBoardState[7] === currentPlayerSign && gameBoardState[8] === currentPlayerSign) {
            return true;
        } else {
            return false;
        }
        // some code to determine if there is a 3 in a row
    };
    const checkForValidMove = (boardPosition) => {
        let gameBoardState = getGameBoardState();
        if (gameBoardState[boardPosition] === null) {
            // will probably move this somewhere else
            // updateGameBoardState(player, boardPosition);
            return true;
        } else {
            // update the DOM to have an error message, probably have this function in the DOM controller object
            return false;
        }
    };
    const receivePlayerGameInput = (player, boardPosition) => {
        if (checkForValidMove(player, boardPosition)) {
            updateGameBoardState(player, boardPosition);
            if (checkForWinner(player)) {
                // display winner and play again button, prevent ability to click board
                endGame();
            }
        } else {
            // display error message function in DOM controller object
        }
    };
    const createPlayerOne = () => {
        const newName = receivePlayerNameInput();
        const newSign = receivePlayerSignInput();
        const playerOne = Player(newName, newSign);
    }
    const endGame = () => {
        // call functions that are located in the DOM controller object
        return;
    };
    return {receivePlayerGameInput};
})();


const DOMController = (() => {
    const receivePlayerNameInput = () => {
        // look at DOM element value (probably a form), return value
        // pass the 2 variables to Player factory function ex. const player1 = Player()
    }
    const receivePlayerSignInput = () => {
        // look at DOM buttons for X or O, return value
        // only for player 1 since player 2 will get the sign not chosen
    }
    return {receivePlayerNameInput, receivePlayerSignInput};
})();

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