# constructor-hangman

## Table of contents
  * [About this project](#about-this-project)
  * [Getting started](#contribute)
    * [Clone the repository](#clone-repository)
    * [Install Node.js](#install-node)
    * [Install the dependencies](#dependencies)
  * [Starting the game](#start-game)
  * [Examples](#examples)
  * [Technologies used to create app](#technologies-used)
  * [Future code development](#feature-enhancements)
  * [Issues](#issues)

## <a name="about-this-project"></a> About this project
<p>This project is a command line version of the classic Hangman game. This game was created using Javascript constructor functions.</p>

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
  		<li>A function that returns a string representing the word. This calls the function on each letter object (defined in Letter.js) that displays the character or an underscore and concatenate those together.</li>
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
	<li>Inquirer npm package (https://www.npmjs.com/package/twitter) - used to prompt users for a letter throughout the game.</li>
	<li>cli-color npm package (https://www.npmjs.com/package/cli-color) - used to add color to the game.</li>
  	<li>Figlet npm package (https://www.npmjs.com/package/figlet) - used to convert text into ASCII art - drawings made out of text characters.</li>
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
Welcome to the Hangman Game (Minnesota Edition)!
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

? Are you ready to play? (Y/n)

</pre>
<p>At the prompt, press <b>Y</b> to begin.</p>


## <a name="examples"></a> Examples


## <a name="technologies-used"></a> Technologies used to build app

  * Node.js (https://nodejs.org/en/)
  * Javascript constructor functions

## <a name="feature-enhancements"></a> Future code development
<p>Source code will be developed over time to handle new features in the future.</p>
<p>The following is a list of potential feature enhancements:</p>

## <a name ="Issues"></a> Issues
<p>If you find an issue while using the app or have a request, <a href="https://github.com/philipstubbs13/constructor-hangman/issues/" target="_blank">log the issue or request here</a>. These issues will be addressed in a future code update.</p>

<p>Known issues</p>
<ul>
</ul>

