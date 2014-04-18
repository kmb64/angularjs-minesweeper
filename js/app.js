var mswApp = angular.module('mswApp', []);

mswApp.controller('appController', function($scope){
    $scope.gameBoard = {
        cells : [
            { type : 'one'},
            { type : 'two'},
            { type : 'three'},
            { type : 'four'},
            { type : 'five'},
            { type : 'six'},
            { type : 'seven'},
            { type : 'eight'},
            { type : '',
             cssClass : 'last-in-row'},

            { type : 'mine'},
            { type : 'flagged'},
            { type : 'clear'},
            { type : 'flagged unsure'},
            { type : ''},
            { type : 'mine death'},
            { type : ''},
            { type : ''},
            { type : '',
             cssClass : 'last-in-row'},

            { type : 'bomb'},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : '',
             cssClass : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : '',
             cssClass : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : '',
             cssClass : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : '',
             cssClass : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : '',
             cssClass : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : '',
             cssClass : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : '',
             cssClass : 'last-in-row'}
        ]
    };
});

mswApp.directive('cell', function(){

    function changeState(element, cell, newState) {
        element.removeClass(cell.state);
        cell.state = newState;
        element.addClass(cell.state);
    }

    function link(scope, element, attrs) {

        element.bind('click', function(){
            if(scope.cell.state !== 'flagged') {
                changeState(element, scope.cell, scope.cell.type);
            }
        });

        element.bind('contextmenu', function(e){
            if(scope.cell.state === 'flagged') {
                changeState(element, scope.cell, 'unsure');
            }
            else if(scope.cell.state == 'unsure') {
                changeState(element, scope.cell, 'untouched');
            }
            else {
                changeState(element, scope.cell, 'flagged');
            }
            e.preventDefault();
        });
    }

    return {
        template : '<div class="cell"></div>',
        restrict : 'E',
        link : link,
        replace : true,
        scope : {
            cell : '='
        }
    };
});
