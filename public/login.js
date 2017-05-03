const apiURL = "http://glacial-hollows-48767.herokuapp.com/"

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
        url : apiURL + "/users", // heroku url
        type: "POST",
        data : user,
        success: function(response) {
        window.location="/game.html"
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
    //window.location="/game.html"
    var username = event.target.Username.value
    var password = event.target.Password.value
  

    var user = {
        username: username,
        password: password,
    }

    $.ajax({
        url : apiURL + "/existing", // heroku url
        type: "GET",
        data : user,
        success: function(response) {
          window.location="/game.html"
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