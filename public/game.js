var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = 0;
var ballRadius = 10;

var x = canvas.width/2; //green
var y = canvas.height-30; //green/left

var dx = 6; //blue
var dy = -6; //blue/middle

var dbx = 10; //green
var dby = -10; //green

var dbbx = 5; //red
var dbby = -5; //red/right

//var aquaX = 10; //aqua
//var aquaY = -10; //aqua

var xb = canvas.width/3; 
var yb = canvas.height-30;

var xz = canvas.width/1.5; //red
var yz = canvas.height-30; //red

//var xa = canvas.width/1.3; //aqua
//var ya = canvas.height-30; //aqua

var paddleHeight = 10;
var paddleWidth = 25;

var paddleX = (canvas.width-paddleWidth);
var paddleY = (canvas.height-paddleHeight);

var rightPressed = false;
var leftPressed = false;

var brickHeight = 100;
var brickWidth = 45;
var brickX = (canvas.width-brickWidth)/480;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", touchDownHandler, false);
document.addEventListener("touchend", touchUpHandler, false);

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  } else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  } else if(e.keyCode == 37) {
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
  ctx.fillText("Score: "+score, 8, 20);
}

function drawBall(ballRadius , color , xa,ya) {
  ctx.beginPath();
  ctx.arc(xa, ya, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function drawBrick() {
  ctx.beginPath();
  ctx.rect(brickX, canvas.height-brickHeight, brickWidth, brickHeight);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}

function collisionDetection() {
  if(paddleX > brickX && paddleX < brickX +brickWidth) {
    if(brickX == canvas.width-brickWidth) {
      brickX= (canvas.width-brickWidth)/480;
    } else {
      brickX= (canvas.width-brickWidth);
    }
    score++;
  }
}


function gameOver(){
    var data = {
    name: name,
    score: score
  }
        $.ajax({
            url : "http://localhost:8080/current-score", // heroku url
            type: "GET",
            data : data,
            success: function(data) {
              for(var i=0; i<data.length; i++) {
                if (data[i].score < score) {
                  console.log('GET score: ', score);
                  console.log('GET data[i].score: ', data[i].score);
                  $.ajax({
                    url : "http://localhost:8080/users/" + score, // heroku url
                    type: "PATCH",
                    data : data,
                    success: function(response) {
                      console.log('patch working');
                      //for(var i=0; i<data.length; i++) {
                      //var html = "<tr><td class='table-data-score'>" + data[i].score + " </td><td class='table-data-name'>" + data[i].username + '</td></tr>';
                      //$('.scores-table').append(html);
                    //}
                    }
                  })
                }
              }
            }
          })

  var msg = {
    "messageType": "SCORE",
    "score": score
  };

  window.parent.postMessage(msg, "*");
  alert("GAME OVER! Your score was " + score);
  document.location.reload();
}


var message =  {
  messageType: "SETTING",
  options: {
  "width": 500,
  "height": 450
}
};



/*****
CANVAS
*****/

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall(ballRadius , '#18BC9C', x, y);
  drawBall(ballRadius, '#18BC9C', xb, yb);
  drawBall(ballRadius, '#18BC9C', xz, yz);
  //drawBall(ballRadius, 'aqua', xa, yz);
  drawPaddle();
  drawBrick();
  drawScore();
  collisionDetection();

                /******************
                BOUNCING GREEN BALL
                ******************/

  if(y + dy < ballRadius) {
      dy= -dy;
   } else if (y + dy > (canvas.height-ballRadius)) {
      //checking if the ball hits the paddle
      if(x > paddleX && x < paddleX + paddleWidth) {
        gameOver();
      } else {
        dy = -dy;
      }
    }

                /*****************
                BOUNCING BLUE BALL
                *****************/

  if(yb +dby < ballRadius) {
    dby= -dby;
  } else if (yb + dby > (canvas.height-ballRadius)) {
      //checking if the ball hits the paddle
      if(xb > paddleX && xb < paddleX + paddleWidth ) {
        gameOver();
      } else {
        dby = -dby;
      }
    }

                /*******************
                BOUNCING YELLOW BALL
                *******************/
  
  if(yz +dbby < ballRadius) {
    dbby= -dbby;
  } else if (yz + dbby > (canvas.height-ballRadius)) {
      //checking if the yellow ball hits the paddle
      if(xz > paddleX && xz < paddleX + paddleWidth ) {
        gameOver();
      } else {
        dbby = -dbby;
      }
    }

                /*******************************
                BOUNCING AQUA BALL (COMING SOON)
                ********************************
if(ya +aquaY < ballRadius)
{
  aquaY= -aquaY;
}
else if(ya + aquaY > (canvas.height-ballRadius)) {
    //checking if the aqua ball hits the paddle
     if(xa > paddleX && xa < paddleX + paddleWidth ) {
        gameover();
       }
       else
       {
       aquaY = -aquaY;
       }
}
*/

                /**************
                PADDLE MOVEMENT
                **************/

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  //moving the ball up and down
    y += dy;
    yb +=dby;
    yz +=dbby;
    //ya +=aquaY;
}
setInterval(draw, 10);

var currentUserScore = 0

// AJAX
// get and display high scores
$(document).ready(function(){
  var data = {
    name: name,
    score: score
}
        $.ajax({
            url : "http://localhost:8080/scores", // heroku url
            type: "GET",
            data : data,
            success: function(data) {
              for(var i=0; i<data.length; i++) {
                if (data[i].score !== undefined) {
                var html = "<tr><td class='table-data-score'>" + data[i].score + " </td><td class='table-data-name'>" + data[i].username + '</td></tr>';
                $('.scores-table').append(html);
                var currentUserScore = data[i].score;
                console.log('hello ', currentUserScore);
            }
          }
          }
        })
});

console.log('hey ', currentUserScore);


//hides logout button on page load - this is overwritten
//in various functions below
$(document).ready(function() {
  $('.logout-button').hide();
})

//add new user
$('.new-user-form').on('submit', function(event) {
    event.preventDefault()
    var username = event.target.Username.value
    var password = event.target.Password.value
    var firstName = event.target.firstname.value
    var lastName = event.target.lastname.value
    
    console.log('user created');

    var user = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
    }
    //ajax call for adding new users, POST
    $.ajax({
        url : "http://localhost:8080/users", // heroku url
        type: "POST",
        data : user,
        success: function(response) {
          event.preventDefault()
          var html = "<p>" + username + " successfully created. Please log in under 'existing users.'</p>";
          $('.random').append(html);
          $('.new-user-form').hide();
        }
      })
    });



