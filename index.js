//This file requires the Word.js file
var Word = require("./Word.js");

//Game requires inquirer npm package to prompt user to enter a letter.
var inquirer = require("inquirer");

//Game requires cli-color npm package to give the game some color.
var clc = require('cli-color');

//Game requires figlet npm package to convert text to drawing.
var figlet = require('figlet');

//npm package used to determine if the value the user enters is actually a letter or not (form validation).
var isLetter = require('is-letter');

//Create boxes in the terminal
const boxen = require('boxen');

//Pre-defined color for incorrect guess.
var incorrect = clc.red.bold;

//Pre-defined color for correct guess.
var correct = clc.green.bold;

//pre-defined color for game text.
var gameTextColor = clc.cyanBright;

//When user guesses correctly, set this variable to true for that letter. The default value will be false.
var userGuessedCorrectly = false;

//Our word bank - predefined list of words to choose from. 
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

//Number of underscores/slots that have been filled in with a letter. 
//When game starts or is reset, this value should be 0.
var slotsFilledIn = 0;

//When user enters game, convert "Hangman Game" text characters to drawings using figlet npm package.
figlet("Hangman Game", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    //Welcome screen text.
    console.log(gameTextColor("Welcome to the Hangman Game!"));
    console.log(gameTextColor("Theme is... Minnesota cities."));
    //Game instructions.
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
    "===========================================================================================================" + "\r\n" +
    "You can exit the game at any time by pressing Ctrl + C on your keyboard." + "\r\n" +
    "===========================================================================================================" 
    console.log(gameTextColor(howToPlay));
 	//Ask user if they are ready to play.
    confirmStart();
});

//Use Inquirer package to display game confirmation prompt to user.
function confirmStart() {
	var readyToStartGame = [
	 {
	 	type: 'text',
	 	name: 'playerName',
	 	message: 'What is your name?'
	 },
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
			console.log(gameTextColor("Great! Welcome, " + answers.playerName + ". Let's begin..."));
			startGame();
		}

		else {
			//If the user decides they don't want to play, exit game.
			console.log(gameTextColor("Good bye, " + answers.playerName + "! Come back soon."));
			return;
		}
	});
}

//Start game function.
function startGame(){
	//Reset number of guesses remainingm when user starts a new game.
	guessesRemaining = 10;
	//Pick random word from word list.
	chooseRandomWord();
	//When game is reset, empty out list of already guessed letters.
	lettersAlreadyGuessedList = "";
	lettersAlreadyGuessedListArray = [];
}

//Function to choose a random word from the list of cities in the word bank array.
function chooseRandomWord() {
//Randomly generate word from wordList array.
randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
//Set the random word chosen from the word list to someWord.
someWord = new Word (randomWord);
//Tell the user how many letters are in the word.
console.log(gameTextColor("Your word contains " + randomWord.length + " letters."));
console.log(gameTextColor("WORD TO GUESS:"));
//Use the Word constructor in Word.js to split the word and generate letters.
someWord.splitWord();
someWord.generateLetters();
guessLetter();
}

