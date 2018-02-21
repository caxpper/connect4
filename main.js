//Dynamic creation of game board//
$(document).ready(initializeApp);
function initializeApp() {
    var game = new gameBoard();
    game.createBoard();
//---------Click Handlers-------------//
    $('#0').click
    (console.log("Click 0 working"));
    $('#1').click(console.log("Click 1 working"));
    $('#2').click(alert("Click 2 working"));
    $('#3').click(alert("Click 3 working"));
    $('#4').click(alert("Click 4 working"));
    $('#5').click(alert("Click 5 working"));
    $('#6').click(alert("Click 6 working"));
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
                var circle = $('<div>',{
                   class: "circle"

                });
                square.appendTo(column);
                circle.appendTo(square);
            }
            column.appendTo(".gameBoard")
        }

    }
}

