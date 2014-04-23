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
    MINE_COUNT = 10,
    ROWS = 9,
    COLS = 9,
    CELL_COUNT = ROWS * COLS;

var TYPES = [CLEAR, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT];