function getHighScores(callbackFn) {
    setTimeout(function(){ callbackFn(arcade)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayHighScores(data) {
    for (index in data.arcade) {
       $('high-scores-column').append(
        '<li>' + data.arcade[index].score + '</li>');
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayHighScores() {
    getHighScores(displayHighScores);
}

$(function() {
    getAndDisplayHighScores();
})

$.material.init();



//  api
$('other-games-column').click(function(){

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