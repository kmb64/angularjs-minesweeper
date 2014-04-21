app.controller('appController', function($scope, gameBoardService){
    $scope.gameBoard = {};
    $scope.gameBoard.cells = gameBoardService.setup().cells;

    $scope.$watch('gameBoard.cells', function(newCells) {
            angular.forEach(newCells, function(cell){
                if(cell.state === 'mine') {
                    console.log('Game over');
                }
                else if(cell.state === 'clear') {
                    console.log('clear cells');
                }
            });
        },
        true);
});