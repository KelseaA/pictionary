var socket = io();
var drawing = false;
var guessBox;

var pictionary = function() {
    var guessDisplay = $("#guess-list");
    var guessBox;
    var canvas, context;

    var draw = function(position) {
        context.beginPath();
        context.arc(position.x, position.y,
           6, 0, 2 * Math.PI);
        context.fill();
    };

    var onKeyDown = function(event) {
        if (event.keyCode != 13) { // Enter
            return;
        }
        console.log(guessBox.val());
        socket.emit('guess', guessBox.val());
        guessBox.val('');
    };

    guessBox = $('#guess input');
    guessBox.on('keydown', onKeyDown);
        
    socket.on('guess', function(guess){
        guessDisplay.append("<li>" + guess + " </li>");
    });

    socket.on('draw', draw);
    
    canvas = $('canvas');
    context = canvas[0].getContext('2d');
    canvas[0].width = canvas[0].offsetWidth;
    canvas[0].height = canvas[0].offsetHeight;

    canvas.on("mousedown", function(event){
        drawing = true;
    });

    canvas.on("mouseup", function(event){
        drawing = false;
    });

    canvas.on('mousemove', function(event) {
        if (drawing){
            var offset = canvas.offset();
            var position = {x: event.pageX - offset.left,
                            y: event.pageY - offset.top};
            draw(position);
            socket.emit('draw', position);
            console.log("you're drawing");
            }
        });
};


$(document).ready(function() {
    pictionary();
});