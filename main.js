var nameGuessInputs = document.querySelectorAll('.name-guess');
var submitGuessBtn = document.querySelector('.submit-guess-button');
var clearFormBtn = document.querySelector('.clear-form-button');

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
  name1input.value = "";
  guess1input.value = "";
  name2input.value = "";
  guess2input.value = "";
  submitGuessBtn.setAttribute("disabled", "disabled");
  clearFormBtn.setAttribute("disabled", "disabled");

});
