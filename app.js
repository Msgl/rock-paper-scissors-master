
// Our 2 containers-divs
const selectContainer = document.querySelector(".select");
const resultContainer = document.querySelector(".result");

//
const score = document.querySelector('#header__score__count');
const message = document.querySelector('.result__message');

// The player's 3 options (rock, paper, scissors) - can be clicked
const playerRock = document.querySelector('.rock');
const rockSrc = playerRock.src;
playerRock.name = "Rock"; //The name should be the same as the name property of the theImage array
playerRock.index = 0;


const playerPaper = document.querySelector('.paper');
const paperSrc = playerPaper.src;
playerPaper.name = "Paper"; //The name should be the same as the name property of the theImage array
playerPaper.index = 1;


const playerScissors = document.querySelector('.scissors');
const scissorsSrc = playerScissors.src;
playerScissors.name = "Scissors"; //The name should be the same as the name property of the theImage array
playerScissors.index = 2;


// The divs of our results
const resultPlayerDiv = document.querySelector('.result__player');
const resultPcDiv = document.querySelector('.result__pc');

// Our results - we will display the choice of the player and the randomly generated choice for the pc here
const resultPlayerImage = document.querySelector(".result__player__image");
const resultPcImage = document.querySelector(".result__pc__image");

// Our buttons
const againBtn = document.querySelector('.result__box__btn'); //Play again button

// Other
let calculateScore = 0; //we will use it to calculate the score
let text; //we will use it to display a message (draw - loose - win)


// 
const theImages = [{
    src: rockSrc,
    name: "Rock"
}, {
    src: paperSrc,
    name: "Paper"
}, {
    src: scissorsSrc,
    name: "Scissors"
}];

//Set EventListeners, number/name properties for the player's choice
playerRock.addEventListener('click', playGame);
playerPaper.addEventListener('click', playGame);
playerScissors.addEventListener('click', playGame);


// playGame function - game logic
function playGame() {
    resultPlayerImage.setAttribute("src", this.src); // Set image - Player's choice

    resultPlayerDiv.style.border = ""; //Remove inline style - Player's choice
    resultPlayerDiv.style.boxShadow = ""; //Remove inline style - Player's choice

    // Set style - Player's choice
    if(this.name == "Rock"){
        resultPlayerDiv.classList.add("rock-style");
    } else if (this.name == "Paper") {
        resultPlayerDiv.classList.add("paper-style");
    } else if (this.name == "Scissors"){
        resultPlayerDiv.classList.add("scissors-style");
    }

    resetResults(); 

    // Calculate random pc choice
    let randomNumber = Math.floor(Math.random()*3); //Generate a random number between 0-2
    let pcChoice = theImages[randomNumber].name; //Get the name of the pc's choice based on the random number randomNumber above

    // calculateWinner function calculates who wins AND calculates the score
    const whoWins = calculateWinner(this.name, pcChoice); 
    
    // Display score, pc image, message (draw, win, loose), and in case of winner the background
    displayResults(whoWins,calculateScore,randomNumber);
}


function resetResults() {
    resultContainer.style.display = "grid"; // Display Result's div
    resultPcImage.style.visibility = "hidden"; //we hide it so that the previous result does not show

    // Initial color for resultPcDiv is grey (before the choice of the pc is shown)
    resultPcDiv.style.background = ""; //remove inline style
    resultPcDiv.style.border = ""; //remove inline style
    resultPcDiv.style.boxShadow = ""; //remove inline style
    resultPcDiv.classList.add('gray-style'); //set it to gray

    message.innerHTML = ""; //we clear the message
}

function calculateWinner(player, pc){
    let pcWins;

    if (player === pc){
        text = "IT'S A DRAW";
        pcWins = undefined;
    } else if ((player === "Rock" && pc === "Paper") || (player === "Scissors" && pc === "Rock") || (player === "Paper" && pc === "Scissors")) {
        text = "YOU LOOSE";
        pcWins = true;
    } else {
        text = "YOU WIN";
        pcWins = false;
        calculateScore = calculateScore + 1;
    }

    return pcWins;
}



function displayResults(a,b,c){
    // if (a == true){
    //     resultPcDiv.classList.add("winner-animation");
    // } else if (a == false){
    //     resultPlayerDiv.classList.add("winner-animation");
    // } else if (a == undefined){
    //     console.log ("draw - a is undefined");
    // }
    
    setTimeout(function(){
        resultPcImage.style.visibility = "visible";
        resultPcImage.src = theImages[c].src;
        resultPcDiv.style.background = "white"; //set color to white
        resultPcDiv.classList.remove('gray-style');

        if(theImages[c].name == "Rock"){
            resultPcDiv.classList.add("rock-style");
        } else if (theImages[c].name == "Paper") {
            resultPcDiv.classList.add("paper-style");
        } else if (theImages[c].name == "Scissors"){
            resultPcDiv.classList.add("scissors-style");
            console.log("name is sc")
        }

        score.innerHTML = calculateScore;
        message.innerHTML = text;
        },3000);

    selectContainer.style.display = "none";
}


function playAgain() {
    // Remove all the styles - PC choice
    resultPcDiv.classList.remove('gray-style');
    resultPcDiv.classList.remove("rock-style");
    resultPcDiv.classList.remove("paper-style");
    resultPcDiv.classList.remove("scissors-style");

    resultContainer.style.display = "none"; //we remove the div with the results of the previous match
    selectContainer.style.display = "grid"; //we go back to the div with the game


}

