const apiURL = "http://glacial-hollows-48767.herokuapp.com/"

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