//Function that will prompt the user to enter a letter. This letter is the user's guess.
function guessLetter(){
	//Keep prompting user to enter a letter if there are slots/underscores that still need to be filled in
	//OR if there are still guesses remaining.
	if (slotsFilledIn < someWord.letters.length || guessesRemaining > 0) {
	inquirer.prompt([
  {
    name: "letter",
    message: "Guess a letter:",
    //Check if value is a letter (for example, "a") or not a letter ("aba") using the is-letter npm package.
    validate: function(value) {
        if(isLetter(value)){
          return true;
        } 
        else {
          return false;
        }
      }
  }
]).then(function(guess) {
	//Convert all letters guessed by the user to upper case.
	guess.letter.toUpperCase();
	console.log(gameTextColor("You guessed: " + guess.letter.toUpperCase()));
	//Assume correct guess to be false at this point.
	userGuessedCorrectly = false;
	//Need to find out if letter was already guessed by the user. If already guessed by the user, notify the user to enter another letter.
	//User shouldn't be able to continue with game if they guess the same letter more than once.
	if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {
		//If user already guessed a letter, run inquirer again to prompt them to enter a different letter.
		console.log(gameTextColor("You already guessed that letter. Enter another one."));
		console.log(gameTextColor("====================================================================="));
		guessLetter();
	}

	//If user entered a letter that was not already guessed...
	else if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {
		//Add letter to list of already guessed letters.
		lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter.toUpperCase());
		lettersAlreadyGuessedListArray.push(guess.letter.toUpperCase());
		//Show letters already guessed to user.
		console.log(boxen(gameTextColor('Letters already guessed: ') + lettersAlreadyGuessedList, {padding: 1}));

		//We need to loop through all of the letters in the word, 
		//and determine if the letter that the user guessed matches one of the letters in the word.
		for (i=0; i < someWord.letters.length; i++) {
			//If the user guess equals one of the letters/characters in the word and letterGuessedCorrectly is equal to false for that letter...
			if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].letterGuessedCorrectly === false) {
				//Set letterGuessedCorrectly property for that letter equal to true.
				someWord.letters[i].letterGuessedCorrectly === true;
				//Set userGuessedCorrectly to true.
				userGuessedCorrectly = true;
				someWord.underscores[i] = guess.letter.toUpperCase();
				// someWord.underscores.join("");
				// console.log(someWord.underscores);
				//Increment the number of slots/underscores filled in with letters by 1.
				slotsFilledIn++
				//console.log("Number of slots remaining " + slotsFilledIn);
			}
		}
		console.log(gameTextColor("WORD TO GUESS:"));
		someWord.splitWord();
		someWord.generateLetters();

		//If user guessed correctly...
		if (userGuessedCorrectly) {
			//Tell user they are CORRECT (letter is in the word they are trying to guess.)
			console.log(correct('CORRECT!'));
			console.log(gameTextColor("====================================================================="));
			//After each letter guess, check if the user won or lost.
			checkIfUserWon();
		}

		//Else if user guessed incorrectly...
		else {
			//Tell user they are INCORRECT (letter is not in the word).
			console.log(incorrect('INCORRECT!'));
			//Decrease number of guesses remaining by 1 and display number of guesses remaining.
			guessesRemaining--;
			console.log(gameTextColor("You have " + guessesRemaining + " guesses left."));
			console.log(gameTextColor("====================================================================="));
			//After each letter guess, check if the user won or lost.
			checkIfUserWon();
		}
	}
});
}
}

//This function will check if the user won or lost after user guesses a letter.
function checkIfUserWon() {
	//If number of guesses remaining is 0, end game.
	if (guessesRemaining === 0) {
		console.log(gameTextColor("====================================================================="));
		console.log(incorrect('YOU LOST. BETTER LUCK NEXT TIME.'));
		console.log(gameTextColor("The correct city was: " + randomWord));
		//Increment loss counter by 1.
		losses++;
		//Display wins and losses totals.
		console.log(gameTextColor("Wins: " + wins));
		console.log(gameTextColor("Losses: " + losses));
		console.log(gameTextColor("====================================================================="));
		//Ask user if they want to play again. Call playAgain function.
		playAgain();
	}

	//else if the number of slots/underscores that are filled in with a letter equals the number of letters in the word, the user won.
	else if (slotsFilledIn === someWord.letters.length) {
		console.log(gameTextColor("====================================================================="));
		console.log(correct("YOU WON! YOU'RE A TRUE MINNESOTAN!"));
		//Increment win counter by 1.
		wins++;
		//Show total wins and losses.
		console.log(gameTextColor("Wins: " + wins));
		console.log(gameTextColor("Losses: " + losses));
		console.log(gameTextColor("====================================================================="));
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
			console.log(gameTextColor("Great! Welcome back. Let's begin..."));
			//start a new game.
			startGame();
		}

		else {
			//If user doesn't want to play again, exit game.
			console.log(gameTextColor("Good bye! Come back soon."));
			return;
		}
	});
}

