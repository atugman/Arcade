const apiURL = "http://glacial-hollows-48767.herokuapp.com"

$('.new-user-form').on('submit', function(event) {
    event.preventDefault()
    var username = event.target.Username.value
    var password = event.target.Password.value
    var score = 0;
    var firstName = event.target.firstname.value
    var lastName = event.target.lastname.value

    var user = {
        username: username,
        password: password,
        score: score,
        firstName: firstName,
        lastName: lastName
    }
    //ajax call for adding new users, POST
    $.ajax({
        url : apiURL + "/users",
        type: "POST",
        data: user,
        success: function(response) {
          console.log('response from server ', response);
          if (!(response.hasOwnProperty("message"))) {
            var html = '<p>User created, please log in</p>'
            $('.below-create-button').append(html);
          } else {
            var html = response.message
            $('.below-create-button').append(html);
        }
        }
      })
    });


    // var html = response.message
    // $('.below-create-button').append(html);
//existing user login form
$('.login-form').on('submit', function(event) {
    event.preventDefault()
    //window.location="/game.html"
    var username = event.target.Username.value
    var password = event.target.Password.value

    var settings = {
        url: apiURL + '/login',
        method: "GET",
        headers: {
          'content-type': "application/json",
          authorization: "Basic " + btoa(username + ':' + password)
        }
      };

      $.ajax(settings).done(function (response) {
        var html = response.message
        $('.below-login-button').append(html);
      location.href = '/game.html';
      });
})
