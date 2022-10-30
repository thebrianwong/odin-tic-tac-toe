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
        gameBoardState[boardPosition] = currentPlayer.getSign();
    };
    const resetGameBoardState = () => {
        for (boardPosition in gameBoardState) {
            gameBoardState[boardPosition] = null;
        }
    };
    return {getGameBoardState, updateGameBoardState, resetGameBoardState};
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

const Computer = (name, sign) => {
    const {getName, getSign} = Player(name, sign);
    // keeping for posterity
    const makeRandomMove = () => {
        let emptyTiles = [];
        const gameBoardState = GameBoard.getGameBoardState();
        for (tile in gameBoardState) {
            if (gameBoardState[tile] === null) {
                emptyTiles.push(tile);
            }
        };
        let numberOfEmptyTiles = emptyTiles.length;
        let randomIndex = Math.floor(Math.random() * numberOfEmptyTiles);
        let randomTile = emptyTiles[randomIndex];
        GameBoard.updateGameBoardState(randomTile);
        const currentPlayer = GameFlowController.getCurrentPlayer();
        DOMController.updateGameBoardElement(currentPlayer, randomTile);
        GameFlowController.resolvePlayerGameInput();
    }
    const calculateOptimalTile = () => {
        let tileHeuristics = [];
        let highestHeuristic = null;
        let optimalTile = null;
        const humanPlayerSign = GameFlowController.getPlayerFromArray(0).getSign();
        const gameBoardState = GameBoard.getGameBoardState();
        // look at each tile to evaluate and assign heuristic
        for (tile in gameBoardState) {
            tile = Number(tile);
            let heuristic = 0;
            // if tile is already occupied, assign 0
            if (gameBoardState[tile] !== null) {
                tileHeuristics.push(heuristic);
            } else {
                // check if tile can make a 3 in a row
                if (tile === 0 && ((gameBoardState[1] === sign && gameBoardState[2] === sign) ||
                    (gameBoardState[3] === sign && gameBoardState[6] === sign) ||
                    (gameBoardState[4] === sign && gameBoardState[8] === sign))) {
                    heuristic += 1000;
                } else if (tile === 1 && ((gameBoardState[0] === sign && gameBoardState[2] === sign) ||
                    (gameBoardState[4] === sign && gameBoardState[7] === sign))) {
                    heuristic += 1000;
                } else if (tile === 2 && ((gameBoardState[0] === sign && gameBoardState[1] === sign) ||
                (gameBoardState[4] === sign && gameBoardState[6] === sign) ||
                (gameBoardState[5] === sign && gameBoardState[8] === sign))) {
                    heuristic += 1000;
                } else if (tile === 3 && ((gameBoardState[4] === sign && gameBoardState[5] === sign) ||
                (gameBoardState[0] === sign && gameBoardState[6] === sign))) {
                    heuristic += 1000;
                } else if (tile === 4 && ((gameBoardState[1] === sign && gameBoardState[7] === sign) ||
                (gameBoardState[3] === sign && gameBoardState[5] === sign) ||
                (gameBoardState[0] === sign && gameBoardState[8] === sign) ||
                (gameBoardState[2] === sign && gameBoardState[6] === sign))) {
                    heuristic += 1000;
                } else if (tile === 5 && ((gameBoardState[3] === sign && gameBoardState[4] === sign) ||
                (gameBoardState[2] === sign && gameBoardState[8] === sign))) {
                    heuristic += 1000;
                } else if (tile === 6 && ((gameBoardState[0] === sign && gameBoardState[3] === sign) ||
                (gameBoardState[7] === sign && gameBoardState[8] === sign) ||
                (gameBoardState[2] === sign && gameBoardState[4] === sign))) {
                    heuristic += 1000;
                } else if (tile === 7 && ((gameBoardState[1] === sign && gameBoardState[4] === sign) ||
                (gameBoardState[6] === sign && gameBoardState[8] === sign))) {
                    heuristic += 1000;
                } else if (tile === 8 && ((gameBoardState[6] === sign && gameBoardState[7] === sign) ||
                (gameBoardState[2] === sign && gameBoardState[5] === sign) ||
                (gameBoardState[0] === sign && gameBoardState[4] === sign))) {
                    heuristic += 1000;
                }

                // check if tile can block a 3 in a row
                if (tile === 0 && ((gameBoardState[1] === humanPlayerSign && gameBoardState[2] === humanPlayerSign) ||
                    (gameBoardState[3] === humanPlayerSign && gameBoardState[6] === humanPlayerSign) ||
                    (gameBoardState[4] === humanPlayerSign && gameBoardState[8] === humanPlayerSign))) {
                    heuristic += 500;
                } else if (tile === 1 && ((gameBoardState[0] === humanPlayerSign && gameBoardState[2] === humanPlayerSign) ||
                    (gameBoardState[4] === humanPlayerSign && gameBoardState[7] === humanPlayerSign))) {
                    heuristic += 500;
                } else if (tile === 2 && ((gameBoardState[0] === humanPlayerSign && gameBoardState[1] === humanPlayerSign) ||
                (gameBoardState[4] === humanPlayerSign && gameBoardState[6] === humanPlayerSign) ||
                (gameBoardState[5] === humanPlayerSign && gameBoardState[8] === humanPlayerSign))) {
                    heuristic += 500;
                } else if (tile === 3 && ((gameBoardState[4] === humanPlayerSign && gameBoardState[5] === humanPlayerSign) ||
                (gameBoardState[0] === humanPlayerSign && gameBoardState[6] === humanPlayerSign))) {
                    heuristic += 500;
                } else if (tile === 4 && ((gameBoardState[1] === humanPlayerSign && gameBoardState[7] === humanPlayerSign) ||
                (gameBoardState[3] === humanPlayerSign && gameBoardState[5] === humanPlayerSign) ||
                (gameBoardState[0] === humanPlayerSign && gameBoardState[8] === humanPlayerSign) ||
                (gameBoardState[2] === humanPlayerSign && gameBoardState[6] === humanPlayerSign))) {
                    heuristic += 500;
                } else if (tile === 5 && ((gameBoardState[3] === humanPlayerSign && gameBoardState[4] === humanPlayerSign) ||
                (gameBoardState[2] === humanPlayerSign && gameBoardState[8] === humanPlayerSign))) {
                    heuristic += 500;
                } else if (tile === 6 && ((gameBoardState[0] === humanPlayerSign && gameBoardState[3] === humanPlayerSign) ||
                (gameBoardState[7] === humanPlayerSign && gameBoardState[8] === humanPlayerSign) ||
                (gameBoardState[2] === humanPlayerSign && gameBoardState[4] === humanPlayerSign))) {
                    heuristic += 500;
                } else if (tile === 7 && ((gameBoardState[1] === humanPlayerSign && gameBoardState[4] === humanPlayerSign) ||
                (gameBoardState[6] === humanPlayerSign && gameBoardState[8] === humanPlayerSign))) {
                    heuristic += 500;
                } else if (tile === 8 && ((gameBoardState[6] === humanPlayerSign && gameBoardState[7] === humanPlayerSign) ||
                (gameBoardState[2] === humanPlayerSign && gameBoardState[5] === humanPlayerSign) ||
                (gameBoardState[0] === humanPlayerSign && gameBoardState[4] === humanPlayerSign))) {
                    heuristic += 500;
                }

                // check if tile can push for a win
                if (tile === 0 && ((gameBoardState[1] === sign || gameBoardState[2] === sign) ||
                    (gameBoardState[3] === sign || gameBoardState[6] === sign) ||
                    (gameBoardState[4] === sign || gameBoardState[8] === sign))) {
                    heuristic += 50;
                } else if (tile === 1 && ((gameBoardState[0] === sign || gameBoardState[2] === sign) ||
                    (gameBoardState[4] === sign || gameBoardState[7] === sign))) {
                    heuristic += 50;
                } else if (tile === 2 && ((gameBoardState[0] === sign || gameBoardState[1] === sign) ||
                (gameBoardState[4] === sign || gameBoardState[6] === sign) ||
                (gameBoardState[5] === sign || gameBoardState[8] === sign))) {
                    heuristic += 50;
                } else if (tile === 3 && ((gameBoardState[4] === sign || gameBoardState[5] === sign) ||
                (gameBoardState[0] === sign || gameBoardState[6] === sign))) {
                    heuristic += 50;
                } else if (tile === 4 && ((gameBoardState[1] === sign || gameBoardState[7] === sign) ||
                (gameBoardState[3] === sign || gameBoardState[5] === sign) ||
                (gameBoardState[0] === sign || gameBoardState[8] === sign) ||
                (gameBoardState[2] === sign || gameBoardState[6] === sign))) {
                    heuristic += 50;
                } else if (tile === 5 && ((gameBoardState[3] === sign || gameBoardState[4] === sign) ||
                (gameBoardState[2] === sign || gameBoardState[8] === sign))) {
                    heuristic += 50;
                } else if (tile === 6 && ((gameBoardState[0] === sign || gameBoardState[3] === sign) ||
                (gameBoardState[7] === sign || gameBoardState[8] === sign) ||
                (gameBoardState[2] === sign || gameBoardState[4] === sign))) {
                    heuristic += 50;
                } else if (tile === 7 && ((gameBoardState[1] === sign || gameBoardState[4] === sign) ||
                (gameBoardState[6] === sign || gameBoardState[8] === sign))) {
                    heuristic += 50;
                } else if (tile === 8 && ((gameBoardState[6] === sign || gameBoardState[7] === sign) ||
                (gameBoardState[2] === sign || gameBoardState[5] === sign) ||
                (gameBoardState[0] === sign || gameBoardState[4] === sign))) {
                    heuristic += 50;
                }

                // choose middle tile on first turn if possible
                if (tile === 4) {
                    heuristic += 50;
                }

                // prevent middle tile double traps (L shape)
                if ((tile === 0 && gameBoardState[1] === humanPlayerSign && gameBoardState[3] === humanPlayerSign) ||
                    (tile === 2 && gameBoardState[1] === humanPlayerSign && gameBoardState[5] === humanPlayerSign) ||
                    (tile === 6 && gameBoardState[3] === humanPlayerSign && gameBoardState[7] === humanPlayerSign) ||
                    (tile === 8 && gameBoardState[5] === humanPlayerSign && gameBoardState[7] === humanPlayerSign)) {
                    heuristic += 50;
                }

                // commenting this out so that there is one way to beat the computer
                // (if not, having a victory message would be pointless)
                // prevent V-shaped double traps
                // if (tile === 2 && gameBoardState[4] === humanPlayerSign && gameBoardState[8] === humanPlayerSign) {
                //     heuristic += 50
                // }

                // check adjacent tiles
                // check down
                if ((tile !== 6 && tile !== 7 && tile !== 8)) {
                    if (gameBoardState[tile+3] === humanPlayerSign){
                        heuristic += 7.5;
                    } else if (gameBoardState[tile+3] === sign) {
                        heuristic += 5;
                    }
                }
                // check right
                if ((tile !== 2 && tile !== 5 && tile !== 8)) {
                    if (gameBoardState[tile+1] === humanPlayerSign){
                        heuristic += 7.5;
                    } else if (gameBoardState[tile+1] === sign) {
                        heuristic += 5;
                    }
                }
                // check up
                if ((tile !== 0 && tile !== 1 && tile !== 2)) {
                    if (gameBoardState[tile-3] === humanPlayerSign){
                        heuristic += 7.5;
                    } else if (gameBoardState[tile-3] === sign) {
                        heuristic += 5;
                    }
                }
                // check left
                if ((tile !== 0 && tile !== 3 && tile !== 6)) {
                    if (gameBoardState[tile-1] === humanPlayerSign){
                        heuristic += 7.5;
                    } else if (gameBoardState[tile-1] === sign) {
                        heuristic += 5;
                    }
                }
                // check upper left corner
                if ((tile === 4 || tile === 5 || tile === 7 || tile === 8)) {
                    if (gameBoardState[tile-4] === humanPlayerSign){
                        heuristic += 8.5;
                    } else if (gameBoardState[tile-4] === sign) {
                        heuristic += 6;
                    }
                }
                // check upper right corner
                if ((tile === 3 || tile === 4 || tile === 6 || tile === 7)) {
                    if (gameBoardState[tile-2] === humanPlayerSign){
                        heuristic += 8.5;
                    } else if (gameBoardState[tile-2] === sign) {
                        heuristic += 6;
                    }
                }
                // check lower left corner
                if ((tile === 1 || tile === 2 || tile === 4 || tile === 5)) {
                    if (gameBoardState[tile+2] === humanPlayerSign){
                        heuristic += 8.5;
                    } else if (gameBoardState[tile+2] === sign) {
                        heuristic += 6;
                    }
                }
                // check lower right corner
                if ((tile === 0 || tile === 1 || tile === 3 || tile === 4)) {
                    if (gameBoardState[tile+4] === humanPlayerSign){
                        heuristic += 8.5;
                    } else if (gameBoardState[tile+4] === sign) {
                        heuristic += 6;
                    }
                }

                tileHeuristics.push(heuristic);
                if (highestHeuristic === null || heuristic > highestHeuristic) {
                    highestHeuristic = heuristic;
                }
            }
        }
        for (heuristic in tileHeuristics) {
            if (tileHeuristics[heuristic] === highestHeuristic) {
                optimalTile = heuristic;
                return optimalTile;
            }
        }
    }
    const makeComputerMove = () => {
        let optimalTile = calculateOptimalTile();
        GameBoard.updateGameBoardState(optimalTile);
        const currentPlayer = GameFlowController.getCurrentPlayer();
        DOMController.updateGameBoardElement(currentPlayer, optimalTile);
        GameFlowController.resolvePlayerGameInput();
    }
    return {getName, getSign, makeComputerMove};
}

