import { expect } from 'chai';
import Node from '../scripts/Node.js';
import Trie from '../scripts/Trie.js';
import fs from 'fs';

const text = "/usr/share/dict/words";
let dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie', () => {
  let newTrie;
  let newNode;

  beforeEach(() => {
    newTrie = new Trie();
    newNode = new Node();
  })

  it('should instantiate a new Trie', () => {
    expect(newTrie).to.be.instanceOf(Trie);
  })

  it('should have a root that is a new node by default', () => {
    expect(newTrie.root).to.be.instanceOf(Node);
  })

  it('should insert new word into trie root', () => {
    newTrie.insert('Ear');
    expect(newTrie.root.children.
            e.children.
            a.children.
            r.isWord).to.equal(true);
  })

  it('should be able to count each completed word in trie', () => {
    newTrie.insert('beach');
    newTrie.insert('trot');
    newTrie.insert('blanket');
    newTrie.insert('soft');
    expect(newTrie.count()).to.equal(4);
  })

  it('should be able to suggest words', () => {
    newTrie.insert('ciara');
    newTrie.insert('candy');
    newTrie.insert('blanket');
    newTrie.insert('black');

    expect(newTrie.suggest('ca')).to.deep.equal(['candy']);
    // expect(newTrie.suggest('c')).to.deep.equal(['ciara', 'candy']);
    // expect(newTrie.suggest('bla')).to.deep.equal(['blanket', 'black']);
    // expect(newTrie.suggest('blan')).to.deep.equal(['blanket']);
  })

  it('should populate all words from dictionary', () => {
    newTrie.populate(dictionary);

    expect(newTrie.count()).to.equal(235886);
  })

  it('should be able to suggest all words in dictionary similar to word passed in', () => {
    newTrie.populate(dictionary);

    expect(newTrie.suggest('piz')).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
  })

  it('should take the selected string and move it to the front of suggestions', () => {
    newTrie.populate(dictionary);
    newTrie.select('pizza');
    newTrie.select('pizzeria');
    newTrie.select('pizzle');

    expect(newTrie.suggest('piz')).to.deep.equal(["pizzle", "pizzeria", "pizza", "pize", "pizzicato"]);
  })
})
