export default function LetterHandler({ letters }) {
  // Data validation for letters.
  if (!letters || letters.length === 0) return;

  // Displays the letters with a hidden or revealed style depending of 
  // each letter isGuessed or isRevealed state.
  return (
    <ul className="hangman-word">
      {letters.map((l) => {
        let className = "hangman-letter hidden";
        let displayLetter = "";

        if (l.isRevealed || l.isGuessed) {
          className = "hangman-letter revealed";
          displayLetter = l.letter.toUpperCase();
        }

        return (
          <li key={l.id} className={className}>
            {displayLetter}
          </li>
        );
      })}
    </ul>
  );
}
