const gameBoard = document.querySelector(".gameboard");
const dataSquare = document.querySelectorAll("[data-square]");
const players = document.querySelector(".players");
const dataPlayerOne = document.querySelector("[data-player-one]");
const dataPlayerTwo = document.querySelector("[data-player-two]");
const playButton = document.querySelectorAll("[data-play]");
const displayNonePlayers = document.querySelectorAll("[data-display-none]");
const dataIndexSpot = document.querySelectorAll("[data-index-spot]");
const dataRow = document.querySelectorAll("[data-row]");
const overlay = document.querySelector(".overlay");
const dataWinner = document.querySelector("[data-winner]");
const sidePanel = document.querySelector("[data-panel]");
const hamburgerMenu = document.querySelector("[data-hamburgerMenu]");
const closePanel = document.querySelector("[data-closePanel]");
const iconOverlay = document.querySelector("[data-iconOverlay]");
const scoreContainer = document.querySelectorAll("[data-containerScore]");
const dataScores = document.querySelectorAll("[data-score]");
const dataScorePlayerOne = document.querySelector("[data-scorePlayerOne]");
const dataScorePlayerTwo = document.querySelector("[data-scorePlayerTwo]");
const roundScore = document.querySelector("[data-round]");
const symbols = ["X","0"];
let counterSymbol = 0;



let board = [
    [[],[],[]],
    [[],[],[]],
    [[],[],[]],
];

let counter = 1;

class Players {
    constructor(name,symbol,score = 0) {
        this.name = name;
        this.symbol = symbol;
        this.score = score;
    }
};

class Gameboard {


    constructor(board) {
        this.board = board;
    }

    display() {
        overlay.style.display = "flex";
    }


    addSpot(square, symbol) {

       let indexSpot;
       let rowBoard;
       if (square.innerText === "") {
        square.innerText = symbol;
        square.setAttribute("data-square", symbol);
        indexSpot = square.getAttribute("data-index-spot");
        rowBoard = square.getAttribute("data-row");
        board[rowBoard][indexSpot] = square.innerText;
        counter++;
        counterSymbol++;
        console.log(counterSymbol);
        if (counterSymbol === 9) {
            dataWinner.innerText = "Even !!!"
            setTimeout(this.display, 500);
            counterSymbol = 0;
        }
       } else {
        return;
       }
    }



    resetBoard(option) {
        dataSquare.forEach(square => {
         square.setAttribute("data-square", "");
         square.innerText = "";        
        });
        
        
        if (option == "new_game") {
            counter = 1;
            winner = undefined;
            gameBoard.style.display = "none";
            displayNonePlayers.forEach(div => div.style.display = "none");
            players.style.display = "flex";
            roundScore.innerText = "0";
            hamburgerMenu.style.display = "none";
            if (sidePanel.getAttribute("aria-expanded") == "true") {
                sidePanel.setAttribute("aria-expanded", "false");
                sidePanel.style.transform = "translateX(-100%)";
            }

            if (closePanel.style.display != "none") {
                closePanel.style.display = "none";
            }
         }

         if (option == "new_round" && winner == playerOne.name) {
            counter = 2;
         } else {
            counter = 1;
         }

         board = [
            [[],[],[]],
            [[],[],[]],
            [[],[],[]],
        ];

     };

     resetScore() {
        playerOne.score = 0;
        playerTwo.score = 0;
        dataScores.forEach(score => {
            score.innerText = "0";
        })
     }

     assignateScore(player) {
       if (player.name === dataScorePlayerOne.getAttribute("data-scoreplayerone")) {
        dataScorePlayerOne.innerText = player.score;
       } else  {
        dataScorePlayerTwo.innerText = player.score;
       }
       let round = ++roundScore.innerText;
       roundScore.innerText = round;
     }
 
     proclamateWinner(player) {

        dataWinner.innerText = player.name + " Wins!!";
        winner = player.name;
        player.score++;
        this.assignateScore(player);
        setTimeout(this.display, 500);
        counterSymbol = 0;

     }



    checkDiagonally(value) {
        if (value == "bottomRight") {
            console.log("right");
            if (board[0][0] == board[1][1] && board[1][1]  == board[2][2]) {
                if (board[0][0] == playerOne.symbol) {
                   this.proclamateWinner(playerOne);
                } else if (board[0][0] == playerTwo.symbol) {
                    this.proclamateWinner(playerTwo);
                }
            }
        } else if (value == "bottomLeft") {
            console.log("left");
            if (board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
                if (board[2][0] == playerOne.symbol) { 
                   this.proclamateWinner(playerOne);
                } else {
                    this.proclamateWinner(playerTwo);
                }
            } 
        }
    }

