// Letter.js: 
// Contains a constructor, Letter. 
// This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), 
// depending on whether or not the user has guessed the letter. That means the constructor should define:

// A string value to store the underlying character for the letter
// A boolean value that stores whether that letter has been guessed yet
// A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
// A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly

var Letter = function(character) {
	// A string value to store the underlying character for the letter
	this.character = character.toUpperCase();
	// A boolean value that stores whether that letter has been guessed yet
	this.letterGuessedCorrectly = false;
	// A function that returns the underlying character if the letter has been guessed, 
	//or a placeholder (like an underscore) if the letter has not been guessed
	this.showCharacter = function() {
		if (this.letterGuessedCorrectly) {
			console.log(this.character);
		}
		else {
			//console.log ("_");
		}

	}
}

//Test to make sure Letter.js is working. Test successful.
// var letter1 = new Letter ("a");
// letter1.showCharacter();

//export Letter constructor so that Word.js can use it.
module.exports = Letter