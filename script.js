const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.querySelector('.player-score');
const computerScoreElem = document.querySelector('.computer-score');
const resultElem = document.querySelector('#result');
const playAgainBtn = document.querySelector('#play-again');
const countdownElem = document.querySelector('#countdown');
const computerChoiceElem = document.querySelector('#computer-choice');

const weapons = ['rock', 'paper', 'scissors'];
let playerScore = 0;
let computerScore = 0;
let countdown = 10;
let timeout;

// Function to generate random weapon for computer
function getComputerChoice() {
  const weaponIndex = Math.floor(Math.random() * weapons.length);
  return weapons[weaponIndex];
}

// Function to update score and display result
function playRound(playerSelection, computerSelection) {
  clearTimeout(timeout);
  if (playerSelection) {
    computerChoiceElem.innerHTML = `Computer choose: ${computerSelection}.`;
    if (playerSelection === computerSelection) {
      resultElem.innerHTML = "It's a tie!";
    } else if (
      (playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
      resultElem.innerHTML = 'You win!';
      playerScore++;
      playerScoreElem.innerHTML = `Player: ${playerScore}`;
    } else {
      resultElem.innerHTML = 'Computer wins!';
      computerScore++;
      computerScoreElem.innerHTML = `Computer: ${computerScore}`;
    }
    startTimer();
  } else {
    computerChoiceElem.innerHTML = `Game Over`;
    resultElem.innerHTML = 'You did not make a choice! | You lose the game!';
    resultElem.style.color = 'red';
    disableOptions();
  }

  if (playerScore === 5) {
    resultElem.textContent = 'You win the game!';
    resultElem.style.color = 'green';
    computerChoiceElem.innerHTML = 'Game Over';
    disableOptions();
    stopTimer();
  }

  if (computerScore === 5) {
    resultElem.textContent = 'You lose the game!';
    resultElem.style.color = 'red';
    computerChoiceElem.innerHTML = 'Game Over';
    disableOptions();
    stopTimer();
  }
}

function capitalize(string) {
    return (
      string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
    );
  }


// Function to handle player choice
function selectWeapon() {
  clearTimeout(timeout);
  countdownElem.innerHTML = '10';
  countdown = 10;
  const playerSelection = this.id;
//   capitalize(play) 

console.log(playerSelection)
   
  const computerSelection = getComputerChoice();
  playRound(playerSelection, computerSelection);
}

// Function to start countdown timer
function startTimer() {
  countdown--;
  countdownElem.innerHTML = countdown;
  if (countdown === 0) {
    const computerSelection = getComputerChoice();
    playRound(null, computerSelection);
  } else {
    timeout = setTimeout(startTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(timeout);
  countdown = 10;
  countdownElem.textContent = countdown;
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  countdown = 10;
  playerScoreElem.innerHTML = 'Player: 0';
  computerScoreElem.innerHTML = 'Computer: 0';
  resultElem.innerHTML = 'Choose your weapon!';
  countdownElem.innerHTML = '10';
  resultElem.style.color = '#660033';
  computerChoiceElem.innerHTML = '';
  enableOptions();
  startTimer();
}

function disableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'none';
  });
}

function enableOptions() {
  choices.forEach((choice) => {
    choice.style.pointerEvents = 'auto';
  });
}

// Event listeners
choices.forEach((choice) => choice.addEventListener('click', selectWeapon));
playAgainBtn.addEventListener('click', resetGame);

// Start countdown timer when page loads
countdownElem.innerHTML = countdown; // Set initial value of countdown in HTML
timeout = setTimeout(startTimer, 1000);


