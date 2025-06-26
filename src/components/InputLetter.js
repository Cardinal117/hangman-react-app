import React, { useRef, useEffect } from "react";

export default function InputLetter({ input, setInput, onGuess }) {

  const inputRef = useRef(null);

  // Sets the input dialog to focus.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  // Sends the guessed letter to handleGuess in GameLogic when the Guess button has been clicked.
  const handleClick = () => {
    if (!input) return;
    onGuess(input.toLowerCase());
    setInput("");

    // Reset the input box to focus after button press.
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Displays the input box and guess button for the Hangman game.
  return (
    <div className="input-button-row">
      <input
        type="text"
        maxLength={1}
        value={input}
        onChange={(e) => setInput(e.target.value.toLowerCase())}
        autoFocus
        ref={inputRef}
      />
      <button onClick={handleClick}>Guess</button>
    </div>
  );
}
