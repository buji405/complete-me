class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.children = {};
    this.isWord = false;
  }
}

export default Node;
