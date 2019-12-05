var nameGuessInputs = document.querySelectorAll('.name-guess');
var submitGuessBtn = document.querySelector('.submit-guess-button');
var clearFormBtn = document.querySelector('.clear-form-button');

var name1input = document.querySelector('#challenger-1-name-input');
var guess1input = document.querySelector('#challenger-1-guess-input');
var name2input = document.querySelector('#challenger-2-name-input');
var guess2input = document.querySelector('#challenger-2-guess-input');
var name1Display = document.querySelector('#challenger-1-name');
var guess1Display = document.querySelector('#challenger-1-guess');
var name2Display = document.querySelector('#challenger-2-name');
var guess2Display = document.querySelector('#challenger-2-guess');


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
  var name1 = name1input.value;
  var guess1 = guess1input.value;
  var name2 = name2input.value;
  var guess2 = guess2input.value;
  name1Display.innerText = name1;
  guess1Display.innerText = guess1;
  name2Display.innerText = name2;
  guess2Display.innerText = guess2;

  var response1 = evaluateGuess(player1.guess, number);
  var response2 = evaluateGuess(player2.guess, number);
  
});

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
