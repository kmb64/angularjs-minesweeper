var mswApp = angular.module('mswApp', []);

mswApp.controller('appController', function($scope){
    $scope.gameBoard = {
        cells : [
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

            { type : 'mine'},
            { type : 'flagged'},
            { type : 'clear'},
            { type : 'flagged unsure'},
            { type : ''},
            { type : 'mine death'},
            { type : ''},
            { type : ''},
            { type : ''},

            { type : 'bomb'},
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
        ],
        state : 'alive'
    };

    $scope.$watch('gameBoard.cells', function(newCells) {
        angular.forEach(newCells, function(cell){
            if(cell.state === 'mine') {
                console.log('Game over');
            }
        });
    },
    true);
});

mswApp.directive('cell', function(){

    function link(scope, element, attrs) {

        element.bind('click', function(){
            if(scope.cell.state !== 'flagged') {
                scope.cell.state = scope.cell.type;
            }
            scope.$apply();
        });

        element.bind('contextmenu', function(e){
            if(scope.cell.state === 'flagged') {
                scope.cell.state = 'unsure';
            }
            else if(scope.cell.state == 'unsure') {
                scope.cell.state = 'untouched';
            }
            else {
                scope.cell.state = 'flagged';
            }
            e.preventDefault();
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