const GameFlowController = (() => {
    let gameMode = null;
    let gameInProgress = null;
    let currentPlayer = null;
    let playerObjectsArray = [];
    const getGameMode = () => {
        return gameMode;
    }
    const setGameMode = (mode) => {
        gameMode = mode;
    }
    const getGameInProgress = () => {
        return gameInProgress;
    }
    const setGameInProgress = (state) => {
        gameInProgress = state;
    }
    const getCurrentPlayer = () => {
        return currentPlayer;
    }
    const setCurrentPlayer = (player) => {
        currentPlayer = player;
    }
    const addPlayerToArray = (player) => {
        playerObjectsArray.push(player);
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
        const playerComputerNewName = "Skynet";
        const playerComputerNewSign = assignOppositePlayerSign(playerOne);
        const playerComputer = Computer(playerComputerNewName, playerComputerNewSign);
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
    const resolvePlayerGameInput = () => {
        if (checkForWinner(currentPlayer)) {
            endGame();
            DOMController.toggleWinnerMessage("display", currentPlayer);
        } else if (checkForDraw()) {
            endGame();
            DOMController.toggleDrawMessage("display");
        } else {
            alternateCurrentPlayer();
        }
    }
    const alternateToComputerTurn = () => {
        const computerPlayer = getPlayerFromArray(1);
        DOMController.togglePlayerInput("disable");
        setTimeout(computerPlayer.makeComputerMove, 500);
        setTimeout(DOMController.togglePlayerInput.bind(this, "enable"), 500);
    }
    const receivePlayerGameInput = (currentPlayer, boardPosition) => {
        if (getGameInProgress()) {
            if (checkForValidMove(boardPosition)) {
                GameBoard.updateGameBoardState(boardPosition);
                DOMController.updateGameBoardElement(currentPlayer, boardPosition);
                DOMController.toggleInvalidMoveErrorMessage("hide");
                resolvePlayerGameInput();
                if (gameMode === "single" && getGameInProgress()) {
                    alternateToComputerTurn();
                }
            } else {
                DOMController.toggleInvalidMoveErrorMessage("display");
            }
        }
    };
    const alternateCurrentPlayer = () => {
        if (currentPlayer === getPlayerFromArray(0)) {
            currentPlayer = getPlayerFromArray(1);
        } else {
            currentPlayer = getPlayerFromArray(0);
        }
    }
    const startGame = () => {
        setGameInProgress(true);
    }
    const endGame = () => {
        setGameInProgress(false);
    };
    const playAgain = () => {
        resetGameState();
    }
    const exitToMainMenu = () => {
        if (getGameInProgress() === false) {
            resetGameState();
            resetPlayerArray();
        }
    }
    const resetGameState = () => {
        GameBoard.resetGameBoardState();
        DOMController.resetGameBoardElement();
        setGameInProgress(true);
        setCurrentPlayer(getPlayerFromArray(0));
    }
    const resetPlayerArray = () => {
        playerObjectsArray = [];
    }
    return {getGameMode, setGameMode, getCurrentPlayer, setCurrentPlayer, getPlayerArray, getPlayerFromArray,
            createPlayerOne, createPlayerTwo,receivePlayerGameInput, createPlayerComputer, resolvePlayerGameInput,
            startGame, playAgain, exitToMainMenu};
})();


const DOMController = (() => {
    const endScreenElement = document.querySelector(".end-screen-container");
    const resultsMessage = document.querySelector(".results-message");
    const addPlayerOneSubmitFormButtonClicker = () => {
        const playerOneSubmitFormButton = document.querySelector("#player-one-submit-form-button");
        playerOneSubmitFormButton.addEventListener("click", () => {
            const playerOne = GameFlowController.createPlayerOne();
            GameFlowController.setCurrentPlayer(playerOne);
            const gameMode = GameFlowController.getGameMode();
            if (gameMode === "single") {
                const playerComputer = GameFlowController.createPlayerComputer();
                setTimeout(toggleGameBoardElement.bind(this, "display"), 550);
                GameFlowController.startGame();
            } else if (gameMode === "two") {
                setTimeout(alternatePlayerForm.bind(this, "two"), 550);
                setTimeout(togglePlayerForm.bind(this, "display"), 550);
            }
            togglePlayerForm("hide");
            setTimeout(resetForm, 500)
        });
    }
    const addPlayerTwoSubmitFormButtonClicker = () => {
        const playerTwoSubmitFormButton = document.querySelector("#player-two-submit-form-button");
        playerTwoSubmitFormButton.addEventListener("click", () => {
            const playerTwo = GameFlowController.createPlayerTwo();
            togglePlayerForm("hide");
            setTimeout(resetForm, 500);
            setTimeout(alternatePlayerForm.bind(this,"one"), 550);
            setTimeout(toggleGameBoardElement.bind(this, "display"), 550);
            GameFlowController.startGame();
        });
    }
    const alternatePlayerForm = (newPlayer) => {
        const formHeader = document.querySelector(".form-header");
        const playerOneSubmitFormButton = document.querySelector("#player-one-submit-form-button");
        const playerTwoSubmitFormButton = document.querySelector("#player-two-submit-form-button");
        if (newPlayer === "one") {
            const signButtons = Array.from(document.querySelectorAll(".sign-button"));
            formHeader.textContent = "Player One";
            playerOneSubmitFormButton.classList.remove("default-display-none");
            playerTwoSubmitFormButton.classList.add("default-display-none");
            for (button in signButtons) {
                signButtons[button].removeAttribute("disabled");
            }
        } else if (newPlayer === "two") {
            const playerOne = GameFlowController.getPlayerFromArray(0);
            const playerOneSign = playerOne.getSign();
            const signButtonToDisable = document.querySelector(`#${playerOneSign}`);
            formHeader.textContent = "Player Two";
            playerOneSubmitFormButton.classList.add("default-display-none");
            playerTwoSubmitFormButton.classList.remove("default-display-none");
            signButtonToDisable.setAttribute("disabled", "");
        }
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
            GameFlowController.setGameMode("single");
        })
    }
    const addTwoPlayerModeButtonClicker = () => {
        const twoPlayerModeButton = document.querySelector(".two-player-mode-button");
        twoPlayerModeButton.addEventListener("click", () => {
            toggleStartScreen("hide");
            setTimeout(togglePlayerForm.bind(this, "display"), 550)
            GameFlowController.setGameMode("two");
        })
    }
    const addPlayerMoveClickers = () => {
        const boardPositions = Array.from(document.querySelectorAll(".board-tile"));
        boardPositions.forEach((boardTile) => {
            let boardPosition = boardTile.dataset.boardPosition;
            boardTile.addEventListener("click", ()=> {
                let currentPlayer = GameFlowController.getCurrentPlayer();
                GameFlowController.receivePlayerGameInput(currentPlayer, boardPosition);
            });
        })
    }
    const addPlayAgainButtonClicker = () => {
        const playAgainButton = document.querySelector(".play-again-button");
        playAgainButton.addEventListener("click", () => {
            GameFlowController.playAgain();
            toggleDrawMessage("hide");
        })
    }
    const addMainMenuButtonClicker = () => {
        const mainMenuButton = document.querySelector(".main-menu-button");
        mainMenuButton.addEventListener("click", () => {
            GameFlowController.exitToMainMenu();
            toggleDrawMessage("hide");
            toggleGameBoardElement("hide");
            setTimeout(toggleStartScreen.bind(this, "display"), 550);
        })
    }
    const receivePlayerNameInput = () => {
        const playerNameInputElement = document.querySelector(".player-name-input");
        const playerNameInput = playerNameInputElement.value;
        return playerNameInput;
    }
    const receivePlayerSignInput = () => {
        const playerSignXButton = document.querySelector(".sign-x-button");
        const playerSignOButton = document.querySelector(".sign-o-button");
        if (playerSignXButton.checked) {
            return playerSignXButton.getAttribute("id");
        } else {
            return playerSignOButton.getAttribute("id");
        }
    }
    const togglePlayerForm = (action) => {
        const playerForm = document.querySelector(".player-form");
        if (action === "display") {
            playerForm.classList.remove("default-display-none");
            playerForm.classList.remove("form-hide-animation");
            playerForm.classList.add("form-display-animation");
        } else if (action === "hide") {
            playerForm.classList.remove("form-display-animation");
            playerForm.classList.add("form-hide-animation");
            if (GameFlowController.getPlayerArray().length == 2) {
                setTimeout(function() {
                    playerForm.classList.add("default-display-none")
                }, 500);
            }
        };
    };
    const toggleInvalidMoveErrorMessage = (action) => {
        const invalidMoveErrorMessage = document.querySelector(".invalid-move-error-message");
        if (action === "display") {
            invalidMoveErrorMessage.style.display = "block";
        } else if (action === "hide") {
            invalidMoveErrorMessage.style.display = "none";
        }
    }
    const toggleComputerMessage = (action) => {
        const computerMessage = document.querySelector(".computer-message");
        if (action === "display") {
            computerMessage.classList.remove("default-display-none");
            computerMessage.style.display = "block";
        } else if (action === "hide") {
            computerMessage.style.display = "none";
        }
    }
    const changeResultsMainMessage = (player) => {
        const humanPlayer = GameFlowController.getPlayerFromArray(0);
        const humanPlayerName = humanPlayer.getName();
        if (player === humanPlayer) {
            resultsMessage.textContent = `Nice Job, ${humanPlayerName}!\nYou Beat the Computer!`;
        } else {
            resultsMessage.textContent = "HAHA,\nYOU HAVE LOST,\nPUNY HUMAN";
        }
    }
    const changeResultsSubMessage = (player) => {
        const humanPlayer = GameFlowController.getPlayerFromArray(0);
        const computerMessage = document.querySelector(".computer-message");
        if (player === humanPlayer) {
            computerMessage.textContent = "You must be the next Einstein!";
        } else {
            computerMessage.textContent = "PLAY AGAIN SO I MAY\nCRUSH YOU ONCE MORE";
        }
    }
    const changeResultsMessageTwoPlayer = (player) => {
        const winningPlayerName = player.getName();
        resultsMessage.textContent = `Congratulations, ${winningPlayerName}!\nYou Win!`;
    }
    const toggleWinnerMessage = (action, player) => {
        if (action === "display") {
            if (GameFlowController.getGameMode() === "single") {
                toggleComputerMessage("display");
                changeResultsMainMessage(player);
                changeResultsSubMessage(player);
            } else if (GameFlowController.getGameMode() === "two") {
                toggleComputerMessage("hide");
                changeResultsMessageTwoPlayer(player);
            }
            endScreenElement.classList.remove("default-display-none")
            endScreenElement.style.display = "flex";
        } else if (action === "hide") {
            endScreenElement.style.display = "none";
        }
    }
    const changeResultsMessageDraw = () => {
        resultsMessage.textContent = `It's A Draw!\nBetter Luck Next Time!`;
    }
    const toggleDrawMessage = (action) => {
        if (action === "display") {
            toggleComputerMessage("hide");
            changeResultsMessageDraw();
            endScreenElement.classList.remove("default-display-none")
            endScreenElement.style.display = "flex";
        } else if (action === "hide") {
            endScreenElement.style.display = "none";
        }
    }
    const toggleStartScreen = (action) => {
        const startScreenElement = document.querySelector(".start-screen-container");
        if (action === "display") {
            startScreenElement.classList.remove("start-screen-hide-animation");
            startScreenElement.classList.add("start-screen-display-animation");
            startScreenElement.style.display = "flex";
        } else if (action === "hide") {
            startScreenElement.classList.remove("start-screen-display-animation");
            startScreenElement.classList.add("start-screen-hide-animation");
            setTimeout(function () {
                startScreenElement.style.display = "none";
            }, 500);
        }
    }
    const updateGameBoardElement = (currentPlayer, boardPosition) => {
        const currentPlayerSign = currentPlayer.getSign();
        const boardPositionElement = document.querySelector(`[data-board-position="${boardPosition}"]`);
        const signImage = document.createElement("img");
        if (currentPlayerSign === "X") {
            signImage.setAttribute("src", "assets/X-sign.png");
        } else {
            signImage.setAttribute("src", "assets/O-sign.png");
        }
        boardPositionElement.appendChild(signImage);
    }
    const resetGameBoardElement = () => {
        const boardPositionElements = Array.from(document.querySelectorAll(".board-tile"));
        for (element in boardPositionElements) {
            boardPositionElements[element].textContent = "";
        }
    }
    const toggleGameBoardElement = (action) => {
        const gameBoardElement = document.querySelector(".game-board-container");
        if (action === "display") {
            gameBoardElement.classList.remove("default-display-none");
            gameBoardElement.classList.add("game-board-display-animation");
        } else if (action === "hide") {
            gameBoardElement.classList.add("default-display-none");
            gameBoardElement.classList.remove("game-board-display-animation");
        }
    }
    const togglePlayerInput = (action) => {
        const gameBoardElement = document.querySelector(".game-board-container");
        if (action === "enable") {
            gameBoardElement.style.pointerEvents = "auto";
        } else if (action === "disable") {
            gameBoardElement.style.pointerEvents = "none";
        }
    }
    return {addPlayerOneSubmitFormButtonClicker, addPlayerTwoSubmitFormButtonClicker, addSinglePlayerModeButtonClicker,
            addTwoPlayerModeButtonClicker, addPlayerMoveClickers,addPlayAgainButtonClicker, addMainMenuButtonClicker,
            receivePlayerNameInput, receivePlayerSignInput, togglePlayerForm, toggleInvalidMoveErrorMessage,
            toggleWinnerMessage, toggleDrawMessage, toggleStartScreen, updateGameBoardElement,  resetGameBoardElement, 
            togglePlayerInput};
})();

DOMController.addPlayerMoveClickers();
DOMController.addSinglePlayerModeButtonClicker();
DOMController.addTwoPlayerModeButtonClicker();
DOMController.addPlayerOneSubmitFormButtonClicker();
DOMController.addPlayerTwoSubmitFormButtonClicker();
DOMController.addPlayAgainButtonClicker();
DOMController.addMainMenuButtonClicker();