//existing user login form
$('.login-form').on('submit', function(event) {
    event.preventDefault()
    var username = event.target.Username.value
    var password = event.target.Password.value
  

    var user = {
        username: username,
        password: password,
    }

    $.ajax({
        url : "http://localhost:8080/existing", // heroku url
        type: "GET",
        data : user,
        success: function(response) {
          console.log("hey ", response);
            var html = "<p>Login attempt successful</p>";
            var username = response.user.username
            var html2 = "<p>Logged in as " + username + "</p>";
            $('.random').append(html);
            $('.random').append(html2);
            $('.new-user-form').hide();
            $('.login-form').hide();
            $('.logout-button').show();
    }

})
})

//this will show who is logged in on page load
/*
$(document).ready(function(response) {
    $.ajax({
      url : "http://localhost:8080/existing", // heroku url
      type: "GET",
      success: function(response) {
        console.log('hey ', response);
          var username = response.user.username
          var html = "<p>Logged in as " + username + "</p>";
          $('.random').append(html);
          $('.logout-button').show();
          //$('.new-user-form').hide();
          //$('.login-form').hide();
  }
})
})*/

//can save score without losing progress, or it will save on gameOver
$('.save-score-button').on('submit', function(req) {
  event.preventDefault()
  //get username and password into this request
  

        $.ajax({
            url : "http://localhost:8080/existing", // heroku url
            type: "GET",
            data : data,
            success: function(data) {
              for(var i=0; i<data.length; i++) {
                console.log(data);
                  console.log('GET score: ', score);
                  console.log('GET data[i].score: ', data[i].score);

                if (data[i].score < score) {
                  $.ajax({
                    url : "http://localhost:8080/users/" + score, // heroku url
                    type: "PATCH",
                    data : data,
                    success: function(response) {
                      console.log('patch working');
                      //for(var i=0; i<data.length; i++) {
                      //var html = "<tr><td class='table-data-score'>" + data[i].score + " </td><td class='table-data-name'>" + data[i].username + '</td></tr>';
                      //$('.scores-table').append(html);
                    //}
                    }
                  })
                }
              }
            }
          })
      })

/* this will allow a user to resume a session with the score they saved it at
$('.load-score-button').on('submit', function(response) {
    $.ajax({
      url : "http://localhost:8080/scores", // heroku url
      type: "GET",
      success: function(response) {
          var score = response.session.score
          console.log(score);
  }
})
})
*/


//logout functionality

$('.logout-button').on('click', function(event) {
  event.preventDefault()
  $.ajax({
        url : "http://localhost:8080/logout/", // heroku url
        type: "GET",
        success: function(response) {
  }
})
})

//window.location=index.html
//