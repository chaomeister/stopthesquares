var loadSquaresInterval;
var squareSpeedInterval;
var clickedSquares = 0;
var bestRun = 0;
var duration = 2000;
var squareInterval = 1000;

function startGame(){
    loadSquaresInterval = setInterval(addSquare, squareInterval);
    squareSpeedInterval = setInterval(increaseSpeed, 1000);
    $("#startGame").fadeOut();
}

function restartGame(){
    clickedSquares = 0;
    duration = 2000;
    squareInterval = 1000;
    $("#gameOver").fadeOut();
    loadSquaresInterval = setInterval(addSquare, squareInterval);
    squareSpeedInterval = setInterval(increaseSpeed, 1000);
}

function endGame(){
    resetBestRun();
    clearInterval(squareSpeedInterval);
    clearInterval(loadSquaresInterval);
    $(".square").stop();
    $(".square").fadeOut();
    $("#gameOver").fadeIn();   
    $("#stoppedSquares").text("Squares stopped: " + clickedSquares);
    $("#bestRun").text("Best run: " + bestRun);
}

function resetBestRun(){
    if (clickedSquares > bestRun) {
        bestRun = clickedSquares;
    }
}

function increaseSpeed(){
    clearInterval(loadSquaresInterval);
    squareInterval -= 25;
    loadSquaresInterval = setInterval(addSquare, squareInterval);
}
function addSquare(){
    duration -= 50;
	var windowWidth = $(window).width();
	var windowHeight = $(window).height() - 100;
	var x = ((Math.random() * (windowWidth - 100)));
	var y = 0;
	var newDivElement = $("<div>");
    newDivElement.addClass("square");
    newDivElement.click(function(){
        $(this).stop();
    	$(this).fadeOut(100);
    	clickedSquares++;
    });
    newDivElement.css({
    	top: y,
    	left: x
    });
    newDivElement.appendTo("body");
    newDivElement.animate({
    	top: windowHeight
    }, duration, endGame);
}

$(document).ready(function(){
	$("#gameOver").hide();
    $("#startGame").click(startGame);
    $("#restart").click(restartGame);
});