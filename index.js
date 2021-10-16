var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

// game start
$(document).keypress(function() {
  if (!gameStart) {
    // $("#level-title").html("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

// user button controls
$(".btn").click(function() {
  var userChosenColor = this.id;

  // user Pattern array
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(level);

});

//  game functionality
function nextSequence() {
  // update level
  level++;
  $("#level-title").html("Level " + level);

  // clear user array
  userClickedPattern = [];

  // random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);

  // game color
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // button animation and sound
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  console.log("gamePattern: " + gamePattern);
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  var usrArrLen = userClickedPattern.length;

  console.log("CheckAns   " + "   usrArrLen - currentLevel: " + (usrArrLen - currentLevel) + "   gPat: " + gamePattern + "    uCP: " + userClickedPattern);

  if (gamePattern[currentLevel - usrArrLen] === userClickedPattern[currentLevel - usrArrLen]) {
    console.log("success   " + "   usrArrLen - currentLevel: " + (usrArrLen - currentLevel) + "   gPat: " + gamePattern + "    uCP: " + userClickedPattern);
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1500);
    }

  } else {
    console.log("wrong   " + "   usrArrLen - currentLevel: " + (usrArrLen - currentLevel) + "   gPat: " + gamePattern + "    uCP: " + userClickedPattern);


    // wrong animation
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 500);

    $("#level-title").html("Game Over, Press Any Key to Restart");
  }
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
