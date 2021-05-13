
// Our 2 containers-divs
const selectContainer = document.querySelector(".select");
const resultContainer = document.querySelector(".result");

// Display the results (score and message)
const score = document.querySelector('#header__score__count');
let calculateScore = 0; //we will use it to calculate the score
const message = document.querySelector('.result__message');
let text =""; //we will use it to display a message (draw - loose - win)

// The divs of our results
const resultPlayerDiv = document.querySelector('.result__player');
const resultPcDiv = document.querySelector('.result__pc');

// Our results - we will display the choice of the player and the randomly generated choice for the pc
const resultPlayerImage = document.querySelector(".result__player__image");
const resultPcImage = document.querySelector(".result__pc__image");

// Play again button
const againBtn = document.querySelector('.result__box__btn'); 

// The player's 3 options (rock, paper, scissors) - can be clicked
const playerRock = document.querySelector('.rock');
const playerPaper = document.querySelector('.paper');
const playerScissors = document.querySelector('.scissors');

//Set EventListeners for the player's 3 options (rock, paper,scissors)
playerRock.addEventListener('click', playGame);
playerPaper.addEventListener('click', playGame);
playerScissors.addEventListener('click', playGame);

//We create theImages array of objects that gets the src and name properties from the player's 3 options (rock, paper,scissors)
const theImages = [{
    src: playerRock.src,
    name: playerRock.dataset.name
}, {
    src: playerPaper.src,
    name: playerPaper.dataset.name
}, {
    src: playerScissors.src,
    name: playerScissors.dataset.name
}];


// playGame function - game logic
function playGame() {
    resetPlayerResults();

    setPlayerStyle(this.src, this.dataset.name);

    displayPendingPcResults(); 



    const randomNumber = Math.floor(Math.random()*3);//Generate a random number between 0-2
    const pcChoice = calculatePcChoice(randomNumber);

    // didPcWon gets a true/false/undefined value from calculateWinner().
    const didPcWon = calculateWinner(this.dataset.name, pcChoice); // calculateWinner function: 1. checks who won, 2. set the text to: draw/loose/win, 3. set a variable to: undefined/true/false to use to create winner effect
    
    // Display score, pc image, message (draw, win, loose), and in case of winner the background
    displayResults(didPcWon,randomNumber);
}

function resetPlayerResults() {
    resultPlayerDiv.style.border = ""; //Remove inline style - Player's choice
    resultPlayerDiv.style.boxShadow = ""; //Remove inline style - Player's choice
    resultPlayerDiv.classList.remove("rock-style");
    resultPlayerDiv.classList.remove("paper-style");
    resultPlayerDiv.classList.remove("scissors-style");
    resultPlayerDiv.classList.remove("win");
}

function setPlayerStyle(a,b) {
        resultPlayerImage.setAttribute("src", a); // Set image - Player's choice

        // Set style - Player's choice
        if(b == "rock"){
            resultPlayerDiv.classList.add("rock-style");
        } else if (b == "paper") {
            resultPlayerDiv.classList.add("paper-style");
        } else if (b == "scissors"){
            resultPlayerDiv.classList.add("scissors-style");
        }
}

function displayPendingPcResults() {
    resultContainer.style.display = "grid"; // Display Result's div
    resultPcImage.style.visibility = "hidden"; //we hide it so that the previous result does not show

    // Initial color for resultPcDiv is grey (before the choice of the pc is shown)
    resultPcDiv.style.background = ""; //remove inline style
    resultPcDiv.style.border = ""; //remove inline style
    resultPcDiv.style.boxShadow = ""; //remove inline style
    resultPcDiv.classList.add('gray-style'); //set it to gray
}

function calculatePcChoice(randomNum) {
    let image = theImages[randomNum].name; //Get the name of the pc's choice based on the random number we have calculated
    return image;
}

function calculateWinner(player, pc){
    let pcWins;

    if (player === pc){
        text = "IT'S A DRAW";
        pcWins = undefined;
    } else if ((player === "rock" && pc === "paper") || (player === "scissors" && pc === "rock") || (player === "paper" && pc === "scissors")) {
        text = "YOU LOOSE";
        pcWins = true;
    } else {
        text = "YOU WIN";
        pcWins = false;
        calculateScore = calculateScore + 1;
    }

    return pcWins;
}


function displayResults(didPcWon, randomNumber){
    setTimeout(function(){
        displayPcResults(randomNumber);

        score.innerHTML = calculateScore;
        message.innerHTML = text;

        displayWinnerEffect(didPcWon);
        },500);

    selectContainer.style.display = "none";
}

function displayPcResults(randomNumber) {
    resultPcImage.src = theImages[randomNumber].src;
    resultPcImage.style.visibility = "visible";
    resultPcDiv.style.background = "white";
    resultPcDiv.classList.remove('gray-style');

    if(theImages[randomNumber].name == "rock"){
        resultPcDiv.classList.add("rock-style");
    } else if (theImages[randomNumber].name == "paper") {
        resultPcDiv.classList.add("paper-style");
    } else if (theImages[randomNumber].name == "scissors"){
        resultPcDiv.classList.add("scissors-style");
    }
}

function displayWinnerEffect(didPcWon) {
    if (didPcWon == true){
        resultPcDiv.classList.add("win");
    } else if (didPcWon == false){
        resultPlayerDiv.classList.add("win");
    } else if (didPcWon == undefined){
    }
}

function playAgain() {
    // Remove all the styles - PC choice
    resetPcResults();
    resetScoreMessage();

    resultContainer.style.display = "none"; //we remove the div with the results of the previous match
    selectContainer.style.display = "grid"; //we go back to the div with the game
}

function resetPcResults() {
    resultPcDiv.classList.remove('gray-style');
    resultPcDiv.classList.remove("rock-style");
    resultPcDiv.classList.remove("paper-style");
    resultPcDiv.classList.remove("scissors-style");
    resultPcDiv.classList.remove("win");
}

function resetScoreMessage() {
    message.innerHTML = ""; //we clear the message
}