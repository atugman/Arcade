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
        lastName: lastName
    }
    //ajax call for adding new users, POST
    $.ajax({
        url : apiURL + "/users",
        type: "POST",
        data : user,
        success: function(response) {
        //window.location="/game.html"
        var html = "<p>User created. Please log in.</p>"
        $('.below-create-button').append(html);
        }
      })
    });



//existing user login form
$('.login-form').on('submit', function(event) {
    event.preventDefault()
    //window.location="/game.html"
    var username = event.target.Username.value
    var password = event.target.Password.value


    var user = {
        username: username,
        password: password,
    }

    $.ajax({
        url : apiURL + "/existing",
        type: "GET",
        data : user,
        success: function(response) {
          window.location="/game.html"
    }

})
})
