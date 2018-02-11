var Word = require("./Word.js");
var inquirer = require("inquirer");

console.log("Welcome to the Hangman Game!")
console.log("Theme: Minnesota cities")

var readyToStartGame = [
 {
    type: 'confirm',
    name: 'readyToPlay',
    message: 'Are you ready to play?',
    default: true
  }
];

inquirer.prompt(readyToStartGame).then(answers => {
	if (answers.readyToPlay){
		console.log("Great! Let's begin...");
		guessLetter();
	}

	else {
		console.log("Good bye!");
		return;
	}
});

function guessLetter(){
	inquirer.prompt([
  {
    name: "letter",
    message: "Guess a letter"
  }
]).then(function(answers) {
	console.log(answers.letter);
});

}