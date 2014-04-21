app.directive('cell', function(){

    function link(scope, element, attrs) {

        element.bind('click', function(){
            if(scope.cell.type === CLEAR) {
                //clearSurroundingCells
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
                scope.cell.state = UNTOUCEHD;
            }
            else {
                scope.cell.state = FLAGGED;
            }
            //Prevent default browser right click context menu.
            e.preventDefault();
            //Apply up to parent scope.
            scope.$apply();
        });
    }

    return {
        template : '<div class="cell"></div>',
        restrict : 'E',
        link : link,
        replace : true,
        scope : false
    };
});