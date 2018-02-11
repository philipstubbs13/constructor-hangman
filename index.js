//This file requires the Word.js file
var Word = require("./Word.js");

//Game requires inquirer npm package to prompt user.
var inquirer = require("inquirer");

//Game requires cli-color npm package to give the game some color.
var clc = require('cli-color');

//Game requires figlet npm package to convert text to drawing.
var figlet = require('figlet');

//Let's require the Letter constructor.
var Letter = require("./Letter.js");

//Pre-defined color for incorrect guess.
var incorrect = clc.red.bold;

//Pre-defined color for correct guess.
var correct = clc.green.bold;

//https://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected

//When user guesses correctly, set this variable to true for that letter. The default value will be false.
var userGuessedCorrectly = false;

//Our word bank - predefined list of words to choose from. Theme is Minnesota cities.
var wordList = ["burnsville", "duluth", "brainerd", "minneapolis", "lakeville", "blaine", "eagan", "minnetonka", "bloomington", "mankato", "edina", "bemidji", "shakopee", "chanhassen", "owatonna"];
//Choose random word from wordList.
var randomWord;
var someWord;
//Counters for wins, losses, and guesses remaining.
var wins = 0;
var losses = 0;
var guessesRemaining = 10;
//Creating a variable to hold the letter that the user enters at the inquirer prompt.
var userGuess = "";
//Creating a variable to hold letters that user already guessed.
var lettersAlreadyGuessedList = "";
var lettersAlreadyGuessedListArray = [];

//Number of underscores/slots filled in with a letter.
var slotsFilledIn = 0;

//Creating a variable to determine number of correct gueses by user, which will help determine when the user wins.
var numberOfCorrectGuesses = 0;

//Holds all letter objects
var newRoundLetter = [];

//Possible values the user can choose on the keyboard.
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i" , "j" , "k" ,  "l" , "m" , "n" , "o" , "p" , "q" , "r" , "s" , "t" , "u", "v", "w", "x", "y", "z"];


randomWord = wordList[Math.floor(Math.random() * wordList.length)];
someWord = new Word (randomWord);

//When user enters "node index.js", convert "Hangman Game" text characters to drawings using figlet package.
figlet("Hangman Game", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    //Welcome screen
    console.log(clc.cyanBright("Welcome to the Hangman Game (Minnesota Edition)!"));
    console.log(clc.cyanBright("Theme is... Minnesota cities."));
    var howToPlay = 
    "==========================================================================================================" + "\r\n" +
    "How to play" + "\r\n" +
    "==========================================================================================================" + "\r\n" +
    "When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter." + "\r\n" +
    "Keep guessing letters. When you guess a letter, your choice is either correct or incorrect." + "\r\n" +
    "If incorrect, the letter you guessed does not appear in the word." + "\r\n" + 
    "For every incorrect guess, the number of guesses remaining decrease by 1." + "\r\n" +
    "If correct, the letter you guessed appears in the word." + "\r\n" +
    "If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win." + "\r\n" +
    "If you run out of guesses before the entire word is revealed, you lose. Game over." + "\r\n" +
    "===========================================================================================================" + "\r\n" 
    console.log(clc.cyanBright(howToPlay));
    confirmStart();
});

//Use Inquirer package to display game confirmation prompt to user.
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
		//If the user confirms that they want to play, start game.
		if (answers.readyToPlay){
			console.log(clc.cyanBright("Great! Let's begin..."));
			startGame();
		}

		else {
			//If the user decides they don't want to play, exit game.
			console.log(clc.cyanBright("Good bye!"));
			return;
		}
	});
}

//Start game function.
function startGame(){
	//Reset/set number of guesses remaining when user starts a new game.
	guessesRemaining = 10;
	//Pick random word from word list.
	chooseRandomWord();
	//Start inquirer. Prompt user to guess a letter.
	guessLetter();
}

//Function to choose a random word from the list of cities in the word bank array.
function chooseRandomWord() {
//Randomly generate word from wordList array.
randomWord = wordList[Math.floor(Math.random() * wordList.length)];
someWord = new Word (randomWord);
//Let's also change all the letters to lower case.
console.log(randomWord.toLowerCase());
//Use the Word constructor in Word.js to split the word and generate letters.
someWord.splitWord();
someWord.generateLetters();
}

