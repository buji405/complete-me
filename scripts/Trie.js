import Node from '../scripts/Node.js';

class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
    this.selectedWords = [];
  }

  insert(word) {
    let wordArray = word.toLowerCase().split('');
    let currentNode = this.root;

    wordArray.forEach((letter) => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })
    currentNode.isWord = true;
    this.wordCount++;
  }

  count() {
    return this.wordCount;
  }

  suggest(string) {

    let stringArray = string.toLowerCase().split('');
    let current = this.root;

    stringArray.forEach((letter) => {
      current = current.children[letter];
    })
    let solutions = this.findWords(current);
    let finalSolution = solutions.map((solution) => {
      return string + solution;
    })

    this.selectedWords.forEach((word) => {
      if (finalSolution.includes(word)) {
        let wordIndex = finalSolution.indexOf(word);
        let preferredWord = finalSolution.splice(wordIndex, 1);

        finalSolution.unshift(...preferredWord);
      }
    })
    return finalSolution
  }

  findWords(node, prefix = [], possibleSolutions = []) {
    if (node.isWord) {
      possibleSolutions.push(prefix.join(''));
    }
    let nodeChildrenKeys = Object.keys(node.children);
    
    nodeChildrenKeys.forEach((letter) => {
      prefix.push(node.children[letter].letter);
      this.findWords(node.children[letter], prefix, possibleSolutions);

      prefix.pop();

    })
    return possibleSolutions;
  }

  populate(array) {
    array.forEach((word) => {
      this.insert(word);
    })
  }

  select(word) {
    this.selectedWords.push(word);
  }
}

export default Trie;
