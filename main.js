//Dynamic creation of game board//
$(document).ready(initializeApp);
function initializeApp() {
    var game = new gameBoard();
    game.createBoard();
//---------Click Handlers-------------//
    $('.column').click()
}
class gameBoard {
    constructor() {

    }
    createBoard() {
        for (var i = 0; i <= 6; i++) {
            var column = $("<div>", {
                class: "column",
                id: i,
            });

            for (var j = 0; j <= 5; j++) {
                var square = $("<div>", {
                    class: "square",
                    id: i + "_" + j

                });
                square.appendTo(column);
            }
            column.appendTo(".gameBoard")
        }

    }
}

