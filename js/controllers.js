app.controller('appController', function($scope, gameBoardService){
    $scope.gameBoard = {};
    $scope.scoreBoard = {};
    $scope.scoreBoard.gameStatus = '';
    $scope.gameBoard.cells = gameBoardService.setup().cells;

    $scope.$watch('gameBoard.cells', function(newCells) {
            angular.forEach(newCells, function(cell){
                //Game over
                if(cell.state === MINE) {
                    cell.type = DEATH_MINE_CLASS;
                    //Stop watching
                    revealCells();
                }
            });
        },
        true);

    var revealCells = function() {
        angular.forEach($scope.gameBoard.cells, function(cell){
            cell.state = cell.type;
        });
        $scope.scoreBoard.gameStatus = 'Game over';
    };
});