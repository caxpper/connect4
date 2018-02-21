//Dynamic creation of game board//
$(document).ready(initializeApp);
function initializeApp() {
    var game = new gameBoard();
    game.createBoard();
//---------Click Handlers-------------//
    $('#0').on("click", function () {
        (console.log("Click 0 working"));
    });
    $('#1').on("click", function () {
        (console.log("Click 1 working"));
    });
    $('#2').on("click", function () {
        (console.log("Click 2 working"));
    });
    $('#3').on("click", function () {
        (console.log("Click 3 working"));
    });
    $('#4').on("click", function () {
        (console.log("Click 4 working"));
    });
    $('#5').on("click", function () {
        (console.log("Click 5 working"));
    });
    $('#6').on("click", function () {
        (console.log("Click 6 working"));
    })


    // (console.log("Click 0 working"));
    // $('#1').click(console.log("Click 1 working"));
    // $('#2').click(console.log("Click 2 working"));
    // $('#3').click(console.log("Click 3 working"));
    // $('#4').click(console.log("Click 4 working"));
    // $('#5').click(console.log("Click 5 working"));
    // $('#6').click(console.log("Click 6 working"));
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

