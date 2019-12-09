
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
var errorAlert = document.querySelector('.error-message')


//default values to be evaluated in our calculateMaxMinRandom function
//see line 47
var minNumber = 1;
var maxNumber = 100;

minInput.addEventListener('keyup', valueCompare)
maxInput.addEventListener('keyup', valueCompare)
function valueCompare() {
  if(minInput.value < maxInput.value) {
    errorAlert.setAttribute('hidden', true)
  }
};



//calculateMaxMinRandom is a function that creates a random number between
//the min and max assigned by the players. Math.random finds a random decimal
//between 0 and 1. we multiply that by the maximum number to increase the range
//of numbers that can be assigned at random. Math.floor takes that random decimal
//and rounds it down, to give a whole number.

function calculateMaxMinRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//here we assign the variable 'number' to the value, of the number created
//at random between the min and max assigned by the players.
//our updateBtn is listening for a click, when it will set our min and max
//we create a variable from our minInput.value, and we use parseInt to set the
//value to a number, otherwise, it will be interpreted as a string (data coersion)
//we create a variable from our maxInput.value, and we use parseInt to set the
//value to a number, otherwise, it will be interpreted as a string (data coersion)
//we then calculate a random number between the min and max, and reassign that
//to the variable 'number'
//then we take those variables and display them as 'innerText' inside of
//the span we created.

var number = calculateMaxMinRandom(minNumber, maxNumber);
updateBtn.addEventListener('click', setMinMax)
function setMinMax () {
  minNumber = parseInt(minInput.value);
  maxNumber = parseInt(maxInput.value);
  number = calculateMaxMinRandom(minNumber, maxNumber);
  minDisplay.innerText = minNumber;
  maxDisplay.innerText = maxNumber;
}
//this is saying, that "for" every nameGuessInputs input we will add an event listener.
//the event listener will be listening for the "keyup" or any key struck, while in
//the nameGuessInputs. it says that "if" nameGuessInputs[0] through nameGuessInputs[3]
//are all filled, the "disabled" attribute will be removed from the element associated
//with the variable. '&&'= AND......also '!=' = NOT EQUAL TO
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
//this is simply stating that we will set the value of nameGuessInputs to 'empty string'
//when the clearFormBtn is clicked. then we will add the 'disabled' attribute
//to the clearFormBtn and the submitGuessBtn
clearFormBtn.addEventListener('click', clearInputFields);

function clearInputFields() {
  for (var i = 0; i< nameGuessInputs.length; i++) {
    nameGuessInputs[i].value = "";
    }
 submitGuessBtn.setAttribute("disabled", "disabled");
 clearFormBtn.setAttribute("disabled", "disabled");
};
function clearContents () {
  guess1input.value = "";
  guess2input.value = "";
  submitGuessBtn.setAttribute("disabled", "disabled");
  clearFormBtn.setAttribute("disabled", "disabled");
}

//taking the value of a variable, and adding it to a new element
//thake the current value of an element, and send it to the 'innerText'
//of a new element

submitGuessBtn.addEventListener("click", function () {
  var name1 = name1input.value;
  var guess1 = guess1input.value;
  var name2 = name2input.value;
  var guess2 = guess2input.value;
  name1Display.innerText = name1;
  guess1Display.innerText = guess1;
  name2Display.innerText = name2;
  guess2Display.innerText = guess2;
  clearContents();
  var response1 = evaluateGuess(guess1, number);
  var response2 = evaluateGuess(guess2, number);
  response1Display.innerText = response1;
  response2Display.innerText = response2;
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
