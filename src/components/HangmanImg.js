import React from "react";
import "./HangmanImg.css";

export default function HangmanImg({ incorrectCount }) {
  // Caps the incorrect count value at 1 and 11 to prevent errors.
  const stateNum = Math.min(incorrectCount + 1, 11);

  return (
    // Displays each state of the hangman images depending on the incorrect guesses.
    <div className="invisible-align-right">
      <img
        className="hangman-image"
        src={`/images/state${stateNum}.GIF`}
        alt={`Hangman state ${stateNum}`}
      />
    </div>
  );
}
