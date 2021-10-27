var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

// game start
$(document).keypress(function() {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

// user button controls
$(".btn").click(function() {
  var userChosenColor = this.id;

  // user pattern array
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // check answer
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1500);
    }
  } else {
    console.log("wrong");

    // wrong animation
    startOver();
  }
}

//  AI sequence
function nextSequence() {

  // clear user array
  userClickedPattern = [];

  // update level
  level++;
  $("#level-title").html("Level " + level);

  // random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  // AI color
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // button animation and sound
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// user animations
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

// start over
function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;

  playSound("wrong");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 500);

  $("#level-title").text("Game Over, Press Any Key to Restart");
}
