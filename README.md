# complete-me
This is an auto complete project using a prefix trie. I imported the dictionary and the current element begins at the root and then is reassigned to each child node until it reaches the bottom of the chain. 
Throughout each iteration it's checking to see if it's a word and once it's a full word, it pushes that into the possible solutions array. Later on it concatinates the suggestions to the letters that were input into the field to give you full word suggestions. 
There is a counter of total words as well as a select function so that if you select a word like pizza, then pizza will display first in the line of suggestions. If the next time you submit pizzeria then pizzeria will come before pizza. 

