import "./Scoreboard.css";

export default function HelpBox({ toggleHelpBox }) {
    let helpBoxClass = "side-scoreboard right";

    // Hides the help box screen when toggleHelpBox is false.
    if(!toggleHelpBox){
        helpBoxClass += " hidden-element";
    }

    // Displays the help box containing the game instructions and rules.
  return (
    <div className={helpBoxClass}>
      <div className="scoreboard">
        <h2>Rules of the game:</h2>
        <ol>
          <li>You only have 10 guesses per word.</li>
          <li>Once you used up all your guesses, score and words guessed progress will be reset.</li>
          <li>Once all the letters have been guessed correctly, a new word appears.</li>
          <li>
            Score is increased by 50 each time a letter is guessed correctly.
          </li>
          <li>You can restart anytime by clicking the restart button or by refreshing the page.</li>
        </ol>
      </div>
    </div>
  );
}
