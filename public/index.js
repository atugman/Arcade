const apiURL = "http://localhost:8080"

$('.start-game').on('click', function(event) {
      window.location="/login-page.html"
    });


$(document).ready(function(response) {
  $.ajax({
    url : apiURL,
    type: "GET",
    success: function(response) {
      console.log('/ worked');
    }
  })
})