export default class Letter {
  // Constructor to handle Letter states.
  constructor(id, letter, isGuessed = false, isRevealed = false) {
    this.id = id;
    this.letter = letter;
    this.isGuessed = isGuessed;
    this.isRevealed = isRevealed;
  }

  // Returns a letter with an isGuessed state to true when called.
  guessed() {
    return new Letter(this.id, this.letter, true, this.isRevealed);
  }

  // Returns a letter with an isRevealed state to true when called.
  reveal() {
    return new Letter(this.id, this.letter, this.isGuessed, true);
  }
}
