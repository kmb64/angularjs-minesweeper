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

//    MINE_COUNT = 10,
//    ROWS = 9,
//    COLS = 9,

//    MINE_COUNT = 40,
//    ROWS = 16,
//    COLS = 16,

    MINE_COUNT = 99,
    ROWS = 16,
    COLS = 30,

    CELL_COUNT = ROWS * COLS;

    //beginner : 9 x 9 (10)
    //intermediate : 16 x 16 (40)
    //expert : 16 x 30 (99)

var TYPES = [CLEAR, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT];