import React, { useEffect, useState } from "react";
import InputLetter from "./InputLetter";
import Letter from "./Letter";
import LetterHandler from "./LetterHandler";
import HangmanImg from "./HangmanImg";
import { wordLoader } from "./WordLoader";
import Scoreboard from "./Scoreboard";
import SideScoreboard from "./SideScoreboard";
import HelpBox from "./HelpBox";

// Handles the core game logic of the game.
function GameLogic() {
  // Setting states.
  const [words, setWords] = useState([]);
  const [randomWord, setRandomWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [alreadyGuessedLetters, setAlreadyGuessedLetters] = useState([]);
  const [inputLetter, setInputLetter] = useState("");
  const [gameValues, setGameValues] = useState({
    score: 0,
    incorrectCount: 0,
    message: "WELCOME!",
    shakeMessage: false,
    wordsGuessed: 0,
    wordsSeen: [],
  });
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const MAX_INCORRECT = 10;
  const [correctLetterCount, setCorrectLetterCount] = useState(0);
  const [displayHelp, setDisplayHelp] = useState(false);
  const RESET = 1;
  const WON = 2;
  const LOSE = 3;

  // Loads the words from the text file into the state array.
  useEffect(() => {
    wordLoader().then((wordsArray) => setWords(wordsArray));
  }, []);

  // Picks a random word from the words array.
  function pickRandomWord() {
    if (words.length === 0) return;

    const randomWordIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomWordIndex];
    setRandomWord(randomWord);
  }

  // Calls the function to get a randomWord every time the words value is updated.
  useEffect(() => {
    if (words.length > 0) {
      pickRandomWord();
    }
  }, [words]);

  // Creates the letter objects of the hangman word.
  useEffect(() => {
    if (randomWord) {
      const letterArr = [];
      let letter = randomWord.split("");
      for (let i = 0; i < letter.length; i++) {
        letterArr.push(new Letter(i, letter[i], false, false));
      }
      setLetters(letterArr);
    }
  }, [randomWord]);

  // Toggles the displayHelpBox state values to display  or hide the help box.
  function toggleHelpBox() {
    setDisplayHelp((prev) => !prev);
  }

  // Handles the win, lose and reset sate of the game.
  function handleGameState(state, word) {
    switch (state) {
      // Trigger Game Reset.
      case 1:
        setGameWon(false);
        setGameOver(true);

        // Clear guessed letters array.
        setAlreadyGuessedLetters([]);
        setCorrectLetterCount(0);

        // Reset the game.
        setGameOver(false);
        setGameValues({
          score: 0,
          incorrectCount: 0,
          message: "",
          shakeMessage: false,
          wordsGuessed: 0,
          wordsSeen: [],
        });
        pickRandomWord();
        break;

      // Trigger Game Win.
      case 2:
        setGameValues((prev) => ({
          ...prev,
          incorrectCount: 0,
          wordsGuessed: prev.wordsGuessed + 1,
          message: "VICTORY!",
          wordsSeen: [...prev.wordsSeen, word],
        }));
        setGameWon(true);

        setCorrectLetterCount(0);
        setAlreadyGuessedLetters([]);

        // After some delay to display the win screen, the game is passed on to the next word.
        setTimeout(() => {
          setGameValues((prev) => ({
            ...prev,
            message: "",
          }));

          pickRandomWord();
          setGameWon(true);
        }, 4000);
        break;

      // Trigger Game Over.
      case 3:
        setGameWon(false);
        setGameOver(true);

        // Display the Game Over message.
        setGameValues((prev) => ({
          ...prev,
          message: "GAME OVER!",
          shakeMessage: true,
        }));

        // Clear guessed letters array.
        setAlreadyGuessedLetters([]);
        setCorrectLetterCount(0);

        // After 4 seconds, reset the entire game
        setTimeout(() => {
          setGameOver(false);
          setGameValues({
            score: 0,
            incorrectCount: 0,
            message: "",
            shakeMessage: false,
            wordsGuessed: 0,
            wordsSeen: [],
          });
          pickRandomWord();
        }, 4000);
        break;

      default:
        return;
    }
  }

  // Handles what the game should due depending of the guessed letter.
  const handleGuess = (guessedLetter) => {
    let newIncorrect = gameValues.incorrectCount;
    let newMessage = "";
    let shouldShake = true;
    let newScore = gameValues.score;
    let correctLetterCounter = correctLetterCount;

    if (gameOver) return;

    if (guessedLetter === "") {
      setGameValues((prev) => ({
        ...prev,
        message: "Are you not going to even try?",
        shakeMessage: true,
      }));
      return;
    }

    // Handle guessed letters here...
    if (alreadyGuessedLetters.includes(guessedLetter)) {
      newMessage = "Letter has already been guessed.";
    } else {
      setAlreadyGuessedLetters(alreadyGuessedLetters.concat(guessedLetter));
      console.log(alreadyGuessedLetters);

      let matchingLetters = 0;
      // Checks if the current guessedLetter is one of the randomWord letters and changes the
      // visibility of the letter to visible if the letter is correct.
      if (randomWord.includes(guessedLetter) && guessedLetter != "") {
        const updatedLetters = letters.map((l) => {
          if (l.letter === guessedLetter && !l.isGuessed) {
            // Increment the score and matching letter counter.
            newScore += 50;
            matchingLetters++;

            return l.guessed();
          }
          return l;
        });
        correctLetterCounter += matchingLetters;

        // Triggers win if all letters have been guessed correctly by comparing the
        // word length and matching letter counter value..
        if (correctLetterCounter === letters.length) {
          handleGameState(WON, randomWord);
          return;
        }

        // Change state values accordingly.
        setCorrectLetterCount(correctLetterCounter);
        setLetters(updatedLetters);
        newMessage = "Green Alert! Correct Guess!";
        shouldShake = false;
        console.log("Total letters correct:", correctLetterCount);
      } else {
        // If GuessedLetter is incorrect increase the correct counter.
        newIncorrect += 1;

        // Trigger Game Over if incorrect guesses have reached the max value.
        if (newIncorrect >= MAX_INCORRECT) {
          handleGameState(LOSE);
          return;
        }

        // Update message dynamically each time the incorrect counter reaches certain values.
        if (newIncorrect > 2 && newIncorrect < 5) {
          newMessage =
            "Red Alert! What a shame, your score definitely shows off your knowledge.";
        } else if (newIncorrect === 2) {
          newMessage = "Red Alert! Tskk, another incorrect guess.";
        } else {
          newMessage = "Red Alert! Ahh, a shame that is an incorrect guess.";
        }
      }
    }

    // Change state values accordingly.
    setGameValues((prev) => ({
      ...prev,
      score: newScore,
      incorrectCount: newIncorrect,
      message: newMessage,
      shakeMessage: shouldShake,
    }));

    // Set shakeMessage values to true or false according to shouldShake value.
    // This is done to trigger the shake of the message display animation for half a second.
    if (shouldShake) {
      setTimeout(() => {
        setGameValues((prev) => ({
          ...prev,
          shakeMessage: false,
        }));
      }, 500);
    }
  };

  // Displays all game components.
  return (
    <div>
      <div>
        <Scoreboard
          score={gameValues.score}
          message={gameValues.message}
          incorrectCount={gameValues.incorrectCount}
          triggerShake={gameValues.shakeMessage}
          incorrectGuesses={alreadyGuessedLetters}
          randomWord={randomWord}
        />
        <div className="button-container">
          <button className="help-button" onClick={toggleHelpBox}>
            Help
          </button>
          <button onClick={() => handleGameState(RESET)}>RESET</button>
        </div>
        <SideScoreboard
          stats={{
            score: gameValues.score,
            incorrectCount: gameValues.incorrectCount,
            wordsGuessed: gameValues.wordsGuessed,
            wordsSeen: gameValues.wordsSeen || [],
          }}
        />
        <HelpBox toggleHelpBox={displayHelp} />
        <HangmanImg incorrectCount={gameValues.incorrectCount} />
        <LetterHandler letters={letters} />
        <InputLetter
          input={inputLetter}
          setInput={setInputLetter}
          onGuess={handleGuess}
        />
      </div>
    </div>
  );
}

export default GameLogic;