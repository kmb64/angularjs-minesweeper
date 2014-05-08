var app = angular.module('kbMinesweeper', ['ngCookies']);

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

//  mineCount,
//  rows,
//  cols,
//  cellCount,

  TYPES = [CLEAR, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT],

  Levels = {
    BEGINNER : 'beginner',
    INTERMEDIATE : 'intermediate',
    EXPERT : 'expert'
  };

  app.GameBoard = {

    mineCount : 0,
    rows : 0,
    cols : 0,
    cellCount : 0,

    setUp: function(mineCount, rows, cols){
      this.mineCount = mineCount;
      this.rows = rows;
      this.cols = cols;
      this.cellCount = cols * rows;
    }
  };

