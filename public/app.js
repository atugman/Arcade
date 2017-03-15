




function getHighScores(callbackFn) {
    setTimeout(function(){ callbackFn(arcade)}, 100);
}

function displayHighScores(data) {
    for (index in data.arcade) {
       $('.high-scores-column').append(
        '<li>' + data.arcade[index].score + '</li>');
    }
}

function getAndDisplayHighScores() {
    getHighScores(displayHighScores);
}

$(function() {
    getAndDisplayHighScores();

/*

    
    var submitScore = function(score, callback) {
        $.post("http://localhost:8080/submitScore", {score:score}, function(data) {
            if(!data) {
                console.log("Server Communication Error");
                callback && callback(false);
                return;
            }
            if(data.error) {
                console.log("Server Error: " + data.error);
                callback && callback(false);
                return;
            }
            callback && callback(true);
        });
    }
    
    var getScores = function(callback) {
        $.post("http://localhost:8080/highScores", null, function(data) {
            if(!data) {
                console.log("Server Communication Error");
                callback && callback(false);
                return;
            }
            if(data.error) {
                console.log("Server Error: " + data.error);
                callback && callback(false);
                return;
            }
            //callback && callback(data.scores);
            function displayData(data) {
                for(var i=0; i<data.length; i++) {
                    var html = '<li>' + data[i].scores + '</li>';
                    $('.high-scores-column').append(html);
                    console.log(data);
                }   
            }
        });
    };
};

*/



/* 



//material design
$.material.init();



// third party api
$('.other-games-column').click(function(){

  $.getJSON(`GEThttps://igdbcom-internet-game-database-v1.p.mashape.com/games/`, function( response ) {
    console.log(displayData(response.data));
}
);

function displayData(data) {
    for(var i=0; i<data.length; i++) {
      var html = '<li>' + data[i].name + '</li>';
      $('.other-games-column').append(html);
      console.log(data);
    }
  }
});
*/