
var nameGuessInputs = document.querySelectorAll('.name-guess');
var submitGuessBtn = document.querySelector('.submit-guess-button');
var clearFormBtn = document.querySelector('.clear-form-button');
var updateBtn = document.querySelector('.update-button')
var name1input = document.querySelector('#challenger-1-name-input');
var guess1input = document.querySelector('#challenger-1-guess-input');
var name2input = document.querySelector('#challenger-2-name-input');
var guess2input = document.querySelector('#challenger-2-guess-input');
var name1Display = document.querySelector('#challenger-1-name');
var guess1Display = document.querySelector('#challenger-1-guess');
var name2Display = document.querySelector('#challenger-2-name');
var guess2Display = document.querySelector('#challenger-2-guess');
var response1Display = document.querySelector('#response1');
var response2Display = document.querySelector('#response2');
var minInput = document.querySelector('#min');
var maxInput = document.querySelector('#max');
var minDisplay = document.querySelector('#min-display');
var maxDisplay = document.querySelector('#max-display');
var rightSide = document.querySelector('.right-section')
var guesses = 0;
var startTime = new Date();
var minNumber = 1;
var maxNumber = 100;
var number = calculateMaxMinRandom(minNumber, maxNumber);
var cheatCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
var index = 0;

playGame();

function playGame () {
  var winner;
  updateBtn.addEventListener('click', setMinMax);
  for (var i = 0; i < nameGuessInputs.length; i++) {
    nameGuessInputs[i].addEventListener("keyup", checkInputsAllFilled);
  };
  for (var i = 0; i < nameGuessInputs.length; i++) {
    nameGuessInputs[i].addEventListener("keyup", checkInputsAnyFilled);
  };
  minInput.addEventListener("keyup", checkMinMaxFilled);
  maxInput.addEventListener("keyup", checkMinMaxFilled);
  clearFormBtn.addEventListener("click", clearForm);
  submitGuessBtn.addEventListener("click", submitGuess);
  window.addEventListener("keyup", listenForCode);
}

function setMinMax () {
  minNumber = parseInt(minInput.value);
  maxNumber = parseInt(maxInput.value);
  number = calculateMaxMinRandom(minNumber, maxNumber);
  minDisplay.innerText = minNumber;
  maxDisplay.innerText = maxNumber;
}

function calculateMaxMinRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function checkMinMaxFilled() {
  if ((minInput.value != "") && (maxInput.value != "")) {
    updateBtn.removeAttribute("disabled");
  } else {
    updateBtn.setAttribute("disabled", "disabled");
  };
};

function checkInputsAllFilled(){
  if ((nameGuessInputs[0].value != "") &&
  (nameGuessInputs[1].value != "") &&
  (nameGuessInputs[2].value != "") &&
  (nameGuessInputs[3].value != "")
  ){
    submitGuessBtn.removeAttribute("disabled");
  } else {
    submitGuessBtn.setAttribute("disabled", "disabled");
  }
}

function checkInputsAnyFilled(){
  if ((nameGuessInputs[0].value != "") ||
  (nameGuessInputs[1].value != "") ||
  (nameGuessInputs[2].value != "") ||
  (nameGuessInputs[3].value != "")
  ){
    clearFormBtn.removeAttribute("disabled");
  }
}

function clearForm () {
 for (var i = 0; i< nameGuessInputs.length; i++) {
   nameGuessInputs[i].value = "";
 }
 submitGuessBtn.setAttribute("disabled", "disabled");
 clearFormBtn.setAttribute("disabled", "disabled");
}

function clearGuesses () {
  guess1input.value = "";
  guess2input.value = "";
  submitGuessBtn.setAttribute("disabled", "disabled");
}

function checkWinner (player1, guess1, player2, guess2) {
  if (guess1 == number) {
    winner = player1;
    displayWinner(winner);
  } else if (guess2 == number) {
    winner = player2;
    displayWinner(winner);  }
}

function submitGuess() {
  guesses++
  displayNamesGuesses(name1input.value, guess1input.value, name2input.value, guess2input.value);
  displayResponses(evaluateGuess(guess1input.value, number), evaluateGuess(guess2input.value, number));
  checkWinner(name1input.value, guess1input.value, name2input.value, guess2input.value);
  clearGuesses();

}

//evaluates guess
function evaluateGuess (guess, number) {
  if (guess < number) {
    return "That's too low"
  } else if (guess > number) {
    return "That's too high"
  } else {
    return "BOOM!"
  };
}

function displayNamesGuesses (name1, guess1, name2, guess2) {
  name1Display.innerText = name1;
  guess1Display.innerText = guess1;
  name2Display.innerText = name2;
  guess2Display.innerText = guess2;
}

function displayResponses (response1, response2) {
  response1Display.innerText = response1;
  response2Display.innerText = response2;
};

function displayWinner (winner) {
  var minutes = Math.floor(timer()/60);
  var seconds = Math.floor(timer()%60);
  rightSide.insertAdjacentHTML('afterbegin', `<div class="result-card"><div class="card-row row-1"><div class="row-line-1 card-row-item">${name1input.value}</div><div class="row-line-1 card-row-item">vs.</div><div class="row-line-1 card-row-item">${name2input.value}</div></div><div class="winner-section"><h1 id="winner-name">${winner}</h1><h1>Winner</h1></div><div class="card-row last-row"><div class="card-row-item"><span>${guesses}</span> guesses</div><div class="card-row-item"><span>${minutes}</span> ${minutes < 1 || minutes > 1 ? 'minutes' : 'minute'} <span>${seconds}</span> ${seconds > 1 ? 'seconds' : 'second'}</div><img src="./assets/close.svg" id="x-button"></div></div>`);
  reset();
}

function reset () {
  number = calculateMaxMinRandom(minNumber, maxNumber);
  guesses = 0;
  startTime = new Date();
  winner = "";
}

function timer() {
  return (new Date() - startTime) / 1000;
}
