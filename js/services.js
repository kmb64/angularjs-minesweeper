app.service('gameBoardService', function(){

    var cells = [];

    var populateCells = function(){
        for(var i = 0; i < CELL_COUNT; i+=1) {
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
        for(var i = 0; i < MINE_COUNT; i+=1) {
            var index = getUniqueRandomIndex(min, max, usedIndexes);
            cells[index].type = MINE;
            usedIndexes.push(index);
        }
    };

    var theresAMine = function(cell) {
        return cell.type === MINE;
    };
    
    var clearIfFlagged = function(index){
        angular.forEach(getSurroundingCells(index), function(cell){
            var flag = false;
            if(cell.state === FLAGGED && !flag) {
                clearSurroundingCells(index);
                flag = true;
            }
        });
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
        if(index > COLS -1) {
            //Check above, left
            if(index % COLS !== 0) {
                surroundingCells.push(cells[index - (COLS + 1)]);
            }
            //Check above, right
            if(index % COLS !== (COLS -1)) {
                surroundingCells.push(cells[index - (COLS - 1)]);
            }
            surroundingCells.push(cells[index - COLS])
        }
        //Check right
        if(index % COLS !== (COLS -1)) {
            surroundingCells.push(cells[index + 1]);
        }
        //Check below
        if(index < (CELL_COUNT - COLS)) {
            //Check below, left
            if(index % COLS !== 0) {
                surroundingCells.push(cells[index + (COLS -1)]);
            }
            //Check below, right
            if(index % COLS !== (COLS -1)) {
                surroundingCells.push(cells[index + (COLS + 1)]);
            }
            surroundingCells.push(cells[index + COLS]);
        }
        //Check left
        if(index % COLS !== 0) {
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