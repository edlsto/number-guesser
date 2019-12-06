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
var minNumber = 1;
var maxNumber = 100;

function calculateMaxMinRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var number = calculateMaxMinRandom(minNumber, maxNumber);

updateBtn.addEventListener('click', setMinMax);

function setMinMax () {
  minNumber = parseInt(minInput.value);
  maxNumber = parseInt(maxInput.value);
  number = calculateMaxMinRandom(minNumber, maxNumber);
  minDisplay.innerText = minNumber;
  maxDisplay.innerText = maxNumber;
}

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

for (var i = 0; i < nameGuessInputs.length; i++) {
  nameGuessInputs[i].addEventListener("keyup", function(){
    if ((nameGuessInputs[0].value != "") &&
    (nameGuessInputs[1].value != "") &&
    (nameGuessInputs[2].value != "") &&
    (nameGuessInputs[3].value != "")
    ){
      submitGuessBtn.removeAttribute("disabled");
    } else {
      submitGuessBtn.setAttribute("disabled", "disabled");
    }
  });
}

for (var i = 0; i < nameGuessInputs.length; i++) {
  nameGuessInputs[i].addEventListener("keyup", function(){
    if ((nameGuessInputs[0].value != "") ||
    (nameGuessInputs[1].value != "") ||
    (nameGuessInputs[2].value != "") ||
    (nameGuessInputs[3].value != "")
    ){
      clearFormBtn.removeAttribute("disabled");
    }
  });
}

clearFormBtn.addEventListener("click", function () {
 for (var i = 0; i< nameGuessInputs.length; i++) {
   nameGuessInputs[i].value = "";
 }
 submitGuessBtn.setAttribute("disabled", "disabled");
 clearFormBtn.setAttribute("disabled", "disabled");
});

submitGuessBtn.addEventListener("click", function () {
  var name1input = document.querySelector('#challenger-1-name-input');
  var name1 = name1input.value;
  var guess1input = document.querySelector('#challenger-1-guess-input');
  var guess1 = guess1input.value;
  var name2input = document.querySelector('#challenger-2-name-input');
  var name2 = name2input.value;
  var guess2input = document.querySelector('#challenger-2-guess-input');
  var guess2 = guess2input.value;
  var name1Display = document.querySelector('#challenger-1-name');
  name1Display.innerText = name1;
  var guess1Display = document.querySelector('#challenger-1-guess');
  guess1Display.innerText = guess1;
  var name2Display = document.querySelector('#challenger-2-name');
  name2Display.innerText = name2;
  var guess2Display = document.querySelector('#challenger-2-guess');
  guess2Display.innerText = guess2;

});
