var arr = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstKeyPressed = false;
var currentLevel = 0;
var currentInd = 0;
function nextSequence() {
    currentLevel++;
    $("#level-title").text("Level " + currentLevel);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = arr[randomNumber];
    console.log("Before -> " + gamePattern);
    gamePattern.push(randomChosenColour);
    console.log("After -> " + gamePattern);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

$(".btn").on("click", function (event) {
    if (firstKeyPressed) {
        var userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer();
    }
})

$(document).on("keydown", function () {
    if (!firstKeyPressed) {
        firstKeyPressed = true;
        nextSequence();
    }
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    if (userClickedPattern[currentInd] == gamePattern[currentInd]) {
        currentInd++;
        if (currentInd == currentLevel) {
            userClickedPattern = [];
            currentInd = 0;
            nextSequence();
        }
    } else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        currentInd = 0;
        currentLevel = 0;
        firstKeyPressed = false;
        gamePattern = [];
        userClickedPattern = [];
    }
}