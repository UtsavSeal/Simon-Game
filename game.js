 let buttonColours = ["red", "blue", "green", "yellow"];
 let gamePattern = [];
 let userClickedPattern = [];
 let level = 0; 
let gameStarted = false;

function nextSequence() {
    userClickedPattern = [];
    let randomNum = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    level++;
    $("#level-title").text(`Level ${level}`);
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }

  $(".btn").click(function () { 
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    CheckAnswer(userClickedPattern.length - 1);
  });

function playSound(name) {
    let randomChosenAudio = new Audio(`./sounds/${name}.mp3`);
    randomChosenAudio.play();
  }

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
  }
  
  $(document).on("keydown", function (e) {
    $("#level-title").text(`Level ${level}`);
    if (!gameStarted) {
      nextSequence();
      gameStarted = true;
    }
  });
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
function CheckAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
  }