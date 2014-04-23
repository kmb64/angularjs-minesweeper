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
    DEATH_MINE_CLASS = 'death';

var TYPES = [CLEAR, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT];