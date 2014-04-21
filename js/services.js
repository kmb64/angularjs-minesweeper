app.service('gameBoardService', function(){

    var createCells = function(){

        var cells = [];

        for(var i = 0; i < 81; i+=1) {
            cells.push(
                {
                    type : '',
                    state : ''
                }
            );
        }
        return cells;
    };

    var addMines = function(cellArray, numOfMines){
        for(var i = 0; i < numOfMines; i+=1) {

            var max = cellArray.length;
            var min = 1;
            var index = Math.floor(Math.random()*(max-min+1)+min);
            cellArray[index].type = MINE;
        }
    };

    var theresAMine = function(cell) {
        return cell.type === MINE;
    };

    var getSurroundingCells = function(index, cellsArray){
        var surroundingCells = [];


    };

    var minesBesideMe = function(index, cellsArray) {

        var count = 0;
        //Check above
        if(index > 8) {
            //Check above, left
            if(index % 9 !== 0) {
                if(theresAMine(cellsArray[index - 10])) {
                    count +=1;
                }
            }
            //Check above, right
            if(index % 9 !== 8) {
                if(theresAMine(cellsArray[index - 8])) {
                    count +=1;
                }
            }
            if(theresAMine(cellsArray[index - 9])) {
                count +=1;
            }
        }
        //Check right
        if(index % 9 !== 8) {
            if(theresAMine(cellsArray[index + 1])) {
                count += 1;
            }
        }
        //Check below
        if(index < 71) {
            //Check below, left
            if(index % 9 !== 0) {
                if(theresAMine(cellsArray[index + 10])) {
                    count +=1;
                }
            }
            //Check below, right
            if(index % 9 !== 8) {
                if(theresAMine(cellsArray[index + 8])) {
                    count +=1;
                }
            }
            if(theresAMine(cellsArray[index + 9])) {
                count += 1;
            }
        }
        //Check left
        if(index % 9 !== 0) {
            if(theresAMine(cellsArray[index - 1])) {
                count += 1;
            }
        }
        return count;
    };


    var addNumbers = function(cells) {
        var i = 0;
        angular.forEach(cells, function(cell){
            if(cell.type !== MINE) {
                cell.type = TYPES[minesBesideMe(i, cells)];
            }
            i+=1;
        });
    };

    return {
        generate : function(){

            var cells = createCells();
            addMines(cells, 10);
            addNumbers(cells);

            return {
                cells : cells
            }
        }
    };
});