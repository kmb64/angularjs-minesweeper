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
    MINE_COUNT = 99,
    ROWS = 16,
    COLS = 30,
    CELL_COUNT = ROWS * COLS;

var TYPES = [CLEAR, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT];