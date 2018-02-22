//Dynamic creation of game board//
$(document).ready(initializeApp);

function initializeApp() {
    createBoard();
    $("#submit").click(closeModal);
    $("#submit").click(grabData);
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


var player1 = new Player('Alex','x','player1',Player.human);
var player2 = new Player('Evan','o','player2',Player.random_robot);
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
            var circle = $('<div>',{
               class: "circle",
                id: i + "_" + j
            });
            square.appendTo(column);
            circle.appendTo(square);
        }
        column.appendTo(".gameBoard")
    }

}
function clickColumnHandler(){
    if(!game.win) {
        var id = $(this).attr('id');
        var result = game.playTurn(parseInt(id));
        var indexCol = result[0];
        var indexRow = result[1];

        $('#' + indexCol + '_' + indexRow).addClass(game.arrayPlayers[game.playerTurn].classPlayer);
        if(result[2]){
            var playerName = game.arrayPlayers[game.playerTurn].name;
            var winText = $('<div>',{
                text: playerName + ' Won!',
                class: 'winText'
            });
            $(".gameBoard").append(winText);
        }
    }
}


