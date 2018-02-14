// Word.js: Contains a constructor, Word that depends on the Letter constructor. 
// This is used to create an object representing the current word the user is attempting to guess. 
// That means the constructor should define:

// An array of new Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. This should call the function on each letter object
//  (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object 
// (the second function defined in Letter.js)

//Word depends on the Letter constructor. So, we need to require Letter so that we can use it in the Word.js file (this file).
var Letter = require("./Letter");

var Word = function(myWord) {
	//Take chosen word from word list.
	this.myWord = myWord;
	//This is an array of letters representing the letters of the random chosen word.
	this.letters = [];
	//This is an array of underscores representing the number of underscores needed for the random chosen word 
	//This is based on the number of letters in the word.
	this.underscores = [];
	//After we get a random word from the word list, I think I need to use the split method to add the letters to the this.letters array.
	this.splitWord = function() {
		this.letters = this.myWord.split("");
		//console.log(this.letters);
		//Determine number of underscores needed based on length of this.letters array in the Word constructor.
		numberUnderscoresNeeded = this.letters.length;
		//console.log("Underscores: " + numberUnderscoresNeeded);
		//Create for loop that pushes the underscores to the this.underscores array in Word constructor.
		// for (var i=0; i < numberUnderscoresNeeded; i++ ) {
		//this.underscores.push("_ ");
		// }
		//console.log(this.underscores);
		//Use the .join method to join each underscore that we pushed to the this.underscores array by a space.
		console.log(this.underscores.join(" "));
	}
	this.generateLetters = function() {
		for (i=0; i < this.letters.length; i++){
			this.letters[i] = new Letter (this.letters[i]);
			//this.letters[i].letterGuessedCorrectly = true;
			//This line of code shows the super array of letter objects for debugging purposes.
			//console.log(this.letters[i]);
			this.letters[i].showCharacter();
		}
	}
}

//test word constructor. Test successful.
// var someWord = new Word ("Burnsville");
// someWord.splitWord();
// someWord.generateLetters();

//Export the Word constructor so that we can use/reference it in index.js.
module.exports = Word;