    checkPosition(arr) {
        let equalSymbols = "";

        for (let i = 0; i < 3; i++) {
            equalSymbols += arr[0];
        }

        if (arr.reduce((prev,curr) => prev + curr) === equalSymbols) {
           if (equalSymbols[0] === playerOne.symbol) {
            this.proclamateWinner(playerOne);
           } else if(equalSymbols[0] === playerTwo.symbol) {
            this.proclamateWinner(playerTwo);
           }
        }
        this.arr = [];
    }

    checkVerticallyLeft(arr) {
        for (let i = 0; i < 3; i++) {
            arr.push(board[i][0]);
            if (arr.length === 3) {
                this.checkPosition(arr);
            }
        }
    }

    checkVerticallyMiddle(arr) {
        for (let i = 0; i < 3; i++) {
            arr.push(board[i][1]);
            if (arr.length === 3) {
                this.checkPosition(arr);
            }
        }
    }

    checkVerticallyRight(arr) {
        for (let i = 0; i < 3; i++) {
            arr.push(board[i][2]);
            if (arr.length === 3) {
                this.checkPosition(arr);
            }
        }
    }


    checkHorizontallyLeft(arr) {
        for (let i = 0; i < 3; i++) {
            arr.push(board[0][i]);
            if (arr.length === 3) {
                this.checkPosition(arr);
            }
        }
    }

    checkHorizontallyMiddle(arr) {
        for (let i = 0; i < 3; i++) {
            arr.push(board[1][i]);
            if (arr.length === 3) {
                this.checkPosition(arr);
            }
        }
    }

    checkHorizontallyRight(arr) {
        for (let i = 0; i < 3; i++) {
            arr.push(board[2][i]);
            if (arr.length === 3) {
                this.checkPosition(arr);
            }
        }
    }

    

    arr = [];

    checkSpot() {

        // Check Diagonally

        if ((board[0][0] != "" && board[1][1] != "" && board[2][2] != "") ) {
            this.checkDiagonally("bottomRight");
        } else if ((board[2][0] != ""  && board[1][1] != "" != "" && board[0][2] != "")) {
            this.checkDiagonally("bottomLeft");
        }

        // Check Vertically


        if (board[0][0] != "" && board[1][0] != "" && board[2][0] != "") {
           this.checkVerticallyLeft(this.arr);
        }
        if (board[0][1] != "" && board[1][1] && board[2][1] != "") {
            this.checkVerticallyMiddle(this.arr);
        }

        if (board[0][2] != "" && board[1][2] && board[2][2] != "") {
            this.checkVerticallyRight(this.arr);
        }

        // Check Horizontally

        if (board[0][0] != "" && board[0][1] != "" && board[0][2] != "") {
            this.checkHorizontallyLeft(this.arr);
         }
         if (board[1][0] != "" && board[1][1] && board[1][2] != "") {
             this.checkHorizontallyMiddle(this.arr);
         }
 
         if (board[2][0] != "" && board[2][1] && board[2][2] != "") {
             this.checkHorizontallyRight(this.arr);
         }

    }
};

let startGame;
let playerOne;
let playerTwo;
let round;
let winner;

playButton.forEach(button => {
    button.addEventListener("click", () => {
        if (dataPlayerOne.value == "" || dataPlayerTwo.value == "") {
           alert("Insert a name please");
           return;
        } else {
            players.style.display = "none";
            displayNonePlayers[0].innerText = dataPlayerOne.value;
            displayNonePlayers[1].innerText = dataPlayerTwo.value;
            dataScores[0].setAttribute("data-scorePlayerOne", dataPlayerOne.value);
            dataScores[1].setAttribute("data-scorePlayerTwo", dataPlayerTwo.value);
            playerOne = new Players(displayNonePlayers[0].innerText, symbols[0]); 
            playerTwo = new Players(displayNonePlayers[1].innerText, symbols[1]); 
            iconOverlay.style.display = "flex";
            gameBoard.style.display = "grid";
            startGame = new Gameboard(board);
            hamburgerMenu.style.display = "flex";
        }
    });
})


dataSquare.forEach( (square) => {
    square.addEventListener("click", () => {
        if (counter % 2 != 0) {
            startGame.addSpot(square, symbols[0]);
            startGame.checkSpot(square);
        } else {
            startGame.addSpot(square, symbols[1]);
            startGame.checkSpot(square);
        }
    })
} );


overlay.addEventListener("click", (e) => {
    if (e.target.dataset.option === "new_round") {
        overlay.style.display = "none";
        startGame.resetBoard("new_round");
    } else {
        overlay.style.display = "none";
        startGame.resetBoard("new_game");
        startGame.resetScore();
    }
} )


// Open Side Panel

hamburgerMenu.addEventListener("click", () => {
        sidePanel.style.transform = "translateX(0)";
        sidePanel.setAttribute("aria-expanded", true);
        hamburgerMenu.style.display = "none";
        closePanel.style.display = "block";
});

closePanel.addEventListener("click", () => {
    sidePanel.style.transform = "translate(-100%)";
    hamburgerMenu.style.display = "flex";
    closePanel.style.display = "none";
})