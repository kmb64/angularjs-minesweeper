app.controller('appController', function($scope, gameBoardService){
    $scope.gameBoard = {};
    $scope.scoreBoard = {};
    $scope.scoreBoard.gameStatus = '';
    $scope.gameBoard.cells = gameBoardService.setup().cells;

    var unregisterCellWatch = $scope.$watch('gameBoard.cells', function(newCells) {
            var gameOver = false;
            angular.forEach(newCells, function(cell){
                //Game over
                if(cell.state === MINE && !gameOver) {
                    cell.type = DEATH_MINE_CLASS;
                    revealCells();
                    gameOver = true;
                }
            });
        },
        true);

    var revealCells = function() {
        unregisterCellWatch();
        angular.forEach($scope.gameBoard.cells, function(cell){
            cell.state = cell.type;
        });
        $scope.scoreBoard.gameStatus = 'Game over';
    };
});