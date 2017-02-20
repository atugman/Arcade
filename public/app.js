var MOCK_HIGH_SCORES = {
    "highScores": [
        {
            "id": "1111111",
            "score": 900,
            "userID": "aaaaaa",
            "userName": "John Doe",
            "publishedAt": 1470016976609
        },
        {
            "id": "2222222",
            "score": 800,
            "userID": "bbbbbbb",
            "userName": "Jane Doe",
            "publishedAt": 1470012976609
        },
        {
            "id": "333333",
            "score": 733,
            "userID": "cccc",
            "userName": "Jim Doe",
            "publishedAt": 1470011976609
        },
        {
            "id": "4444444",
            "score": 933,
            "userID": "ddddd",
            "userName": "Jackie Doe",
            "publishedAt": 1470009976609
        }
    ]
}

function getHighScores(callbackFn) {
    setTimeout(function(){ callbackFn(MOCK_HIGH_SCORES)}, 100);
}

// this function stays the same when we connect
// to real API later
function displayHighScores(data) {
    for (index in data.highScores) {
       $('body').append(
        '<p>' + data.highScores[index].score + '</p>');
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