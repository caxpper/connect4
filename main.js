//Dynamic creation of game board//
$(document).ready(initializeApp);
function initializeApp() {
    createBoard();
}

const porcentageTopByRow = ['0.6%','14.9%','29.1%','43.4%','57.6%','72%'];
var player1 = new Player('Alex','x','image/player1.png',Player.human);
var player2 = new Player('Evan','o','image/player2.png',Player.random_robot);
var players = [player1,player2];

var game = new Game(7, 6, players);

function createBoard() {
    for (var i = 0; i < game.numCol; i++) {
        var column = $("<div>", {
            class: "column",
            id: i,
            click: clickColumnHandler
        });

        for (var j = 0; j < game.numRow; j++) {
            var square = $("<div>", {
                class: "square"
            });
           /* var circle = $('<div>',{
               class: "circle",
                id: i + "_" + j
            });

            circle.appendTo(square);*/
            square.appendTo(column);
        }
        column.appendTo(".gameBoard")
    }

}

function clickColumnHandler(){

    if(!game.win) {
        var id = $(this).attr('id');
        var result = game.playTurn(parseInt(id));
        if(result !== null) {

                var indexCol = result[0];
                var indexRow = result[1];

                var img = $('<img>', {
                    src: game.arrayPlayers[game.playerTurn].image,
                    class: 'token'
                });

                img.animate({
                    top: porcentageTopByRow[indexRow]
                }, 1000);

                $('#' + indexCol).append(img);
                if(result[2] === Game.full){
                    setTimeout(function () {
                        var winText = $('<div>', {
                            text: 'You tie!',
                            class: 'winText'
                        });
                        $(".gameBoard").append(winText);
                    },1000);
                }else if (result[2]) {
                    setTimeout(function () {
                        var playerName = game.arrayPlayers[game.playerTurn].name;
                        var winText = $('<div>', {
                            text: playerName + ' Won!',
                            class: 'winText'
                        });
                        $(".gameBoard").append(winText);
                    },1000);
                }

        }
    }
}


