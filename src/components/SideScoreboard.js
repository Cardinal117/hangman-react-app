import React, { useEffect, useState } from "react";
import "./Scoreboard.css";

// Handles css style handling  depending on the current game stats/scores of the player.
export default function SideScoreboard({ stats }) {
  const { score, incorrectCount, wordsGuessed, wordsSeen } = stats;
  const [animateScore, setAnimateScore] = useState(false);

  // Triggers the animation fo score whenever it is increased.
  useEffect(() => {
    if (score > 0) {
      setAnimateScore(true);
      // Sets the style back to normal after 500ms.
      const timeout = setTimeout(() => setAnimateScore(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [score]);

  // Changes the colour of the incorrect count depending of the value by assigning certain css styles.
  let incorrectClass = "incorrect";
  if (incorrectCount >= 7) incorrectClass += " danger";
  else if (incorrectCount >= 4) incorrectClass += " warning";
  else incorrectClass += " safe";

  // Animates the score whenever it is increased.
  let scoreClass = "score";
  if (animateScore) {
    scoreClass += " score-animate";
  }

  // Displays the mains scores of the hangman game.
  return (
    <div className={`side-scoreboard left`}>
      <div className="scoreboard">
        <div className={scoreClass}>SCORE: {score}</div>
        <div className={incorrectClass}>Incorrect: {incorrectCount}/10</div>
        <div className="guesses">Words Guessed: {wordsGuessed}</div>
        <ul className="words-list">
          {wordsSeen.map((word, index) => {
            return (
              <li className="word" key={index}>
                {word}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
