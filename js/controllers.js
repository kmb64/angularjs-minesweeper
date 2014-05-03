/*global mineCount, rows, cols, cellCount*/

app.controller('appController', function ($scope, gameBoardService) {

  $scope.setUp = function () {

    $scope.gameBoard = {};
    $scope.scoreBoard = {};
    $scope.smileyFace = 'alive';
    $scope.scoreBoard.gameStatus = '';
    $scope.gameBoard.cells = gameBoardService.setup().cells;
    $scope.gameBoard.width = cols * 20 + cols;

    var unregisterCellWatch = $scope.$watch('gameBoard.cells', function (newCells) {
        var gameOver = false,
          cleared = 0,
          flagged = 0;
        angular.forEach(newCells, function (cell) {
          //Game over
          if (cell.state === MINE && !gameOver) {
            cell.type = DEATH_MINE_CLASS;
            revealCells();
            gameOver = true;
          }
          if (cell.state !== UNTOUCHED) {
            cleared += 1;
          }
          if (cell.state === FLAGGED) {
            flagged +=1;
          }
        });
        if (!gameOver && cleared === cellCount && flagged === mineCount) {
          $scope.scoreBoard.gameStatus = 'You win!';
          $scope.setSmileyFace('won');
        }
      },
      true);

    var revealCells = function () {
      unregisterCellWatch();
      angular.forEach($scope.gameBoard.cells, function (cell) {
        cell.state = cell.type;
      });
      $scope.scoreBoard.gameStatus = 'Game over';
      $scope.setSmileyFace('dead');
    };
  };

  $scope.level = 'beginner';

  $scope.$watch('level', function(level){

    if(level === 'intermediate') {
      mineCount = 40;
      rows = 16;
      cols = 16;
    }
    else if(level === 'expert') {
      mineCount = 99;
      rows = 16;
      cols = 30;
    }
    else {
      mineCount = 10;
      rows = 9;
      cols = 9;
    }

    cellCount = cols * rows;

    $scope.setUp();
  });

  $scope.setSmileyFace = function (smileyFace) {
    $scope.smileyFace = smileyFace;
  };
});