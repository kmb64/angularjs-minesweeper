app.service('gameBoardService', function(){

    var cells = [];

    var populateCells = function(){
        //Make sure cells are cleared.
        cells = [];
        for(var i = 0; i < cellCount; i+=1) {
            cells.push(
                {
                    type : '',
                    state : UNTOUCHED,
                    index : i
                }
            );
        }
    };

    var getRandomIndex = function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    };

    var getUniqueRandomIndex = function(min, max, usedIndexes) {
      var index = getRandomIndex(min, max);
        var used = false;
        for( var i = 0; i <= usedIndexes.length; i+=1) {
            if(usedIndexes[i] === index) {
                used = true;
            }
        }
        if(!used) {
            return index;
        }
        //Not unique, try again
        else {
            return getUniqueRandomIndex(min, max, usedIndexes);
        }
    };

    var addMines = function(){
        var max = cells.length -1;
        var min = 1;
        var usedIndexes = [];
        for(var i = 0; i < mineCount; i+=1) {
            var index = getUniqueRandomIndex(min, max, usedIndexes);
            cells[index].type = MINE;
            usedIndexes.push(index);
        }
    };

    var theresAMine = function(cell) {
        return cell.type === MINE;
    };
    
    var clearIfFlagged = function(index){
        var flags = 0;
        angular.forEach(getSurroundingCells(index), function(cell){
            if (cell.state === FLAGGED) {
                flags +=1;
            }
        });
        if(TYPES[flags] === cells[index].type) {
            clearSurroundingCells(index);
        }
    };

    var clearSurroundingCells = function(index) {
        angular.forEach(getSurroundingCells(index), function(cell){
            if(cell.state === UNTOUCHED) {
                if(cell.type === CLEAR) {
                    cell.state = cell.type;
                    clearSurroundingCells(cell.index);
                }
                else{
                    cell.state = cell.type;
                }
            }
        });
    };

    var getSurroundingCells = function(index){
        var surroundingCells = [];
        if(index > cols -1) {
            //Check above, left
            if(index % cols !== 0) {
                surroundingCells.push(cells[index - (cols + 1)]);
            }
            //Check above, right
            if(index % cols !== (cols -1)) {
                surroundingCells.push(cells[index - (cols - 1)]);
            }
            surroundingCells.push(cells[index - cols])
        }
        //Check right
        if(index % cols !== (cols -1)) {
            surroundingCells.push(cells[index + 1]);
        }
        //Check below
        if(index < (cellCount - cols)) {
            //Check below, left
            if(index % cols !== 0) {
                surroundingCells.push(cells[index + (cols -1)]);
            }
            //Check below, right
            if(index % cols !== (cols -1)) {
                surroundingCells.push(cells[index + (cols + 1)]);
            }
            surroundingCells.push(cells[index + cols]);
        }
        //Check left
        if(index % cols !== 0) {
            surroundingCells.push(cells[index - 1]);
        }
        return surroundingCells;
    };

    var minesBesideMe = function(index) {
        var count = 0;
        angular.forEach(getSurroundingCells(index, cells), function(cell){
            if(theresAMine(cell)) {
                count += 1;
            }
        });
        return count;
    };

    var addNumbers = function() {
        var i = 0;
        angular.forEach(cells, function(cell){
            if(cell.type !== MINE) {
                cell.type = TYPES[minesBesideMe(i)];
            }
            i+=1;
        });
    };

    var setup = function(){
        populateCells();
        addMines();
        addNumbers();
        return {
            cells : cells
        };
    };

    return {
        setup : setup,
        getSurroundingCells : getSurroundingCells,
        clearSurroundingCells : clearSurroundingCells,
        clearIfFlagged : clearIfFlagged
    };
});