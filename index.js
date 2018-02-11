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
var someWord = "";
//Counters for wins, losses, and guesses remaining.
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
//Creating a variable to hold the letter that the user enters at the inquirer prompt.
var userGuess = "";
//Creating a variable to hold letters that user already guessed.
var lettersAlreadyGuessedArray = [];
//Holds all letter objects
var CreateLetter = [];


//When user enters "node index.js", convert "Hangman Game" text characters to drawings using figlet package.
figlet("Hangman Game", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log(clc.cyanBright("Welcome to the Hangman Game (Minnesota Edition)!"));
    console.log(clc.cyanBright("Theme is... Minnesota cities"));
    var howToPlay = 
    "==========================================================================================================" + "\r\n" +
    "How to play" + "\r\n" +
    "==========================================================================================================" + "\r\n" +
    "When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter." + "\r\n" +
    "Keep guessing letters. When you guess a letter, your choie is either correct or incorrect." + "\r\n" +
    "If incorrect, the letter you guessed does not appear in the word." + "\r\n" + 
    "For every incorrect guess, the number of guesses remaining decrease by 1." + "\r\n" +
    "If correct, the letter you guessed appears in the word." + "\r\n" +
    "If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win." + "\r\n" +
    "If you run out of guesses before the entire word is revealed, you lose. Game over." + "\r\n" +
    "===========================================================================================================" + "\r\n" 
    console.log(clc.cyanBright(howToPlay));
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
			console.log(clc.cyanBright("Great! Let's begin..."));
			startGame();
			//guessLetter();
		}

		else {
			console.log(clc.cyanBright("Good bye!"));
			return;
		}
	});
}

function startGame(){
	//Reset
	guessesRemaining = 10;
	someWord.underscores= [];
	//lettersNotInWordList = [ ];
	//lettersNotInWord = [""];
	//Pick random word from word list.
	chooseRandomWord();
	//Start inquirer. Prompt user to guess a letter.
	guessLetter();
}

function chooseRandomWord() {
//Randomly generate word from wordList array.
//Let's also change all the letters to upper case cause I'm cool like that.
randomWord = wordList[Math.floor(Math.random() * wordList.length)];
console.log(randomWord.toUpperCase());
var someWord = new Word (randomWord);
//I think we need to use the Word constructor here... Not entirely sure though. Just kind of guessing at this point.
someWord.splitWord();
}

function guessLetter(){
	inquirer.prompt([
  {
    name: "letter",
    message: "Guess a letter:"
  }
]).then(function(guess) {
	console.log("You guessed: " + guess.letter);
});

}