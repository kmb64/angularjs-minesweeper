var kbMinesweeper = (function(angular) {

    var app = angular.module('kbMinesweeper', []);

    var ONE = 'one',
        TWO = 'two',
        THREE = 'three',
        FOUR = 'four',
        FIVE = 'five',
        SIX = 'six',
        SEVEN = 'seven',
        EIGHT = 'eight',
        UNTOUCEHD = 'untouched',
        CLEAR = 'clear',
        FLAGGED = 'flagged',
        UNSURE = 'unsure',
        MINE = 'mine',
        DEATH_MINE_CLASS = 'death-mine',
        X_MINE_CLASS = 'x-mine';

    var TYPES = [CLEAR, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT];

    app.service('gameBoardService', function(){

        var createCells = function(){

            var cells = [];

            for(var i = 0; i < 81; i+=1) {
                cells.push(
                    {
                        type : '',
                        state : ''
                    }
                );
            }
            return cells;
        };

        var addMines = function(cellArray, numOfMines){
            for(var i = 0; i < numOfMines; i+=1) {

                var max = cellArray.length;
                var min = 1;
                var index = Math.floor(Math.random()*(max-min+1)+min);
                cellArray[index].type = MINE;
            }
        };

        var theresAMine = function(cell) {
          return cell.type === MINE;
        };

        var minesBesideMe = function(index, cellsArray) {
            var count = 0;
            //Check above
            if(index > 8) {
                if(theresAMine(cellsArray[index - 9])) {
                    count +=1;
                }
            }
            //Check right
            if(index % 9 !== 8) {
                if(theresAMine(cellsArray[index + 1])) {
                    count += 1;
                }
            }
            //Check below
            if(index < 71) {
                if(theresAMine(cellsArray[index + 9])) {
                    count += 1;
                }
            }
            //Check left
            if(index % 9 !== 0) {
                if(theresAMine(cellsArray[index - 1])) {
                    count += 1;
                }
            }
            return count;
        };


        var addNumbers = function(cells) {
            var i = 0;
            angular.forEach(cells, function(cell){
                //If this cell isn't a mine, check how many are near it.
                if(cell.type !== MINE) {
                    cell.type = TYPES[minesBesideMe(i, cells)];
                }
                i+=1;
            });
        };

        return {
            generate : function(){

                var cells = createCells();
                addMines(cells, 10);
                addNumbers(cells);

                return {
                    cells : cells
                }
            }
        };
    });

    app.controller('appController', function($scope, gameBoardService){
        $scope.gameBoard = {};
        $scope.gameBoard.cells = gameBoardService.generate().cells;

        $scope.$watch('gameBoard.cells', function(newCells) {
                angular.forEach(newCells, function(cell){
                    if(cell.state === 'mine') {
                        console.log('Game over');
                    }
                });
            },
            true);
    });

    app.directive('cell', function(){

        function link(scope, element, attrs) {

            element.bind('click', function(){
                if(scope.cell.state !== FLAGGED) {
                    scope.cell.state = scope.cell.type;
                }
                scope.$apply();
            });

            element.bind('contextmenu', function(e){

                if(scope.cell.state === FLAGGED) {
                    scope.cell.state = UNSURE;
                }
                else if(scope.cell.state === UNSURE) {
                    scope.cell.state = UNTOUCEHD;
                }
                else {
                    scope.cell.state = FLAGGED;
                }
                //Prevent default browser right click context menu.
                e.preventDefault();
                //Apply up to parent scope.
                scope.$apply();
            });
        }

        return {
            template : '<div class="cell"></div>',
            restrict : 'E',
            link : link,
            replace : true,
            scope : false
        };
    });
}(angular));


