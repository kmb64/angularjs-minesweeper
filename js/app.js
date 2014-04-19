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

    app.service('gameBoardService', function(){

        var addMines = function(cellArray, numOfMines){
            for(var i = 0; i < numOfMines; i+=1) {

                var max = cellArray.length;
                var min = 1;
                var index = Math.floor(Math.random()*(max-min+1)+min);
                cellArray[index].type = MINE;
            }
        };

        var cells = [
            { type : 'one',
                state : 'untouched'},
            { type : 'two'},
            { type : 'three'},
            { type : 'four'},
            { type : 'five'},
            { type : 'six'},
            { type : 'seven'},
            { type : 'eight'},
            { type : ''},

            { type : ''},
            { type : ''},
            { type : 'clear'},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''}
        ];

        return {
            generate : function(){

                addMines(cells, 10);

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


