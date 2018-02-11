var Word = require("./Word.js");
var inquirer = require("inquirer");
var clc = require('cli-color');
var figlet = require('figlet');

// console.log(clc.blueBright("Welcome to the Hangman Game!"));
// console.log(clc.blueBright("Theme: Minnesota cities")

figlet("Hangman Game", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log(clc.blueBright("Welcome to the Hangman Game!"));
    console.log(clc.blueBright("Theme: Minnesota cities"));
    confirmStart();
});

function confirmStart() {
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
}

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