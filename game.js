var name = $("#firstPlayer").text();
var secondName = $("#secondPlayer").text();


debugger;
class Player{


    constructor(name,token,classPlayer,type){
        this.name = name;
        this.token = token;
        this.classPlayer = classPlayer;
        this.type = type || human;
    }

    getType(){
        return this.type;
    }

    setType(type){
        this.type = type;
    }

}

Object.defineProperty(Player, 'human', {
    value: 'human',
    writable : false,
    enumerable : true,
    configurable : false
});

Object.defineProperty(Player, 'random_robot', {
    value: 'random_robot',
    writable : false,
    enumerable : true,
    configurable : false
});

Object.defineProperty(Player, 'ia_robot', {
    value: 'ia_robot',
    writable : false,
    enumerable : true,
    configurable : false
});

class Game{

    constructor(numCol,numRow,arrayPlayers){
        this.numCol = numCol;
        this.numRow = numRow;
        this.arrayPlayers = arrayPlayers;
        this.playerTurn = 0;
        this.gameBoard = this.initGameBoard(numCol,numRow);
        this.win = false;
    }

    initGameBoard(numCol,numRow){
        var gameBoard = [];
        for(var i = 0; i < numCol; i++){
            var column = [];
            for(var j = 0; j < numRow; j++){
                column.push('_');
            }
            gameBoard.push(column);
        }
        return gameBoard;
    }

    playTurn(indexCol){
        var indexRow = this.changeTokenInBoard(indexCol);
        if(indexRow === null){
            console.log("column full");
            return null;
        }else {
            var result = this.checkWin(indexCol, indexRow);
            if(result[2] === false){
                if(this.checkAllColumnsFull()){
                   return Game.full;
                }
            }else{
                this.win = true;
            }
            this.playerTurn = (this.playerTurn + 1) % this.arrayPlayers.length;
            return result;
        }
        return false;
    }

    changeTokenInBoard(indexCol){

        var column = this.gameBoard[indexCol];
        for(var i = column.length-1; i >= 0; i--){
            if(column[i] === '_'){
                column[i] = this.arrayPlayers[this.playerTurn].token;
                return i;
            }
        }
        return null;
    }

    checkWin(indexCol,indexRow){
        if(this.checkColumn(indexCol)){
            return [indexCol,indexRow,true];
        }else if (this.checkRow(indexRow)){
            return [indexCol,indexRow,true];
        }else if(this.checkRightDiagonal(indexCol,indexRow)){
            return [indexCol,indexRow,true];
        }else if(this.checkLeftDiagonal(indexCol,indexRow)){
            return [indexCol,indexRow,true];
        }
        return [indexCol,indexRow,false];
    }


    checkColumn(indexCol){
        var numTokens = 0;
        var column = this.gameBoard[indexCol];
        for(var i = this.numRow-1; i >=0 ; i--){
            if(column[i] === this.arrayPlayers[this.playerTurn].token){
                numTokens++;
                if(numTokens === 4){
                    return true;
                }
            }else{
                numTokens = 0;
            }
        }
        return false;
    }

    checkRow(indexRow){
        var numTokens = 0;
        for(var i = this.numCol-1; i >=0 ; i--){
            if(this.gameBoard[i][indexRow] === this.arrayPlayers[this.playerTurn].token){
                numTokens++;
                if(numTokens === 4){
                    return true;
                }
            }else{
                numTokens = 0;
            }
        }
        return false;
    }

    checkRightDiagonal(indexCol,indexRow){
        var numTokens = 0;
        var maxRow = this.numRow-1;
        var startRow = maxRow;
        var startCol = 0;
        if(maxRow <= indexRow + indexCol){
            startRow = maxRow;
            var rest = maxRow - indexRow;
            startCol = indexCol - rest;
        }else{
            startRow = indexRow + indexCol;
            startCol = 0;
        }
        for(var i = startCol, j = startRow; i < this.numCol && j >= 0; i++, j--){
            if(this.gameBoard[i][j] === this.arrayPlayers[this.playerTurn].token){
                numTokens++;
                if(numTokens === 4){
                    return true;
                }
            }else{
                numTokens = 0;
            }
        }
        return false;
    }

    checkLeftDiagonal(indexCol,indexRow){
        var numTokens = 0;
        var maxRow = this.numRow-1;
        var maxCol = this.numCol-1;
        var startRow = maxRow;
        var startCol = 0;
        if(maxCol - maxRow >= indexCol - indexRow){
            startRow = maxRow;
            var rest = maxRow - indexRow;
            startCol = indexCol + rest;
        }else{
            startCol = maxCol;
            var rest = maxCol - indexCol;
            startRow = indexRow + rest;
        }
        for(var i = startCol, j = startRow; i >= 0 && j >= 0; i--, j--){
            if(this.gameBoard[i][j] === this.arrayPlayers[this.playerTurn].token){
                numTokens++;
                if(numTokens === 4){
                    return true;
                }
            }else{
                numTokens = 0;
            }
        }
        return false;
    }

    checkAllColumnsFull(){
        var numTokens = 0;
        for(var i = 0; i < this.numCol; i++){
            if(this.gameBoard[i][0] !== '_'){
                numTokens++;
            }
        }
        if(numTokens === this.numCol){
            return true;
        }
        return false;
    }

    randomPlay(){
        return Math.floor(Math.random() * this.numCol);
    }

}

Object.defineProperty(Game, 'full', {
    value: 'full',
    writable : false,
    enumerable : true,
    configurable : false
});