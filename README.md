# constructor-hangman

## Table of contents
  * [About this project](#about-this-project)
  * [Getting started](#contribute)
    * [Clone the repository](#clone-repository)
    * [Install Node.js](#install-node)
    * [Install the dependencies](#dependencies)
    * [Create a .env file](#env-variables)
    * [Obtain API keys](#obtain-keys)
  * [Running LIRI from the command line](#command-reference)
  	* [Command line syntax](#command-syntax)
  	* [Available commands](#available-commands)
    * [Command line arguments](#arguments)
    * [Displaying my tweets](#tweets)
  * [Command line help](#command-line-help)
  * [Examples](#examples)
  	* [Display last 20 tweets](#tweets)
  	* [Display movie information for specified movie (when movie name is 1 word)](#movie-specified)
    * [Display movie information for specified movie (when movie name is 2 words or longer)](#movie-specified-two)
  	* [Display movie information for Mr. Nobody when no movie is specified](#movie-not-specified)
  	* [Display top 10 songs on Spotify for the specified song name](#spotify-this-song)
  	* [Display top 10 songs on Spotify for the song, I want it that way](#do-what-it-says)
  	* [Display song information for The Sign by Ace of Base when no song is specified](#song-not-specified)
  * [Technologies used to create app](#technologies-used)
  * [Future code development](#feature-enhancements)
  * [Issues](#issues)

## <a name="about-this-project"></a> About this project
<p>This project is a command line version of the classic Hangman game. I created this game using Javascript constructor functions.</p>

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
<p>After you clone the repository, navigate to the project root directory (constructor-hangmant). The project directory structure is set up as follows:</p>
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
<p>The following npm packages are dependencies to the project. You must install these packages in the project root directory (liri-node-app) to be able to run LIRI from the command line.</p>
<p>After you clone the repository to a local directory, change directory to the project root directory (liri-node-app) and run the following command to install the required npm packages:</p>
<pre>npm install</pre>
<ul>
	<li>Twitter npm package (https://www.npmjs.com/package/twitter) - used to send requests to Twitter API and receive tweets.</li>
	<li>Spotify npm package (https://www.npmjs.com/package/node-spotify-api) - used to send requests to Spotify API and receive song information.</li>
	<li>Request npm package (https://www.npmjs.com/package/request) - used to send requests to OMDB API and receive movie information.</li>
	<li>DotEnv npm package (https://www.npmjs.com/package/dotenv) - used to load environment variables from a .env file into process.env.</li>
	<li>Columnify npm package (https://www.npmjs.com/package/columnify) - used to display terminal output in columns.</li>
  <li>Figlet npm package (https://www.npmjs.com/package/figlet) - used to convert text into ASCII art - drawings made out of text characters.</li>
</ul>
<p>Version information for each of these packages is available in the package.json file in the project root directory.</p>

### <a name="env-variables"></a> Create a .env file
<p>To run LIRI on your computer, you need to provide your own .env file for it to work.</p>
<p>Create a file named .env in the project root directory (liri-node-app) with the following contents.</p>
<p>You will replace the placeholder values with the API keys you obtain in the next step.</p>
<pre>
#Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

#Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
</pre>

<p>This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to GitHub — keeping the API key information private.</p>

### <a name="obtain-keys"></a> Obtain API keys
<p>To retrieve data from the APIs, you need to obtain API keys for Twitter and Spotify.</p>

#### <a name="twitter-api"></a> Obtain Twitter API keys
<p>To obtain the Twitter API keys:</p>
<ol>
  <li>Go to https://apps.twitter.com/app/new.</li>
  <li>In the <b>Application Details</b> form, enter a name and description for the application to be used with the Twitter API.</li>
  <li>For <b>Website</b>, enter <input>http://google.com</input>.</li>
  <li>Leave the <b>Callback URL</b> field blank.</li>
  <li>In the <b>Developer Agreement</b> section, select the check box indicating that you agree to the Twitter Developer Agreement.</li>
  <li>Click <b>Create your Twitter application</b>.</li>
  <li>To get your consumer key and secret, click the <b>Keys and Access Tokens</b> tab.</li>
  <li>Copy and paste the <b>Consumer Key (API Key)</b> and <b>Consumer Secret (API Secret)</b> values into your .env file, replacing the your-twitter-consumer-key and your-twitter-consumer-secret placeholders, respectively.</li>
  <li>At the bottom of the page, click <b>Create my access token</b> to get your access token key and secret.</li>
  <li>Copy the <b>Access Token</b> and <b>Access Token Secret</b> displayed at the bottom of the next screen. Paste them into your .env file, replacing the placeholders for your-twitter-access-token-key and your-twitter-access-token-secret, respectively.</li>
</ol>

#### <a name="spotify-api"></a> Obtain Spotify API keys
<p>To obtain the Spotify API keys:</p>
<ol>
  <li>Go to https://developer.spotify.com/my-applications/#!/</li>
  <li>Either log in to your existing Spotify account or create a new one and log in.</li>
  <li>After you are logged in, click <b>CREATE AN APP</b> to register a new application to be used with the Spotify API. You can fill in whatever you like for these fields. When finished, click <b>Complete</b>.</li>
  <li>Copy the <b>Client ID</b> and <b>Client Secret</b> values down somewhere as you'll need them to use the Spotify API and the node-spotify-api package.</li>
  <li>Paste the <b>Client ID</b> and <b>Client Secret</b> values into your .env file, replacing the placeholders for your-spotify-id and your-spotify-secret, respectively.</li>

## <a name="command-reference"></a> Running LIRI from the command line
<p>In LIRI, there are five commands that you can run. These commands allow you to receive access to a list of tweets from Twitter, song information from Spotify, and movie information from OMDB. Review the command syntax and various arguments you can use for the command you want to run.</p>


## <a name="examples"></a> Examples


## <a name="technologies-used"></a> Technologies used to build app

  * Node.js (https://nodejs.org/en/)
  * Javascript

## <a name="feature-enhancements"></a> Future code development
<p>Source code will be developed over time to handle new features in the future.</p>
<p>The following is a list of potential feature enhancements:</p>

## <a name ="Issues"></a> Issues
<p>If you find an issue while using the app or have a request, <a href="https://github.com/philipstubbs13/liri-node-app/issues/" target="_blank">log the issue or request here</a>. These issues will be addressed in a future code update.</p>

<p>Known issues</p>
<ul>
  <li>The Rotten Tomatoes rating is not available for every movie. For future code update, tell the user that the "Rating is not available" for Rotten Tomatoes rating.</li>
</ul>

