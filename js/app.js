var app = angular.module('kbMinesweeper', []);

var ONE = 'one',
  TWO = 'two',
  THREE = 'three',
  FOUR = 'four',
  FIVE = 'five',
  SIX = 'six',
  SEVEN = 'seven',
  EIGHT = 'eight',
  UNTOUCHED = 'untouched',
  CLEAR = 'clear',
  FLAGGED = 'flagged',
  UNSURE = 'unsure',
  MINE = 'mine',
  DEATH_MINE_CLASS = 'death',

  mineCount,
  rows,
  cols,
  cellCount;

//cellCount = rows * cols;

//    mineCount = 40,
//    rows = 16,
//    cols = 16,

//    mineCount = 99,
//    rows = 16,
//    cols = 30,


//    beginner : 9 x 9 (10)
//    intermediate : 16 x 16 (40)
//    expert : 16 x 30 (99)

var TYPES = [CLEAR, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT];