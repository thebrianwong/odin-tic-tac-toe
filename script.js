const GameBoard = (() => {
    let gameBoardState = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    const getGameBoardState = () => {
        return gameBoardState;
    };
    const updateGameBoardState = (boardPosition) => {
        let currentPlayer = GameFlowController.getCurrentPlayer();
        // console.log(currentPlayer);
        gameBoardState[boardPosition] = currentPlayer.getSign();
    };
    const resetGameBoardState = () => {
        for (boardPosition in gameBoardState) {
            gameBoardState[boardPosition] = null
        }
    };
    // consider making update and reset functions private as player could mess with the game via console
        // perhaps call them in the getGameBoardState() function, with an if statement determining which, if any, needs to be called
    return {getGameBoardState, updateGameBoardState, resetGameBoardState};
})();

const Player = (name, sign) => {
    const getName = () => {
        return name;
    };
    const getSign = () => {
        return sign;
    };
    return {sign, getName, getSign};
};

const GameFlowController = (() => {
    let gameMode = null;
    let gameInProgress = true;
    let currentPlayer = null;
    let playerObjectsArray = [];
    const getGameMode = () => {
        return gameMode;
    }
    const getCurrentPlayer = () => {
        return currentPlayer;
    }
    const addPlayerToArray = (player) => {
        playerObjectsArray.push(player)
    }
    const getPlayerArray = () => {
        return playerObjectsArray;
    }
    const getPlayerFromArray = (index) => {
        return playerObjectsArray[index];
    }
    const assignOppositePlayerSign = (playerOne) => {
        const playerOneSign = playerOne.getSign();
        if (playerOneSign === "X") {
            return "O";
        } else {
            return "X";
        }
    }
    const createPlayerOne = () => {
        const playerOneNewName = DOMController.receivePlayerNameInput();
        const playerOneNewSign = DOMController.receivePlayerSignInput();
        const playerOne = Player(playerOneNewName, playerOneNewSign);
        // console.log(playerOne)
        addPlayerToArray(playerOne);
        return playerOne;
    }
    const createPlayerTwo = () => {
        const playerOne = getPlayerFromArray(0);
        const playerTwoNewName = DOMController.receivePlayerNameInput();
        const playerTwoNewSign = assignOppositePlayerSign(playerOne);
        const playerTwo = Player(playerTwoNewName, playerTwoNewSign)
        addPlayerToArray(playerTwo);
        return playerTwo;
    }
    const createPlayerComputer = () => {
        const playerOne = getPlayerFromArray(0);
        const playerComputerNewName = "make a new function that returns a random name from an array of robot names like Bender, Skynet, etc.";
        const playerComputerNewSign = assignOppositePlayerSign(playerOne);
        const playerComputer = Player(playerComputerNewName, playerComputerNewSign);
        addPlayerToArray(playerComputer);
        return playerComputer;
    }
    const checkForWinner = (player) => {
        const currentPlayerSign = player.getSign();
        let gameBoardState = GameBoard.getGameBoardState();
        if (gameBoardState[0] === currentPlayerSign) {
            if (gameBoardState[1] === currentPlayerSign && gameBoardState[2] === currentPlayerSign) {
                return true;
            } else if (gameBoardState[3] === currentPlayerSign && gameBoardState[6] === currentPlayerSign) {
                return true;
            } else if (gameBoardState[4] === currentPlayerSign && gameBoardState[8] === currentPlayerSign) {
                return true;
            }
        };
        if (gameBoardState[1] === currentPlayerSign && gameBoardState[4] === currentPlayerSign && gameBoardState[7] === currentPlayerSign) {
            return true;
        };
        if (gameBoardState[2] === currentPlayerSign) {
            if (gameBoardState[5] === currentPlayerSign && gameBoardState[8] === currentPlayerSign) {
                return true;
            } else if (gameBoardState[4] === currentPlayerSign && gameBoardState[6] === currentPlayerSign) {
                return true;
            }
        };
        if (gameBoardState[3] === currentPlayerSign && gameBoardState[4] === currentPlayerSign && gameBoardState[5] === currentPlayerSign) {
            return true;
        };
        if (gameBoardState[6] === currentPlayerSign && gameBoardState[7] === currentPlayerSign && gameBoardState[8] === currentPlayerSign) {
            return true;
        } else {
            return false;
        };
    };
    const checkForValidMove = (boardPosition) => {
        let gameBoardState = GameBoard.getGameBoardState();
        if (gameBoardState[boardPosition] === null) {
            return true;
        } else {
            return false;
        }
    };
    const checkForDraw = () => {
        let gameBoardState = GameBoard.getGameBoardState();
        for (boardPosition in gameBoardState) {
            if (gameBoardState[boardPosition] === null) {
                return false;
            }
        }
        return true;
    }
    const receivePlayerGameInput = (currentPlayer, boardPosition) => {
        console.log("test")
        console.log(currentPlayer)
        console.log(boardPosition)
        if (gameInProgress) {
            if (checkForValidMove(boardPosition)) {
                GameBoard.updateGameBoardState(boardPosition);
                DOMController.updateGameBoardElement(currentPlayer, boardPosition)
                DOMController.toggleInvalidMoveErrorMessage("hide");
                if (checkForWinner(currentPlayer)) {
                    // display winner and play again button, prevent ability to click board
                    endGame();
                    DOMController.toggleWinnerMessage("display", currentPlayer);
                } else if (checkForDraw()) {
                    endGame();
                    DOMController.toggleDrawMessage("display");
                } else {
                    alternateCurrentPlayer();
                    endTurn();
                }
            } else {
                // display error message function in DOM controller object
                console.log("test")
                DOMController.toggleInvalidMoveErrorMessage("display");
            }
        }
    };
    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }
    const alternateCurrentPlayer = () => {
        if (currentPlayer === playerObjectsArray[0]) {
            currentPlayer = playerObjectsArray[1];
        } else {
            currentPlayer = playerObjectsArray[0];
        }
    }
    const startGame = () => {
        // connect to some DOM element button with click listener
        // form appears where you type in name and choose sign as player 1
        // click button to submit, probably where createPlayerOne() is called
        // new form appears where player 2 types in name, maybe player 1 sign is grayed out
        // click button to submit, probably where createPlayerTwo() is called
        // then have it be player 1's turn and they can make a move
        // assign currentPlayerTurn to player 1
    }
    const endTurn = (playerOne, playerTwo) => {
        // some logic to alternate the current turn player
        // will probably call another function to do so
        console.log("test");
        if (currentPlayer === playerOne) {
            currentPlayer === playerTwo;
        } else {
            currentPlayer === playerOne;
        }
    }
    const endGame = () => {
        // call functions that are located in the DOM controller object to display results screen, win or draw
        gameInProgress = false;
        return;
    };
    // need to tie this to the Play Again button in the end screen
    const playAgain = () => {
        // probably put all of this into a separate "reset" function, then call a new function that hides the end screen
        GameBoard.resetGameBoardState();
        DOMController.resetGameBoardElement();
        gameInProgress = true;
        currentPlayer = getPlayerFromArray(0);
    }
    return {getCurrentPlayer,receivePlayerGameInput, startGame, createPlayerOne, createPlayerTwo, addPlayersToArray: addPlayerToArray, getPlayerArray, getPlayerFromArray, setCurrentPlayer, getGameMode, createPlayerComputer, playAgain};
})();


