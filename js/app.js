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
            { type : 'last-in-row'},

            { type : 'mine'},
            { type : 'flagged'},
            { type : 'clear'},
            { type : 'flagged unsure'},
            { type : ''},
            { type : 'mine death'},
            { type : ''},
            { type : ''},
            { type : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : 'last-in-row'},

            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : ''},
            { type : 'last-in-row'}
        ]
    };
});

mswApp.directive('cell', function(){

    function link(scope, element, attrs) {
        element.bind('click', function(){
            element.addClass('clicked');
        });
    }

    return {
        template : '<div class="cell"></div>',
        restrict : 'E',
        link : link,
        replace : true,
    };
});
