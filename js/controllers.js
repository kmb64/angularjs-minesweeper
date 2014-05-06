/*global mineCount, rows, cols, cellCount*/

app.controller('appController', function ($scope, gameBoardService) {
  var interval = 0;

  $scope.setTimer = function(){
    if(typeof interval === 'undefined') {
      $scope.time = 0;
      interval = window.setInterval(function(){
        $scope.time += 1000;
        $scope.$apply();
      },1000);
    }
  };

  $scope.setUp = function () {

    clearInterval(interval);
    interval = undefined;
    $scope.time = 0;
    $scope.minesLeft = mineCount;
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
        $scope.minesLeft = mineCount - flagged;
        if (!gameOver && cleared === cellCount && flagged === mineCount) {
          $scope.scoreBoard.gameStatus = 'You win!';
          $scope.setSmileyFace('won');
          clearInterval(interval);
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