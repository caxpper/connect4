
class Player{


    constructor(name,token,image,type){
        this.name = name;
        this.token = token;
        this.image = image;
        this.type = type || Player.human;
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
        var indexRow = this.changeTokenInBoard(indexCol,this.gameBoard,this.arrayPlayers[this.playerTurn].token);
        if(indexRow === null){
            console.log("column full");
            return null;
        }else {
            var result = this.checkWin(indexCol, indexRow,this.arrayPlayers[this.playerTurn].token,this.gameBoard,4);
            if(result[2] === false){
                if(this.checkAllColumnsFull()){
                   return [indexCol,indexRow,Game.full];
                }
            }else{
                this.win = true;
            }
            this.playerTurn = (this.playerTurn + 1) % this.arrayPlayers.length;
            return result;
        }
        return false;
    }

    changeTokenInBoard(indexCol,board,token){

        var column = board[indexCol];
        for(var i = column.length-1; i >= 0; i--){
            if(column[i] === '_'){
                column[i] = token;
                return i;
            }
        }
        return null;
    }

    checkWin(indexCol,indexRow,token,board,numTotalTokens){
        if (this.checkRow(indexRow,token,board,numTotalTokens)){
            return [indexCol,indexRow,true];
        }else if(this.checkColumn(indexCol,token,board,numTotalTokens)){
            return [indexCol,indexRow,true];
        }else if(this.checkRightDiagonal(indexCol,indexRow,token,board,numTotalTokens)){
            return [indexCol,indexRow,true];
        }else if(this.checkLeftDiagonal(indexCol,indexRow,token,board,numTotalTokens)){
            return [indexCol,indexRow,true];
        }
        return [indexCol,indexRow,false];
    }


    checkColumn(indexCol,token,board,numTotalTokens){
        var numTokens = 0;
        var column = board[indexCol];
        for(var i = this.numRow-1; i >=0 ; i--){
            if(column[i] === token){
                numTokens++;
                if(numTokens === numTotalTokens){
                    return true;
                }
            }else{
                numTokens = 0;
            }
        }
        return false;
    }

    checkRow(indexRow,token,board,numTotalTokens){
        var numTokens = 0;
        for(var i = this.numCol-1; i >=0 ; i--){
            if(board[i][indexRow] === token){
                numTokens++;
                if(numTokens === numTotalTokens){
                    return true;
                }
            }else{
                numTokens = 0;
            }
        }
        return false;
    }

    checkRightDiagonal(indexCol,indexRow,token,board,numTotalTokens){
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
            if(board[i][j] === token){
                numTokens++;
                if(numTokens === numTotalTokens){
                    return true;
                }
            }else{
                numTokens = 0;
            }
        }
        return false;
    }

    checkLeftDiagonal(indexCol,indexRow,token,board,numTotalTokens){
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
            if(board[i][j] === token){
                numTokens++;
                if(numTokens === numTotalTokens){
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

    randomMove(){
        while (true) {
            var indexCol = Math.floor(Math.random() * this.numCol);
            if (this.gameBoard[indexCol][0] === '_') {
                return indexCol;
            } else {
                if (this.checkAllColumnsFull()) {
                    return null;
                }
            }
        }
    }

    getOtherPlayer(){
        var indexPlayer = (this.playerTurn + 1) % this.arrayPlayers.length;
        return this.arrayPlayers[indexPlayer];
    }

    getIndexColumnOtherPlayerWin(token,numTotalTokens,board,deep){

        if(deep === undefined){
            deep = 1;
        }
        var boardCopy = null;
        for(var i = 0; i < this.numCol; i++) {
            boardCopy = JSON.parse(JSON.stringify(board));
            var indexRow = this.changeTokenInBoard(i, boardCopy, token);
            if (deep === 1) {
                var move = this.checkWin(i, indexRow, token, boardCopy, numTotalTokens);
            }else {
                var index = this.getIndexColumnOtherPlayerWin(token, numTotalTokens + 1, boardCopy, deep - 1);
                if(index !==-1){
                    return index;
                }else{
                    move=null;
                }
            }

            if(move !== null){
                if(move[2]){
                    return i;
                }
            }
        }
        return -1;
    }

    getNextBestMove(){

        var  indexCol = this.getIndexColumnOtherPlayerWin(this.arrayPlayers[this.playerTurn].token,4,this.gameBoard);
        if(indexCol !== -1 && this.gameBoard[indexCol][0] === '_'){
            return indexCol;
        }else{
            indexCol = this.getIndexColumnOtherPlayerWin(this.getOtherPlayer().token,4,this.gameBoard);
            if(indexCol !== -1 && this.gameBoard[indexCol][0] === '_'){
                return indexCol;
            }else {
                indexCol = this.getIndexColumnOtherPlayerWin(this.getOtherPlayer().token,3,this.gameBoard,2);
                if(indexCol !== -1 && this.gameBoard[indexCol][0] === '_'){
                    return this.checkIfOtherPlayerWin(indexCol);
                }else{
                    indexCol = this.getIndexColumnOtherPlayerWin(this.arrayPlayers[this.playerTurn].token, 3,this.gameBoard);
                    if (indexCol !== -1 && this.gameBoard[indexCol][0] === '_') {
                        return this.checkIfOtherPlayerWin(indexCol);
                    } else {
                        indexCol = this.getIndexColumnOtherPlayerWin(this.arrayPlayers[this.playerTurn].token, 2,this.gameBoard);
                        if (indexCol !== -1 && this.gameBoard[indexCol][0] === '_') {
                            return this.checkIfOtherPlayerWin(indexCol);
                        } else {
                            return this.randomMove();
                        }
                    }
                }
            }
        }
    }

    checkIfOtherPlayerWin(indexCol){
        var boardCopy = JSON.parse(JSON.stringify(this.gameBoard));
        this.changeTokenInBoard(indexCol, boardCopy, this.arrayPlayers[this.playerTurn].token);
        var indexColOther = this.getIndexColumnOtherPlayerWin(this.getOtherPlayer().token,4,boardCopy);
        if(indexColOther === -1) {
            return indexCol;
        }else{
            var indexRandom = this.randomMove();
            while(indexRandom === indexCol){
                indexRandom = this.randomMove();
            }
            return indexRandom;
        }
    }
}



Object.defineProperty(Game, 'full', {
    value: 'full',
    writable : false,
    enumerable : true,
    configurable : false
});