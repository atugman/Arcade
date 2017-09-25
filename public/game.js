//const apiURL = "http://glacial-hollows-48767.herokuapp.com"
const apiURL = "http://localhost:8080"

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = 0;
var ballRadius = 10;

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 6;
var dy = -6;

var dbx = 10;
var dby = -10;

var dbbx = 5;
var dbby = -5;

var xb = canvas.width / 3;
var yb = canvas.height - 30;

var xz = canvas.width / 1.5;
var yz = canvas.height - 30;

var paddleHeight = 10;
var paddleWidth = 25;

var paddleX = (canvas.width - paddleWidth);
var paddleY = (canvas.height - paddleHeight);

var rightPressed = false;
var leftPressed = false;

var brickHeight = 100;
var brickWidth = 45;
var brickX = (canvas.width - brickWidth) / 480;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", touchDownHandler, false);
document.addEventListener("touchend", touchUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function touchDownHandler(e) {
    if (!e) {
        var e = event;
    }
    e.preventDefault();
    var x = e.targetTouches[0].pageX;
    if (x < canvas.width / 2) {
        leftPressed = true;
    } else {
        rightPressed = true;
    }
}

function touchUpHandler(e) {
    leftPressed = false;
    rightPressed = false;
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#18BC9C";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBall(ballRadius, color, xa, ya) {
    ctx.beginPath();
    ctx.arc(xa, ya, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawBrick() {
    ctx.beginPath();
    ctx.rect(brickX, canvas.height - brickHeight, brickWidth, brickHeight);
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    if (paddleX > brickX && paddleX < brickX + brickWidth) {
        if (brickX == canvas.width - brickWidth) {
            brickX = (canvas.width - brickWidth) / 480;
        } else {
            brickX = (canvas.width - brickWidth);
        }
        score++;
    }
}


function gameOver() {

    var data = {
        name: name,
        score: score,
    }
    $.ajax({
        url: apiURL + "/eraseCurrentScore",
        type: "PATCH",
        data: data,
        success: function(response) {
          $.ajax({
              url: apiURL + "/checkScore",
              type: "GET",
              data: data,
              success: function(data) {
                  var currentHighScore = data.user.score;
                  if (currentHighScore < score) {
                      $.ajax({
                          url: apiURL + "/users/" + score,
                          type: "PATCH",
                          data: data,
                          success: function(response) {

                          }
                      })
                  }
              }
          })
        }
    });
    $('.game-over').html("GAME OVER! Your score was " + score);
    clearInterval(intervalID)
    setTimeout(function(){window.location.reload()}, 2500);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ballRadius, 'red', x, y);
    drawBall(ballRadius, 'blue', xb, yb);
    drawBall(ballRadius, 'green', xz, yz);
    drawPaddle();
    drawBrick();
    drawScore();
    collisionDetection();

    /******************
    BOUNCING BLUE BALL
    ******************/

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > (canvas.height - ballRadius)) {
        //checking if the ball hits the paddle
        if (x > paddleX && x < paddleX + paddleWidth) {
            gameOver();
        } else {
            dy = -dy;
        }
    }

    /*****************
    BOUNCING RED BALL
    *****************/

    if (yb + dby < ballRadius) {
        dby = -dby;
    } else if (yb + dby > (canvas.height - ballRadius)) {
        //checking if the ball hits the paddle
        if (xb > paddleX && xb < paddleX + paddleWidth) {
            gameOver();
        } else {
            dby = -dby;
        }
    }

    /*******************
    BOUNCING GREEN BALL
    *******************/

    if (yz + dbby < ballRadius) {
        dbby = -dbby;
    } else if (yz + dbby > (canvas.height - ballRadius)) {
        //checking if the yellow ball hits the paddle
        if (xz > paddleX && xz < paddleX + paddleWidth) {
            gameOver();
        } else {
            dbby = -dbby;
        }
    }

    /**************
    PADDLE MOVEMENT
    **************/

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    //moving the ball up and down
    y += dy;
    yb += dby;
    yz += dbby;
}
var intervalID = setInterval(draw, 10);

var currentUserScore = 0

// AJAX

$(document).ready(function(response) {
  $('.logout-button').show();

    var data = {
        name: name,
        score: score
    }

    $.ajax({
        url: apiURL + "/userProfile",
        type: "GET",
        success: function(response) {
            var username = response.user.username
            var savedScore = response.user.currentScore
            var html = "<p>Logged in as " + username + "</p>";
            $('.append-logout').append(html);
            $('.logout-button').show();
            $('#saved-score-value').html(savedScore)
            if (savedScore === 0 || undefined) {
              $('button').last().addClass("toggle-load-button")
            }
        }
    })

    $.ajax({
        url: apiURL + "/scores",
        type: "GET",
        data: data,
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].score !== undefined) {
                    var html = "<tr><td class='table-data-score'>" + data[i].score + " </td><td class='table-data-name'>" + data[i].username + '</td></tr>';
                    $('.scores-table').append(html);
                }
            }
        }
    })
});

//can save score without losing progress, or it will save on gameOver

$('.save-score-button').on('submit', function(event) {
    event.preventDefault();

    if (score !== 0 || undefined) {
      $('button').last().removeClass("toggle-load-button")
    }

    var data = {
        name: name,
        score: score
    }

    $.ajax({
        url: apiURL + "/currentScore/" + score,
        type: "PATCH",
        data: data,
        success: function(response) {
            var savedScore = response.currentScore
            var highScore = response.score
            // document.location.reload();

            if (savedScore > highScore) {
                $.ajax({
                    url: apiURL + "/users/" + score,
                    type: "PATCH",
                    data: data,
                    success: function(response) {
                    }
                });
                $.ajax({
                    url: apiURL + "/currentScore/" + score,
                    type: "PATCH",
                    data: data,
                    success: function(response) {
                        var savedScore = response.currentScore
                        var highScore = response.score
                        // swal('You score was saved. Click "Load" at any time to reload your score.', 'Your saved score will become 0 upon losing the game.', "success")
                    }
                });
            };
            // document.location.reload();
        }
    });
    clearInterval(intervalID)
    setTimeout(function(){window.location.reload()}, 2500);
    swal('You score was saved.', 'Click "Load" to reload your score and resume.', "success")
});

// this will allow a user to resume a session with the score they saved it at

$('.load-score-button').on('submit', function(event) {
    event.preventDefault();
    var data = {
        name: name,
        score: score
    }

    $.ajax({
        url: apiURL + "/loadScore",
        type: "GET",
        data: data,
        success: function(response) {
          if (response.currentScore !== 0 || undefined) {
            score = response.currentScore
            drawScore();
            swal("Score loaded!", "Continue playing!", "success")
          }
        }
    })
})


//logout

$('.logout-button').on('click', function(event) {
    $.ajax({
        url: apiURL + "/logout",
        type: "GET",
        success: function(response) {
              window.location = "/"
        }
    })
});

$('.home-button').on('click', function(event) {
    window.location = "/"
});