//Function that will prompt the user to enter a letter. This letter is the user's guess.
function guessLetter(){
	inquirer.prompt([
  {
    name: "letter",
    message: "Guess a letter:"
  }
]).then(function(guess) {
	//Convert all letters guessed by the user to lower case.
	guess.letter.toLowerCase();
	if (alphabet.indexOf(guess.letter) === -1) {
		console.log("Dude, that's not a single letter. Enter one letter and try again.");
		guessLetter();
	}
	console.log("You guessed: " + guess.letter);
	//Assume correct guess to be false at this point.
	userGuessedCorrectly = false;
	//Need to find out if letter was already guessed by the user. If already guessed by the user, notify the user to enter another letter.
	//User shouldn't be able to continue with game if they guess the same letter more than once.
	if (lettersAlreadyGuessedListArray.indexOf(guess.letter) > -1) {
		//If user already guessed a letter, run inquirer again to prompt them to enter a different letter.
		console.log("You already guessed that letter. Enter another one.");
		guessLetter();
	}

	else {
	//Add letter to list of already guessed letters.
	lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter);
	lettersAlreadyGuessedListArray.push(guess.letter);
	//Show letters already guessed to user.
	console.log("Letters already guessed: " + lettersAlreadyGuessedList);

	//We need to loop through all of the letters in the word, 
	//and determine if the letter that the user guessed matches one of the letters in the word.
	for (i=0; i < someWord.letters.length; i++) {
		//If the user guess equals one of the letters/characters in the word and letterGuessedCorrectly is equal to false for that letter...
		if (guess.letter === someWord.letters[i].character && someWord.letters[i].letterGuessedCorrectly === false) {
			//Set letterGuessedCorrectly property for that letter equal to true.
			someWord.letters[i].letterGuessedCorrectly === true;
			//Set userGuessedCorrectly to true.
			userGuessedCorrectly = true;
			someWord.underscores[i] = guess.letter;
			// someWord.underscores.join("");
			// console.log(someWord.underscores);
			//Increment the number of slots/underscores filled in with letters by 1.
			slotsFilledIn++
			//console.log("Number of slots remaining " + slotsFilledIn);
			}
		}
			someWord.splitWord();
			someWord.generateLetters();
	}

	//If user guessed correctly...
	if (userGuessedCorrectly) {
		console.log(correct('CORRECT!'));
		//Add to the number of correct guesses.
		numberOfCorrectGuesses++;
		checkIfUserWon();
	}

	//Else if user guessed incorrectly...
	else if (userGuessedCorrectly === false && alphabet.indexOf(guess.letter) >= 0) {
		console.log(incorrect('INCORRECT!'));
		//Decrease number of guesses remaining by 1.
		guessesRemaining--;
		console.log("You have " + guessesRemaining + " guesses left.");
		checkIfUserWon();
	}

});
}

//This function will check if the user won or lost after user guesses a letter.
function checkIfUserWon() {
	//If number of guesses remaining is 0, end game.
	if (guessesRemaining === 0) {
		console.log(incorrect('YOU LOST. BETTER LUCK NEXT TIME.'));
		console.log(clc.cyanBright("The correct word was: " + randomWord));
		//Increment loss counter by 1.
		losses++;
		console.log(clc.cyanBright("Wins: " + wins));
		console.log(clc.cyanBright("Losses: " + losses));
		//Ask user if they want to play again. Call playAgain function.
		playAgain();
	}

	//else if the number of slots/underscores that are filled in with a letter equals the number of letters in the word, the user won.
	else if (slotsFilledIn === someWord.letters.length) {
		console.log(correct('YOU WON!!!!!'));
		//Increment win counter by 1.
		wins++;
		//Show total wins and losses.
		console.log(clc.cyanBright("Wins: " + wins));
		console.log(clc.cyanBright("Losses: " + losses));
		//Ask user if they want to play again. Call playAgain function.
		playAgain();
	}

	else {
		//If user did not win or lose after a guess, keep running inquirer.
		guessLetter("");
	}

}

//Create a function that will ask user if they want to play again at the end of the game.
function playAgain() {
	var playGameAgain = [
	 {
	    type: 'confirm',
	    name: 'playAgain',
	    message: 'Do you want to play again?',
	    default: true
	  }
	];

	inquirer.prompt(playGameAgain).then(userWantsTo => {
		if (userWantsTo.playAgain){
			//Empty out the array that contains the letters already guessed.
			lettersAlreadyGuessedList = "";
			lettersAlreadyGuessedListArray = [];
			//Set number of slots filled in with letters back to zero.
			slotsFilledIn = 0;
			startGame();
		}

		else {
			//If user doesn't want to play again, exit game.
			console.log(clc.cyanBright("Good bye!"));
			return;
		}
	});
}

