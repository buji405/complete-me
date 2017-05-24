import Node from '../scripts/Node.js';

// console.log(dictionary);

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
    // console.log(this.wordCount);
    return this.wordCount;
 }

 suggest(string) {

   let stringArray = string.toLowerCase().split(''); //string, normalizing, and splitting into array of letters
   let current = this.root; //assigning currentNode to start at root

   stringArray.forEach((letter) => {
     current = current.children[letter];
     console.log(current);
   }) //looping over letters of string array and reassign current to it's child
   //end with the current node as the node for the last letter in the string array

   let solutions = this.findWords(current); // pass currentNode into fn that will return an array of partial word matches
  //  console.log(solutions);
   // map over wordCompletions arr and add the original search term to the begining of each word completion
   let finalSolution = solutions.map((solution) => {
      return string + solution;
   })
   this.selectedWords.forEach((word) => {
     if(finalSolution.includes(word)) {
       let wordIndex = finalSolution.indexOf(word);
       let preferredWord = finalSolution.splice(wordIndex, 1);
       finalSolution.unshift(...preferredWord);
     }
   })
  //  console.log(finalSolution);
   return finalSolution
  }

  findWords(node, prefix = [], possibleSolutions = []) {
    if (node.isWord) {    //if this node is the last node in a word
      possibleSolutions.push(prefix.join(''));   // join the letter(s) in the prefix array and push them into the PS array
    }
    let nodeChildrenKeys = Object.keys(node.children);
    console.log(nodeChildrenKeys);  //  get the key names of this node's children object
    nodeChildrenKeys.forEach((letter) => {
      prefix.push(node.children[letter].letter);  //for each letter node's letter, push it into the prefix array
      this.findWords(node.children[letter], prefix, possibleSolutions);

      prefix.pop();

      console.log('prefix:', prefix);
    })
    console.log('pS:', possibleSolutions);
    return possibleSolutions;
  }
// ca ndy
// ca lifornia
// ciara

// prefix =[]
// findWords(c<node>)

    // prefix =[i]
    // findWords(i<node>)

        // prefix =[i, a]
        // findWords(a<node>)

            // prefix =[i, a, r]
            // findWords(r<node>)

                // prefix =[]

            // prefix = [i, a, r]
        // prefix = [i, a]


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
