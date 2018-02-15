# Javascript Constructor Hangman Game

## Table of contents
  * [Demo](#demo)
  * [About this project](#about-this-project)
  * [Getting started](#contribute)
    * [Clone the repository](#clone-repository)
    * [Install Node.js](#install-node)
    * [Install the dependencies](#dependencies)
  * [Starting the game](#start-game)
  * [Playing the game](#play-game)
  * [Technologies used to create app](#technologies-used)
  * [Future code development](#feature-enhancements)
  * [Issues](#issues)

## <a name="demo"></a> Demo
Video demo: https://www.youtube.com/watch?v=3F9VjnIJ6jI&feature=youtu.be

## <a name="about-this-project"></a> About this project
This project is a command line version of the classic Hangman game. This game uses similar logic to the [browser-based Hangman game](https://github.com/philipstubbs13/Hangman-Game) I created, but with this game, I created the command line version using Javascript constructor functions, where each letter in the word that the user is trying to guess is its own object. For more information on how this project was constructed and put together, see [Structure of the project](#structure-of-project).

## <a name="contribute"></a> Getting started
To play the game from your computer and/or contribute to this project, perform the following steps:
  1. [Clone the repository](#clone-repository)
  2. [Install Node.js](#install-node)
  3. [Install the dependencies](#dependencies)

### <a name="clone-repository"></a> Clone the repository
The first step is to clone the project repository to a local directory on your computer. To clone the repository, run the following commands:
<pre>
  git clone https://github.com/philipstubbs13/constructor-hangman.git
  cd constructor-hangman
</pre>

### <a name="install-node"></a> Install Node.js
<p>If you don't already have Node.js installed on your computer, you can install the latest version here: https://nodejs.org/en/.</p>

#### <a name="structure-of-project"></a> Structure of the project
<p>After you clone the repository, navigate to the project root directory (constructor-hangman). The project directory structure is set up as follows:</p>
<ul>
  <li> 
  	<p><b>Letter.js</b>: Contains a constructor, Letter. This constructor displays an underlying character or a blank placeholder             (underscore), depending on whether or not the user has guessed the letter. This constructor includes:</p>
  	<ul>
  		<li>A string value to store the underlying character for the letter.</li>
  		<li>A boolean value that stores whether that letter has been guessed yet by the user.</li>
  		<li>A function that returns the underlying character if the letter has been guessed, or a placeholder (underscore) if the letter has not been guessed.</li>
  		<li>A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly</li>
  	</ul>
  </li>
  <li>
  	<p><b>Word.js</b>: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. The constructor includes:</p>
  	<ul>
  		<li>An array of new Letter objects representing the letters of the underlying word.</li>
  		<li>A function that returns a string representing the word. This calls the function on each letter object (defined in Letter.js) that displays the character or an underscore and concatenates those together.</li>
  		<li>A function that takes a character as an argument and calls the guess function on each letter object (defined in Letter.js).</li>
  	</ul>
  </li>
  <li>
  	<p><b>index.js</b>: The file containing the logic for the course of the game, which depends on Word.js and:</p>
  	<ul>
  		<li>Randomly selects a word and uses the Word constructor to store it.</li>
  		<li>Prompts the user for each guess and keeps track of the user's remaining guesses.</li>
  	</ul>
  </li>
  <li><b>package.json</b>: Lists the project dependencies (third party npm packages) and their version numbers.</li>
  <li><b>.gitignore</b>: Any file or directory listed inside this file will not be tracked by GitHub when code is committed.</li>
  <li><b>package-lock.json</b>: Dependency tree for the project. Lists all the dependencies and their versions.</li>
</ul>

### <a name="dependencies"></a> Install the dependencies
<p>The following npm packages are dependencies to the project. You must install these packages in the project root directory (constructor-hangman) to be able to play Hangman from the command line.</p>
<p>After you clone the repository to a local directory, change directory to the project root directory (constructor-hangman) and run the following command to install the required npm packages:</p>
<pre>npm install</pre>
<ul>
	<li>inquirer npm package (https://www.npmjs.com/package/twitter) - used to prompt users for a letter throughout the game.</li>
	<li>cli-color npm package (https://www.npmjs.com/package/cli-color) - used to add color to the game.</li>
  	<li>figlet npm package (https://www.npmjs.com/package/figlet) - used to convert text into ASCII art - drawings made out of text characters.</li>
  	<li>is-letter npm package (https://www.npmjs.com/package/is-letter) - used for form valiation. This package is used to check if the value the user enters is a letter (for example, "a") or not a letter (for example, "aba").</li>
  	<li>boxen npm package (https://www.npmjs.com/package/boxen) - used to create boxes in terminal.</li>
</ul>
<p>Version information for each of these packages is available in the package.json file in the project root directory.</p>


## <a name="start-game"></a> Starting the game
<p>To start the game, run the following command from the project root directory (constructor-hangman):</p>
<pre>node index.js</pre>
<p>When you run this command, you will see the following screen:</p>
<pre>
$ node index.js
  _   _                                            ____
 | | | | __ _ _ __   __ _ _ __ ___   __ _ _ __    / ___| __ _ _ __ ___   ___
 | |_| |/ _` | '_ \ / _` | '_ ` _ \ / _` | '_ \  | |  _ / _` | '_ ` _ \ / _ \
 |  _  | (_| | | | | (_| | | | | | | (_| | | | | | |_| | (_| | | | | | |  __/
 |_| |_|\__,_|_| |_|\__, |_| |_| |_|\__,_|_| |_|  \____|\__,_|_| |_| |_|\___|
                    |___/
Welcome to the Hangman Game!
Theme is... Minnesota cities.
==========================================================================================================
How to play
==========================================================================================================
When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter.
Keep guessing letters. When you guess a letter, your choice is either correct or incorrect.
If incorrect, the letter you guessed does not appear in the word.
For every incorrect guess, the number of guesses remaining decrease by 1.
If correct, the letter you guessed appears in the word.
If you correctly guess all the letters in the word before the number of guesses remaining reaches 0, you win.
If you run out of guesses before the entire word is revealed, you lose. Game over.
===========================================================================================================
You can exit the game at any time by pressing Ctrl + C on your keyboard.
===========================================================================================================

</pre>
<p>At the prompt, enter your name and press <b>Enter</b>.</p>
<pre>? What is your name?</pre>
<p>When prompted, enter <b>Y</b> to begin playing.</p>
<pre>Are you ready to play? (Y/n)</pre>

## <a name="play-game"></a> Playing the game
<p>When the game starts, you will be given a word and the number of letters in that word.</p>
<p>When prompted, try to guess a letter that is in the word.</p>
<pre>Great! Welcome, Phil. Let's begin...
Your word contains 7 letters.
WORD TO GUESS:


</pre>
<p>You start the game with 10 guesses. If your guess is incorrect, the number of guesses remaining decreases by 1.</p>
<pre>
You guessed: Z
┌─────────────────────────────────┐
│                                 │
│   Letters already guessed:  Z   │
│                                 │
└─────────────────────────────────┘
WORD TO GUESS:
 A  A
INCORRECT!
You have 9 guesses left.
=====================================================================
</pre>
<p>If your guess is correct, the letter is added to the word.</p>
<pre>
=====================================================================
? Guess a letter: a
You guessed: A
┌───────────────────────────────────┐
│                                   │
│   Letters already guessed:  Z A   │
│                                   │
└───────────────────────────────────┘
WORD TO GUESS:
 A   A
CORRECT!
=====================================================================
</pre>
<p>If you guess all the letters in the word before the number of guesses reaches 0, you win.</p>
<pre>
WORD TO GUESS:
M A N K A T O
CORRECT!
=====================================================================
=====================================================================
YOU WON! YOU'RE A TRUE MINNESOTAN!
Wins: 1
Losses: 0
=====================================================================
</pre>

## <a name="technologies-used"></a> Technologies used to build app

  * Node.js (https://nodejs.org/en/)
  * Javascript constructor functions

## <a name="feature-enhancements"></a> Future code development
<p>Source code will be developed over time to handle new features.</p>
<p>The following is a list of potential feature enhancements:</p>
<ul>
  <li>Create a mySQL database and create a sign up and login system that prompts users for a username and password upon loading up the app.</li>
  <li>When the user guesses a city correctly, add a fun fact about that city.</li>
  <li>Expand the game to include different categories in addition to cities. For example, Minnesota landmarks, Minnesota athletes, etc.</li>
  <li>When random word is chosen at the beginning of the game, display a hint to help the user.</li>
</ul>

## <a name ="Issues"></a> Issues
<p>If you find an issue while using the app or have a request, <a href="https://github.com/philipstubbs13/constructor-hangman/issues/" target="_blank">log the issue or request here</a>. These issues will be addressed in a future code update.</p>

