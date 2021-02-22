
// Our 2 containers-divs
const selectContainer = document.querySelector(".select");
const resultContainer = document.querySelector(".result");

//
const score = document.querySelector('#header__score__count');
const message = document.querySelector('.result__message');

// The player's 3 options (rock, paper, scissors) - can be clicked
const playerRock = document.querySelector('.rock');
const playerPaper = document.querySelector('.paper');
const playerScissors = document.querySelector('.scissors');

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
    src: "/images/icon-rock.svg",
    border: "20px solid hsl(349, 70%, 56%)",
    shadow: "0 10px  hsl(349, 71%, 52%), inset 0 10px rgb(219, 219, 219)",
    name: "Rock"
}, {
    src: "/images/icon-paper.svg",
    border: "20px solid hsl(230, 89%, 65%)",
    shadow: "0 10px  hsl(230, 89%, 62%), inset 0 10px rgb(219, 219, 219)",
    name: "Paper"
}, {
    src: "/images/icon-scissors.svg",
    border: "20px solid hsl(40, 84%, 53%)",
    shadow: "0 10px  hsl(39, 89%, 49%), inset 0 10px rgb(219, 219, 219)",
    name: "Scissors"
}];

//Set EventListeners, number/name properties for the player's choice
playerRock.addEventListener('click', playGame);
playerRock.name = "Rock"; //The name should be the same as the name property of the theImage array
playerRock.index = 0;

playerPaper.addEventListener('click', playGame);
playerPaper.name = "Paper"; //The name should be the same as the name property of the theImage array
playerPaper.index = 1;

playerScissors.addEventListener('click', playGame);
playerScissors.name = "Scissors"; //The name should be the same as the name property of the theImage array
playerScissors.index = 2;

// playGame function - game logic
function playGame() {
    resultPlayerImage.setAttribute("src", this.src); // Display Player's choice
    resultPlayerDiv.style.border = theImages[this.index].border; //Change border color based on player's choice
    resultPlayerDiv.style.boxShadow = theImages[this.index].shadow; //Change shadows based on player's choice
    
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
    resultPcDiv.style.background = "rgb(219, 219, 219)"; //set to grey 
    resultPcDiv.style.border = "20px solid rgb(219, 219, 219)"; //set to grey 
    resultPcDiv.style.boxShadow = ""; //remove box shadow 

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
        resultPcDiv.style.border = theImages[c].border; //Change border color based on pc's choice
        resultPcDiv.style.boxShadow = theImages[c].shadow; //Change shadows based on pc's choice



        score.innerHTML = calculateScore;
        message.innerHTML = text;
        },600);

    selectContainer.style.display = "none";
}


function playAgain() {
    resultContainer.style.display = "none"; //we remove the div with the results of the previous match
    selectContainer.style.display = "grid"; //we go back to the div with the game
}

