app.controller('appController', function ($scope, $cookies, gameBoardService) {

  var interval = 0;

  $scope.highScores = {
    beginner : $cookies.beginner || '-',
    intermediate : $cookies.intermediate || '-',
    expert : $cookies.expert || '-'
  };

  var blink = function(time){
    if(time % 3000 === 0) {
      $scope.setSmileyFace(SmileyFaces.BLINKING);
    } else{
      $scope.setSmileyFace(SmileyFaces.DEFAULT);
    }
  };

  $scope.setTimer = function(){
    if(typeof interval === 'undefined') {
      $scope.time = 0;
      interval = window.setInterval(function(){
        $scope.time += 1000;
        blink($scope.time);
        $scope.$apply();
      },1000);
    }
  };

  var handleWin = function(){
    $scope.scoreBoard.gameStatus = 'You win!';
    $scope.setSmileyFace(SmileyFaces.VICTORIOUS);
    $scope.gameComplete = true;
    clearInterval(interval);

    switch($scope.level) {
      case Levels.BEGINNER:
        if($scope.time < $cookies.beginner) {
          $cookies.beginner = $scope.time;
        }
        break;
      case Levels.INTERMEDIATE:
        if($scope.time < $cookies.intermediate) {
          $cookies.intermediate = $scope.time;
        }
        break;
      case Levels.EXPERT:
        if($scope.time < $cookies.expert) {
          $cookies.expert = $scope.time;
        }
        break;
      default:
    }
  };

  $scope.setUp = function () {

    clearInterval(interval);
    interval = undefined;
    $scope.time = 0;
    $scope.minesLeft = app.GameBoard.mineCount;
    $scope.gameBoard = {};
    $scope.scoreBoard = {};
    $scope.smileyFace = SmileyFaces.ALIVE;
    $scope.smileyFaceLock = false;
    $scope.scoreBoard.gameStatus = '';
    $scope.gameBoard.cells = gameBoardService.setup().cells;
    $scope.gameBoard.width = {'width' : app.GameBoard.cols * 20 + app.GameBoard.cols + 'px'};
    $scope.gameComplete = false;

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
        $scope.minesLeft = app.GameBoard.mineCount - flagged;
        if($scope.minesLeft < 5) {
          $scope.setSmileyFace(SmileyFaces.DEFAULT = SmileyFaces.OVER_CONFIDENT);
        }
        if (!gameOver && cleared === app.GameBoard.cellCount && flagged === app.GameBoard.mineCount) {
          handleWin();
        }
      },
      true);

    var revealCells = function () {
      unregisterCellWatch();
      angular.forEach($scope.gameBoard.cells, function (cell) {
        cell.state = cell.type;
      });
      $scope.scoreBoard.gameStatus = 'Game over';
      $scope.setSmileyFace(SmileyFaces.DEAD);
      $scope.gameComplete = true;
      clearInterval(interval);
    };
  };

  $scope.level = $cookies.level || Levels.BEGINNER;

  $scope.$watch('level', function(level){

    $cookies.level = level;

    switch(level) {
      case Levels.BEGINNER:
        app.GameBoard.setUp(10, 9, 9);
        break;
      case Levels.INTERMEDIATE:
        app.GameBoard.setUp(40, 16, 16);
        break;
      case Levels.EXPERT:
        app.GameBoard.setUp(99, 16, 30);
        break;
      default:
    }
    $scope.setUp();
  });

  $scope.setSmileyFace = function (smileyFace) {
    if(!$scope.smileyFaceLock && !$scope.gameComplete) {
      $scope.smileyFace = smileyFace;
    }
  };

  $scope.lockSmileyFace = function(){
    $scope.smileyFaceLock = true;
  };

  $scope.unlockSmileyFace = function(){
    $scope.smileyFaceLock = false;
  }

});