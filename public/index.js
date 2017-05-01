$('.start-game').on('click', function(event) {
  $.ajax({
    url : "http://localhost:8080/existing",
    type: "GET",
    success: function(response) {
      window.location="/login-page.html"
    }
  })
})

$(document).ready(function(response) {
    $.ajax({
      url : "http://localhost:8080/existing", // heroku url
      type: "GET",
      success: function(response) {
        console.log('response: ', response);
          var username = response.user.username
          var html = "<p>Logged in as " + username + "</p>";
          $('.random').append(html);
          //$('.logout-button').show();
          //$('.new-user-form').hide();
          //$('.login-form').hide();
  }
})
})