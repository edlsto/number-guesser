
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
var rightSide = document.querySelector('.right-section');
var resetBtn = document.querySelector('.reset-game-button');
var errorAlert = document.querySelector('.error-message')
var guesses = 0;
var startTime = new Date();
var minNumber = 1;
var maxNumber = 100;
minInput.addEventListener('keyup', valueCompare)
maxInput.addEventListener('keyup', valueCompare)
function valueCompare() {
 if (parseInt(maxInput.value) < parseInt(minInput.value) &&
    (minInput.value != "") && (maxInput.value != "")) {
        errorAlert.removeAttribute('hidden');
        maxInput.classList.add('max-input-border')
    } else {
      errorAlert.setAttribute('hidden', true);
      maxInput.classList.remove('max-input-border')
        }
     };


function calculateMaxMinRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var number = calculateMaxMinRandom(minNumber, maxNumber);
var cheatCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
var index = 0;
var leastGuesses = 0;
var leastTime;


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
  window.addEventListener("keyup", cheat);
  resetBtn.addEventListener('click', resetGame);
}

function setMinMax () {
  minNumber = parseInt(minInput.value);
  maxNumber = parseInt(maxInput.value);
  number = calculateMaxMinRandom(minNumber, maxNumber);
  minDisplay.innerText = minNumber;
  maxDisplay.innerText = maxNumber;
  resetBtn.removeAttribute("disabled");
  updateBtn.setAttribute("disabled", "disabled");
  minInput.value = "";
  maxInput.value = ""
}

function calculateMaxMinRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function checkMinMaxFilled() {
  if (
    (Number.isInteger(parseInt(minInput.value))) &&
    (Number.isInteger(parseInt(maxInput.value)))
  ) {
    updateBtn.removeAttribute("disabled");
  } else {
    updateBtn.setAttribute("disabled", "disabled");
  };
};

function checkInputsAllFilled(){
  if (((isNaN(parseInt(nameGuessInputs[0].value))) &&
  (isNaN(parseInt(nameGuessInputs[2].value)))
) && (
  (Number.isInteger(parseInt(nameGuessInputs[1].value))) &&
  (Number.isInteger(parseInt(nameGuessInputs[3].value)))
))
  {
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
  if ((guess1 == number) && (guess2 == number)) {
    winner = "Tie!";
    displayWinner(winner);
  } else if (guess1 == number) {
    winner = player1;
    displayWinner(winner);
  } else if (guess2 == number) {
    winner = player2;
    displayWinner(winner);  }
}

function submitGuess() {
  guesses++;
  resetBtn.removeAttribute("disabled");
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
  if (rightSide.innerText == "") {
    rightSide.insertAdjacentHTML('afterbegin', `<div class="clear-btn-container"><button class="clear-all-btn" type="button">CLEAR ALL</button></div><div class="cards"><div class="result-card"><div class="card-row row-1"><div class="row-line-1 card-row-item">${name1input.value}</div><div class="row-line-1 card-row-item">vs.</div><div class="row-line-1 card-row-item">${name2input.value}</div></div><div class="winner-section"><h1 id="winner-name">${winner}</h1><h1>Winner</h1></div><div class="card-row last-row"><div class="card-row-item"><span>${guesses}</span> ${guesses === 1 ? 'guess' : 'guesses'}</div><div class="card-row-item time"><span>${minutes}</span> ${minutes < 1 || minutes > 1 ? 'minutes' : 'minute'} <span>${seconds}</span> ${seconds > 1 ? 'seconds' : 'second'}</div><img src="./assets/close.svg" id="x-button"></div></div></div>`);
    var timeContainer = document.querySelector('.time');
    timeContainer.insertAdjacentHTML('afterend', '<div class="least-guesses">Fewest guesses</div>');
    timeContainer.insertAdjacentHTML('afterend', '<div class="least-time">Least time</div>')
    leastGuesses = guesses;
    leastTime = timer();
  } else {
    var cards = document.querySelector(".cards");
    cards.insertAdjacentHTML('afterbegin', `<div class="result-card"><div class="card-row row-1"><div class="row-line-1 card-row-item">${name1input.value}</div><div class="row-line-1 card-row-item">vs.</div><div class="row-line-1 card-row-item">${name2input.value}</div></div><div class="winner-section"><h1 id="winner-name">${winner}</h1><h1>Winner</h1></div><div class="card-row last-row"><div class="card-row-item"><span>${guesses}</span> ${guesses === 1 ? 'guess' : 'guesses'}</div><div class="card-row-item time"><span>${minutes}</span> ${minutes < 1 || minutes > 1 ? 'minutes' : 'minute'} <span>${seconds}</span> ${seconds > 1 ? 'seconds' : 'second'}</div><img src="./assets/close.svg" id="x-button"></div></div>`);
    if (guesses < leastGuesses) {
      var leastGuessesLabel = document.querySelectorAll('.least-guesses');
      for (var i = 0; i < leastGuessesLabel.length; i++) {
        leastGuessesLabel[i].remove();
      }
      var timeContainer = document.querySelector('.time');
      timeContainer.insertAdjacentHTML('afterend', '<div class="least-guesses">Fewest guesses</div>');
      leastGuesses = guesses;
      } else if (guesses == leastGuesses) {
        var timeContainer = document.querySelector('.time');
        timeContainer.insertAdjacentHTML('afterend', '<div class="least-guesses">Fewest guesses</div>');
        leastGuesses = guesses;
      }
    if (timer() < leastTime) {
      var leastTimeLabel = document.querySelector('.least-time');
      leastTimeLabel.remove();
      var timeContainer = document.querySelector('.time');
      timeContainer.insertAdjacentHTML('afterend', '<div class="least-time">Least time</div>');
      leastTime = timer();
      }
  }
  reset();
}

var rightSideSection = document.querySelector(".right-section");
rightSideSection.addEventListener('click', closeAllCards);

function closeAllCards (event) {
  if (event.target.className === "clear-all-btn") {
    rightSideSection.innerHTML = '';
  }
}

function reset () {
  number = calculateMaxMinRandom(minNumber, maxNumber);
  guesses = 0;
  startTime = new Date();
  winner = "";
  clearGuesses();
  increaseRange();
}

function increaseRange() {
  minNumber = minNumber - 10;
  maxNumber = maxNumber + 10;
  minDisplay.innerText = minNumber;
  maxDisplay.innerText = maxNumber;
}

function resetGame () {
  displayNamesGuesses("Challenger 1 Name", "", "Challenger 2 Name", "");
  displayResponses("no guesses yet!", "no guesses yet!");
  number = calculateMaxMinRandom(minNumber, maxNumber);
  guesses = 0;
  startTime = new Date();
  winner = "";
  clearForm();
  resetBtn.setAttribute("disabled", "disabled");
  minNumber = 1;
  maxNumber = 100;
  minInput.value = "";
  maxInput.value = "";
  minDisplay.innerText = minNumber;
  maxDisplay.innerText = maxNumber;
  updateBtn.setAttribute("disabled", "disabled");
}

function timer() {
  return (new Date() - startTime) / 1000;
};

var rightSideSection = document.querySelector(".right-section");
rightSideSection.addEventListener('click', closeCard);

function closeCard (event) {
  if (event.target.id === "x-button") {
    event.target.parentElement.parentElement.remove();
  }
}

function cheat(event) {
  var code = event.keyCode;
  if (cheatCode[index] === code) {
    index++;
    if (index === cheatCode.length) {
      number = guess1input.value;
		};
	} else {
    index = 0;
  }
};
