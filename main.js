//Dynamic creation of game board//
$(document).ready(initializeApp);


var game;

function initializeApp() {

   $('.resetButtonDiv button').click(resetGame);
   $("#submit").click(closeModal);
   $("#submit").click(grabData);

}

function closeModal() {
    $('#modal').hide();
}

function grabData() {
    var namePlayer1 = $("#firstname").val();
    var namePlayer2 = $("#secondname").val();
    var typePlayer1 = $("input[name=typePlayer1]:checked").val();
    var typePlayer2 = $("input[name=typePlayer2]:checked").val();
    var chipPlayer1 = $("input[name=chip1]:checked").val();
    var chipPlayer2 = $("input[name=chip]:checked").val();
    $('#namePlayer1').text(namePlayer1);
    $('#namePlayer2').text(namePlayer2);
    $('.player1Stats').append($('<img>',{
        class:'tokenStat',
        src:chipPlayer1
    }));
    $('.player1Stats').addClass('neon');

    $('.player2Stats').append($('<img>',{
        class:'tokenStat',
        src:chipPlayer2
    }));
    $('#winPlayer1').text(0);
    $('#winPlayer2').text(0);

    var player1 = new Player(namePlayer1,'x',chipPlayer1,typePlayer1);
    var player2 = new Player(namePlayer2,'o',chipPlayer2,typePlayer2);
    var players = [player1,player2];

    game = new Game(7, 6, players);
    createBoard();
    if(game.arrayPlayers[game.playerTurn].type === Player.random_robot || game.arrayPlayers[game.playerTurn].type === Player.ia_robot){
        clickColumnHandler(null, game.randomMove());
    }
}

const porcentageTopByRow = ['0.6%','14.9%','29.1%','43.4%','57.6%','72%'];


/**
 *
 */
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

/**
 *
 * @param event
 * @param id
 */
function clickColumnHandler(event,id){

    //We want to control the clicks when the robot is playing but we didn't have time to control it
    if(game.playerTurn==1){
        $('.player2Stats').removeClass('neon');
        $('.player1Stats').addClass('neon');
    }else{
        $('.player1Stats').removeClass('neon');
        $('.player2Stats').addClass('neon');
    }

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
                src: game.getOtherPlayer().image,
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
                    var winner = game.getOtherPlayer();
                    var winText = $('<div>', {
                        text: winner.name + ' Won!',
                        class: 'winText'
                    });
                    $(".gameBoard").append(winText);
                    if(game.playerTurn==1){
                        var win = $('#winPlayer1').text();
                        var num_wins = parseInt(win);
                        num_wins++;
                        $('#winPlayer1').text(num_wins);
                    }else{
                        var win = $('#winPlayer2').text();
                        var num_wins = parseInt(win);
                        num_wins++;
                        $('#winPlayer2').text(num_wins);
                    }
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

function resetGame(){
    game.resetGame();
    $('.column img').remove();
    $('.winText').remove();
}


