app.controller('appController', function($scope, gameBoardService){

    $scope.setUp = function(){

      $scope.gameBoard = {};
      $scope.scoreBoard = {};
      $scope.smileyFace = 'alive';
      $scope.scoreBoard.gameStatus = '';
      $scope.gameBoard.cells = gameBoardService.setup().cells;
      $scope.gameBoard.width = COLS * 20 + COLS;

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
          if(!gameOver && cleared === CELL_COUNT) {
            $scope.scoreBoard.gameStatus = 'You win!';
            $scope.setSmileyFace('won');
          }
        },
        true);

      var revealCells = function() {
        unregisterCellWatch();
        angular.forEach($scope.gameBoard.cells, function(cell){
          cell.state = cell.type;
        });
        $scope.scoreBoard.gameStatus = 'Game over';
        $scope.setSmileyFace('dead');
      };
    };
    $scope.setUp();

    $scope.setSmileyFace = function(smileyFace) {
      $scope.smileyFace = smileyFace;
    };
});