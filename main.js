//Dynamic creation of game board//
$(document).ready(initializeApp);


var game;

function initializeApp() {
    var player1 = new Player('Alex','x','image/player1.png',Player.ia_robot);
    var player2 = new Player('Evan','o','image/player2.png',Player.human);
    var players = [player1,player2];
    game = new Game(7, 6, players);
    createBoard();
   
    $("#submit").click(closeModal);
    $("#submit").click(grabData);
    if(game.arrayPlayers[game.playerTurn].type === Player.random_robot || game.arrayPlayers[game.playerTurn].type === Player.ia_robot){
        clickColumnHandler(null, game.randomMove());
    }
}

function closeModal() {
    $('#modal').hide();
}

function grabData() {
    var firstName = $("#firstname").val();
    var secondName = $("#secondname").val();
    var opponent1 = $("input[name=opponent1]:checked").val();
    var opponent = $("input[name=opponent]:checked").val();
    var chips = $("input[name=chip1]:checked").val();
    var chips1 = $("input[name=chip]:checked").val();
    console.log(firstName,secondName,opponent1,opponent,chips,chips1);
    // var player1 = new Player('Alex','x','player1',opponent);
    // var player2 = new Player('Evan','o','player2',opponent1);
    // var players = [player1,player2];
}

const porcentageTopByRow = ['0.6%','14.9%','29.1%','43.4%','57.6%','72%'];


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
            square.appendTo(column);
        }
        column.appendTo(".gameBoard")
    }

}

function clickColumnHandler(event,id){

    if(!game.win) {
        if(id === undefined) {
            var id = $(this).attr('id');
        }
        if(id===null) {
            var result = null;
        }else{
            var result = game.playTurn(parseInt(id));
        }

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
                        var playerName = game.getOtherPlayer().name;
                        var winText = $('<div>', {
                            text: playerName + ' Won!',
                            class: 'winText'
                        });
                        $(".gameBoard").append(winText);
                    },1000);
                }else{
                    if(game.arrayPlayers[game.playerTurn].type === Player.random_robot || game.arrayPlayers[game.playerTurn].type === Player.ia_robot){
                        setTimeout(function () {
                            if(game.arrayPlayers[game.playerTurn].type === Player.random_robot){
                                var result = game.randomMove();
                            }else {
                                var result = game.getNextBestMove();
                            }
                            if(result === null){
                                var winText = $('<div>', {
                                    text: 'You tie!',
                                    class: 'winText'
                                });
                                $(".gameBoard").append(winText);
                            }else {
                                clickColumnHandler(this, result);
                            }
                        },1100);
                    }
                }

        }
    }
}


