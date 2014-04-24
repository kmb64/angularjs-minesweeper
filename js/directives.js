app.directive('cell', ['gameBoardService', function(gameBoardService){

    function link(scope, element, attrs) {

      var rightMouseDown = false,
        leftMouseDown = false;

        element.bind('click', function(){
            if(scope.cell.type === CLEAR) {
                gameBoardService.clearSurroundingCells(scope.cell.index);
            }
            if(scope.cell.state !== FLAGGED) {
                scope.cell.state = scope.cell.type;
            }
            scope.$apply();
        });

        element.bind('contextmenu', function(e){

            if(scope.cell.state === FLAGGED) {
                scope.cell.state = UNSURE;
            }
            else if(scope.cell.state === UNSURE) {
                scope.cell.state = UNTOUCHED;
            }
            else if(scope.cell.state === UNTOUCHED) {
                scope.cell.state = FLAGGED;
            }
            //Prevent default browser right click context menu.
            e.preventDefault();
            //Apply up to parent scope.
            scope.$apply();
        });

        element.bind('dblclick', function(){
            if(scope.cell.state !== UNTOUCHED && scope.cell.state !== FLAGGED && scope.cell.state !== UNSURE) {
                gameBoardService.clearIfFlagged(scope.cell.index);
            }
            scope.$apply();
        });

      element.bind('mousedown', function(event){
        switch (event.which) {
          //Left mouse button
          case 1:
            leftMouseDown = true;
            break;
          //Right mouse button
          case 3:
            rightMouseDown = true;
            break;
          default:
        }

      });

      element.bind('mouseup', function(){
        if(leftMouseDown && rightMouseDown) {
          leftMouseDown = false;
          rightMouseDown = false;
          if(scope.cell.state !== UNTOUCHED && scope.cell.state !== FLAGGED && scope.cell.state !== UNSURE) {
            gameBoardService.clearIfFlagged(scope.cell.index);
          }
          scope.$apply();
        }
      });
    }

    return {
        template : '<div class="cell"></div>',
        restrict : 'E',
        link : link,
        replace : true,
        scope : false
    };
}]);