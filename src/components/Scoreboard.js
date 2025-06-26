import React from "react";
import "./Scoreboard.css";

// Handles style handling depending of state values for each game Value.
export default function Scoreboard({
  message,
  incorrectGuesses,
  triggerShake,
  randomWord
}) {
  let scoreMessageClass = "score-message";
  let scoreBoardClass = "scoreboard";
  let guessesClass = "";
  let revealWord = "";
  let revealWordClass = "";

  if (triggerShake) {
    scoreMessageClass += " shake";
  }

  // Depending on message content adds a certain css class to the message element.
  if (message.includes("Red Alert!")) {
    scoreMessageClass += " red-alert";
  } else if (message.includes("Green Alert!")) {
    scoreMessageClass += " green-alert";
  }
  if (message.includes("GAME OVER!")) {
    guessesClass = "hidden-element";
    scoreBoardClass += " game-over";
    scoreMessageClass += "shake game-over-text";
    revealWord += "The word was " + randomWord;
    revealWordClass = "game-over-subtext";
  }

  if (message.includes("VICTORY!")) {
    guessesClass = "hidden-element";
    scoreBoardClass += " game-won";
    scoreMessageClass += "shake game-won-text";
    revealWord += "Yes! the word was " + randomWord;
    revealWordClass = "victory-subtext";
  }

  // Displays the top scoreBoard containing currentGuesses and the game messages.
  return (
    <div className={scoreBoardClass}>
      <h1 className="heading">HANGMAN</h1>
      <span className={revealWordClass}>{revealWord}</span>
      <div className={scoreMessageClass}>{message}</div>
      <div className={guessesClass}>
        <span className="guesses-title">Current Guesses: </span>
        <span className="guesses">{incorrectGuesses}</span>
      </div>
    </div>
  );
}
