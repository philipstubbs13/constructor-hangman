// Word.js: Contains a constructor, Word that depends on the Letter constructor. 
// This is used to create an object representing the current word the user is attempting to guess. 
// That means the constructor should define:

// An array of new Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. This should call the function on each letter object
//  (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object 
// (the second function defined in Letter.js)

//Word depends on the Letter constructor. So, need to require Letter.
var Letter = require("./Letter");

var Word = function(myWord) {
	//Take chosen word from word list.
	this.myWord = myWord;
	//This is an array of letters representing the letters of the underlying word.
	this.letters = [];
	//After we get a random word from the word list, I think I need to use the split method to add the letters to the this.letters array.
	this.splitWord = function() {
		this.letters = this.myWord.split("");
		console.log(this.letters);
	}
}

//test word constructor. Test successful.
// var someWord = new Word ("Burnsville");
// someWord.splitWord();