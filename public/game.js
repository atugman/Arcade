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
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawBall(radius , color , xa,ya) {
  ctx.beginPath();
  ctx.arc(xa, ya, radius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = 'orange';
  ctx.fill();
  ctx.closePath();
}

function drawBrick() {
  ctx.beginPath();
  ctx.rect(brickX, canvas.height-brickHeight, brickWidth, brickHeight);
  ctx.fillStyle = 'black';
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
  var msg = {
    "messageType": "SCORE",
    "score": score
  };
  window.parent.postMessage(msg, "*");

  alert("GAME OVER");
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
  drawBall(ballRadius , 'blue', x,y);
  drawBall(ballRadius, 'green',xb,yb);
  drawBall(ballRadius, 'red', xz, yz);
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
                var html = "<tr><td class='table-data-score'>" + data[i].score + "</td><td class='table-data-name'>" + data[i].name + '</td></tr>';
                $('.scores-table').append(html);
                //$('high-scores-form').reload().on('submit')
                console.log(data);
                //console.log(response);
            }
          }
        })
});



//add score to database
$('.high-scores-form').on('submit', function(event) {
    event.preventDefault()
    var name = event.target.name.value
    var score = event.target.score.value
    
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
          console.log(response);
        }
    });

})
/*
function render() {
  $('.high-scores-form').hide();
  for (var i = 0; i < data[i].length; i++) {
    $('.scores-table').append(data)[i]
  }
  $('.scores-table').text(data[i]);
  for (var i = 0; i < data[i].length; i++) {
                var html = "<tr><td class='table-data-score'>" + data[i].score + "</td><td class='table-data-name'>" + data[i].name + '</td></tr>';
                $('.scores-table').append(html);
  data.show();
}

*/
$('.login-form').on('submit', function(event) {
    event.preventDefault()
    var username = event.target.username.value
    var password = event.target.password.value
    var firstName = event.target.firstName.value
    var lastName = event.target.lastName.value
    
    console.log('user created');

    var user = {
        username: Username,
        password: Password,
        firstName: "First Name", // "First Name" ?
        lastName: lastName
    }
    //console.log(user);
    //console.log(data);
    //console.log(response);
    //console.log(event);
    console.log(firstName);

    $.ajax({
        url : "http://localhost:8080/users/", // heroku url
        type: "POST",
        user : user,
        success: function(response) {

          console.log(response);
        }
    });

})