const DOMController = (() => {
    // uncomment if toggle function is removed
    // const playerForm = document.querySelector(".player-form");
    const endScreenElement = document.querySelector(".end-screen-container");
    const resultsMessage = document.querySelector(".results-message");
    // const playerOneSubmitFormButton = document.querySelector("#player-one-submit-form-button");
    // const playerTwoSubmitFormButton = document.querySelector("#player-two-submit-form-button");
    // playerOneSubmitFormButton.addEventListener("click", () => {
    //     const playerOne = GameFlowController.createPlayerOne();
    //     GameFlowController.setCurrentPlayer(playerOne);
    //     const gameMode = GameFlowController.getGameMode();
    //     if (gameMode === "single") {
    //         const playerComputer = GameFlowController.createPlayerComputer();
    //     }
    //     togglePlayerForm("hide");
    // });
    // playerTwoSubmitFormButton.addEventListener("click", () => {
    //     const playerTwo = GameFlowController.createPlayerTwo();
    //     togglePlayerForm("hide");
    // });
    const addPlayerOneSubmitFormButtonClicker = () => {
        const playerOneSubmitFormButton = document.querySelector("#player-one-submit-form-button");
        playerOneSubmitFormButton.addEventListener("click", () => {
            const playerOne = GameFlowController.createPlayerOne();
            GameFlowController.setCurrentPlayer(playerOne);
            const gameMode = GameFlowController.getGameMode();
            if (gameMode === "single") {
                const playerComputer = GameFlowController.createPlayerComputer();
            }
            togglePlayerForm("hide");
            setTimeout(resetForm, 500)
            setTimeout(changeFormToPlayerTwo, 550);
            setTimeout(togglePlayerForm.bind(this, "display"), 550);
        });
    }
    const addPlayerTwoSubmitFormButtonClicker = () => {
        const playerTwoSubmitFormButton = document.querySelector("#player-two-submit-form-button");
        playerTwoSubmitFormButton.addEventListener("click", () => {
            const playerTwo = GameFlowController.createPlayerTwo();
            togglePlayerForm("hide");
            setTimeout(displayGameBoardElement, 550);
        });
    }
    const changeFormToPlayerTwo = () => {
        const formHeader = document.querySelector(".form-header");
        const playerOneSubmitFormButton = document.querySelector("#player-one-submit-form-button");
        const playerTwoSubmitFormButton = document.querySelector("#player-two-submit-form-button");
        const playerOne = GameFlowController.getPlayerFromArray(0);
        const playerOneSign = playerOne.getSign();
        const signButtonToDisable = document.querySelector(`#${playerOneSign}`);
        formHeader.textContent = "Player Two";
        playerOneSubmitFormButton.classList.add("default-display-none");
        playerTwoSubmitFormButton.classList.remove("default-display-none");
        signButtonToDisable.setAttribute("disabled", "");
    }
    const resetForm = () => {
        const playerNameInputElement = document.querySelector(".player-name-input");
        const formSignButtons = Array.from(document.querySelectorAll(".sign-button"));
        playerNameInputElement.value = "";
        for (button in formSignButtons) {
            formSignButtons[button].checked = false;
        }
    }
    const addSinglePlayerModeButtonClicker = () => {
        const singlePlayerModeButton = document.querySelector(".single-player-mode-button");
        singlePlayerModeButton.addEventListener("click", () => {
            toggleStartScreen("hide");
            setTimeout(togglePlayerForm.bind(this, "display"), 550)
            // GameFlowController.startGame();
        })
    }
    const addtwoPlayerModeButtonClicker = () => {
        const twoPlayerModeButton = document.querySelector(".two-player-mode-button");
        twoPlayerModeButton.addEventListener("click", () => {
            toggleStartScreen("hide");
            setTimeout(togglePlayerForm.bind(this, "display"), 550)
            // GameFlowController.startGame();
        })
    }
    const addPlayerMoveClickers = () => {
        const boardPositions = Array.from(document.querySelectorAll(".board-tile"));
        boardPositions.forEach((boardTile) => {
            // let currentPlayer = GameFlowController.getCurrentPlayer();
            let boardPosition = boardTile.dataset.boardPosition;
            boardTile.addEventListener("click", ()=> {
                // console.log("test")
                let currentPlayer = GameFlowController.getCurrentPlayer();
                console.log(currentPlayer);
                console.log(boardPosition);
                GameFlowController.receivePlayerGameInput(currentPlayer, boardPosition);
            });
        })
    }
    const receivePlayerNameInput = () => {
        // look at DOM element value (probably a form), return value
        // pass the 2 variables to Player factory function ex. const player1 = Player()
        const playerNameInputElement = document.querySelector(".player-name-input");
        const playerNameInput = playerNameInputElement.value;
        return playerNameInput;
    }
    const receivePlayerSignInput = () => {
        // look at DOM buttons for X or O, return value
        // only for player 1 since player 2 will get the sign not chosen
        // the buttons will likely be radio buttons that are styled to look like regular buttons
        const playerSignXButton = document.querySelector(".sign-x-button");
        const playerSignOButton = document.querySelector(".sign-o-button");
        if (playerSignXButton.checked) {
            // console.log(playerSignXButton.getAttribute("id"))
            return playerSignXButton.getAttribute("id");
        } else {
            return playerSignOButton.getAttribute("id");
        }
    }
    // keeping as a comment in case toggle function is removed
    // const displayPlayerForm = () => {
    //     playerForm.classList.remove("form-hide-animation");
    //     playerForm.classList.add("form-display-animation");
    // };
    // const hidePlayerForm = () => {
    //     playerForm.classList.remove("form-display-animation");
    //     playerForm.classList.add("form-hide-animation");
    // };
    const togglePlayerForm = (action) => {
        const playerForm = document.querySelector(".player-form");
        if (action === "display") {
            playerForm.classList.remove("default-display-none")
            playerForm.classList.remove("form-hide-animation");
            playerForm.classList.add("form-display-animation");
        } else if (action === "hide") {
            playerForm.classList.remove("form-display-animation");
            playerForm.classList.add("form-hide-animation");
            if (GameFlowController.getPlayerArray().length == 2) {
                setTimeout(function() {
                    playerForm.style.display = "none";
                }, 500);
            }
            // setTimeout(function() {
            //     playerForm.style.display = "none";
            // }, 500);
        };
    };
    const toggleInvalidMoveErrorMessage = (action) => {
        // console.log("toggle invalid")
        const invalidMoveErrorMessage = document.querySelector(".invalid-move-error-message");
        if (action === "display") {
            invalidMoveErrorMessage.style.visibility = "visible";
        } else if (action === "hide") {
            invalidMoveErrorMessage.style.visibility = "hidden";
        }
    }
    const changeResultsMessageWinner = (player) => {
        const winningPlayerName = player.getName();
        resultsMessage.textContent = `Congratulations, ${winningPlayerName}! You Win!`;
    }
    const toggleWinnerMessage = (action, player) => {
        if (action === "display") {
            changeResultsMessageWinner(player);
            endScreenElement.style.visibility = "visible";
        } else if (action === "hide") {
            endScreenElement.style.visibility = "hidden";
        }
    }
    const changeResultsMessageDraw = () => {
        resultsMessage.textContent = `It's A Draw! Better Luck Next Time!`;
    }
    const toggleDrawMessage = (action) => {
        console.log("draw!")
        if (action === "display") {
            changeResultsMessageDraw();
            endScreenElement.style.visibility = "visible";
        } else if (action === "hide") {
            endScreenElement.style.visibility = "hidden";
        }
    }
    const toggleStartScreen = (action) => {
        const startScreenElement = document.querySelector(".start-screen-container");
        if (action === "display") {
            // startScreenElement.style.visibility = "visible";
            startScreenElement.classList.remove("start-screen-hide-animation");
            startScreenElement.classList.add("start-screen-display-animation");
        } else if (action === "hide") {
            // startScreenElement.style.display = "none";
            startScreenElement.classList.remove("start-screen-display-animation");
            startScreenElement.classList.add("start-screen-hide-animation");
            setTimeout(function () {
                startScreenElement.style.display = "none";
            }, 500);
        }
    }
    // used to update 1 single tile, as opposed to displaying the whole board (which is redundant if there is only 1 change per turn)
    const updateGameBoardElement = (currentPlayer, boardPosition) => {
        const currentPlayerSign = currentPlayer.getSign();
        const boardPositionElement = document.querySelector(`[data-board-position="${boardPosition}"]`);
        boardPositionElement.textContent = currentPlayerSign;
    }
    const resetGameBoardElement = () => {
        const boardPositionElements = Array.from(document.querySelectorAll(".board-tile"));
        for (element in boardPositionElements) {
            boardPositionElements[element].textContent = "";
        }
    }
    const displayGameBoardElement = () => {
        const gameBoardElement = document.querySelector(".game-board-container");
        gameBoardElement.classList.remove("default-display-none");
        gameBoardElement.classList.add("game-board-display-animation");
    }
    const testDisplayEntireGameBoardState = () => {
        const gameBoardState = GameBoard.getGameBoardState();
        for (let i = 0; i < gameBoardState.length; i++) {
            const boardPositionElement = document.querySelector(`[data-board-position="${i}"]`);
            if (gameBoardState[i] === null) {
                boardPositionElement.textContent = "";
            } else {
                boardPositionElement.textContent = gameBoardState[i];
            }
        }
    }
    return {receivePlayerNameInput, receivePlayerSignInput, togglePlayerForm, toggleInvalidMoveErrorMessage, toggleWinnerMessage,
            toggleDrawMessage, updateGameBoardElement, testDisplayEntireGameBoardState, addPlayerMoveClickers, resetGameBoardElement,
            toggleStartScreen, addSinglePlayerModeButtonClicker, addTwoPlayerModeButtonClicker: addtwoPlayerModeButtonClicker,
            addPlayerOneSubmitFormButtonClicker, addPlayerTwoSubmitFormButtonClicker};
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
    // "X" is a placeholder, will be whatever value is returned from the targeted DOM element selected
    setPlayerSign("X");
    return;
};

DOMController.addPlayerMoveClickers();
DOMController.addSinglePlayerModeButtonClicker();
DOMController.addTwoPlayerModeButtonClicker();
DOMController.addPlayerOneSubmitFormButtonClicker();
DOMController.addPlayerTwoSubmitFormButtonClicker();