//This file requires the Word.js file
var Word = require("./Word.js");
//Game requires inquirer npm package to prompt user.
var inquirer = require("inquirer");
//Game requires cli-color npm package for styling of game.
var clc = require('cli-color');
//Game requires figlet npm package to convert text to drawing.
var figlet = require('figlet');

//Our word bank - predefined list of words to choose from. Theme is Minnesota cities.
var wordList = ["Burnsville", "Duluth", "Brainerd", "Minneapolis", "Lakeville"];
//Choose random word from wordList.
var randomWord = "";

//When user enters "node index.js", convert "Hangman Game" text characters to drawings using figlet package.
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

//Use Inquirer package to display ready to start game confirmation.
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
			chooseRandomWord();
			//guessLetter();
		}

		else {
			console.log("Good bye!");
			return;
		}
	});
}


function chooseRandomWord() {
//Randomly generate word from wordList array.
//Let's also change all the letters to upper case cause I'm cool like that.
randomWord = wordList[Math.floor(Math.random() * wordList.length)];
console.log(randomWord.toUpperCase());

//I think we need to use the Word constructor here... Not entirely sure though. Just kind of guessing at this point.
var someWord = new Word (randomWord);
someWord.splitWord();

//Determine number of underscores needed based on length of this.letters array in the Word constructor.
// numberUnderscoresNeeded = someWord.letters.length;
// console.log("Underscores: " + numberUnderscoresNeeded);

// //Create for loop that pushes the underscores to the this.underscores array in Word constructor.
// 	for (var i=0; i < numberUnderscoresNeeded; i++ ) {
// 		someWord.underscores.push("_ ");
// 	}
// 	console.log(someWord.underscores);
// 	//Use the 
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