app.controller('appController', function($scope, gameBoardService){
    $scope.gameBoard = {};
    $scope.scoreBoard = {};
    $scope.scoreBoard.gameStatus = '';
    $scope.gameBoard.cells = gameBoardService.setup().cells;

    var unregisterCellWatch = $scope.$watch('gameBoard.cells', function(newCells) {
            var gameOver = false;
            var cleared = 0;
            angular.forEach(newCells, function(cell){
                //Game over
                if(cell.state === MINE && !gameOver) {
                    cell.type = DEATH_MINE_CLASS;
                    revealCells();
                    gameOver = true;
                }
                if(cell.state !== UNTOUCHED) {
                    cleared += 1;
                }
            });
            if(!gameOver && cleared === 81) {
                $scope.scoreBoard.gameStatus = 'You win!';
            }
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