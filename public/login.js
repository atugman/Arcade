//const apiURL = "http://glacial-hollows-48767.herokuapp.com"
const apiURL = "http://localhost:8080"

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
        lastName: lastName,
        currentScore: score
    }
    //ajax call for adding new users, POST
    $.ajax({
        url : apiURL + "/users",
        type: "POST",
        data: user,
        success: function(response) {
          if (!(response.hasOwnProperty("message"))) {
            swal("User created!", "Please log in.", "success")
            event.target.Username.value = '';
            event.target.Password.value = '';
            event.target.firstname.value = '';
            event.target.lastname.value = '';
          } else {
            var html = response.message
            sweetAlert("Oops...", html, "error");
        }
        }
      })
    });

//existing user login form
$('.login-form').on('submit', function(event) {
    event.preventDefault()
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
