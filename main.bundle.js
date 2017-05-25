/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function Node() {
  var letter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  _classCallCheck(this, Node);

  this.letter = letter;
  this.children = {};
  this.isWord = false;
};

exports.default = Node;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Node = __webpack_require__(0);

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trie = function () {
  function Trie() {
    _classCallCheck(this, Trie);

    this.root = new _Node2.default();
    this.wordCount = 0;
    this.selectedWords = [];
  }

  _createClass(Trie, [{
    key: 'insert',
    value: function insert(word) {
      var wordArray = word.toLowerCase().split('');
      var currentNode = this.root;

      wordArray.forEach(function (letter) {
        if (!currentNode.children[letter]) {
          currentNode.children[letter] = new _Node2.default(letter);
        }
        currentNode = currentNode.children[letter];
      });
      currentNode.isWord = true;
      this.wordCount++;
    }
  }, {
    key: 'count',
    value: function count() {
      return this.wordCount;
    }
  }, {
    key: 'suggest',
    value: function suggest(string) {

      var stringArray = string.toLowerCase().split('');
      var current = this.root;

      stringArray.forEach(function (letter) {
        current = current.children[letter];
      });
      var solutions = this.findWords(current);
      var finalSolution = solutions.map(function (solution) {
        return string + solution;
      });

      this.selectedWords.forEach(function (word) {
        if (finalSolution.includes(word)) {
          var wordIndex = finalSolution.indexOf(word);
          var preferredWord = finalSolution.splice(wordIndex, 1);

          finalSolution.unshift.apply(finalSolution, _toConsumableArray(preferredWord));
        }
      });
      return finalSolution;
    }
  }, {
    key: 'findWords',
    value: function findWords(node) {
      var _this = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var possibleSolutions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      if (node.isWord) {
        possibleSolutions.push(prefix.join(''));
      }
      var nodeChildrenKeys = Object.keys(node.children);

      nodeChildrenKeys.forEach(function (letter) {
        prefix.push(node.children[letter].letter);
        _this.findWords(node.children[letter], prefix, possibleSolutions);

        prefix.pop();
      });
      return possibleSolutions;
    }
  }, {
    key: 'populate',
    value: function populate(array) {
      var _this2 = this;

      array.forEach(function (word) {
        _this2.insert(word);
      });
    }
  }, {
    key: 'select',
    value: function select(word) {
      this.selectedWords.push(word);
    }
  }]);

  return Trie;
}();

exports.default = Trie;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Node = exports.Trie = undefined;

var _Trie = __webpack_require__(1);

var _Trie2 = _interopRequireDefault(_Trie);

var _Node = __webpack_require__(0);

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Trie = _Trie2.default;
exports.Node = _Node2.default;

/***/ })
/******/ ]);