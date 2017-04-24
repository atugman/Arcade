var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = 0;
var ballRadius = 10;

var x = canvas.width/2; //green
var y = canvas.height-30; //green

var dx = 6; //blue
var dy = -6; //blue

var dbx = 10; //green
var dby = -10; //green

var dbbx = 5; //red
var dbby = -5; //red

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

  $.ajax({
        url : "http://localhost:8080/users/" + score, // heroku url
        type: "PATCH",
        success: function(response) {
    }
  })


  var msg = {
    "messageType": "SCORE",
    "score": score
  };
  window.parent.postMessage(msg, "*");
//post request here
//req.session check on this
//set username to whatever logged in user is, via req.session
//send user id back to client, then send that back
  alert("GAME OVER! Your score was " + score);
  document.location.reload();
}
/*
function gameOverA {
  $('.high-scores-form').submit(function(event) { //.save, on click, change score =
      event.preventDefault()
      var name = event.target.name.value
      
      console.log('score sent');

      var data = {
          name: name,
          score: score
      }
      console.log(data);

      $.ajax({
          url : "http://localhost:8080/users", // heroku url
          type: "PUT",
          data : data,
          success: function(response) {
            // return all high scores code here
            // loop over + add to li etc.
            // sort high scores

          }
      });

  })
}
*/

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



// AJAX

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
                data.sort(function(a, b) {
                  return parseFloat(a.score) - parseFloat(b.score);
                });
                var html = "<tr><td class='table-data-score'>" + data[i].score + "</td><td class='table-data-name'>" + data[i].username + '</td></tr>';
                $('.scores-table').append(html);
                //console.log(response);
            }
          }
        })
});


//render function
//passing data from get ajax request
//loop then reutnr li
//game over/post/save score
//return all scores in the post reqest
//save then find the scores
//then client = call function and pass it the data, loop over and update ui

//get request when app scores
//game over function, post request - save score
//server = save score - scores.find instead req.score

//add score to database


/* moved to gameover function
$('.high-scores-form').on('submit', function(event) { //.save, on click, change score =
    event.preventDefault()
    var name = event.target.name.value
    var score = score
    
    console.log('score sent');
    var data = {
        name: name,
        score: score
    }
    console.log(data);
    $.ajax({
        url : "http://localhost:8080/scores", // heroku url
        type: "POST",
        data : data,
        success: function(response) {
          // return all high scores code here
          // loop over + add to li etc.
          // sort high scores
        }
    });
})
*/
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
        //success function will automatically log in
        //newly created user via embedded GET request
        success: function(response) {
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
                  var html = "<p>Logged in as " + username + "</p>";
                  $('.random').append(html);
          }
      })
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
            var html = "<p>Logged in as " + response.user.username + "</p>";
            console.log(user);
            console.log(username);
            $('.random').append(html);
    }

})
})

$('.save-score-button').on('submit', function(event) {
  event.preventDefault()

  $.ajax({
        url : "http://localhost:8080/users/" + score, // heroku url
        type: "PATCH",
        success: function(response) {
    }
  })
})



$('.logout-button').on('click', function(event) {
  event.preventDefault()

  $.ajax({
        url : "http://localhost:8080/logout/", // heroku url
        type: "GET",
        success: function(response) {
          console.log(response);
  }
})
})