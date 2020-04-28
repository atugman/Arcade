//const apiURL = "http://glacial-hollows-48767.herokuapp.com"
//const apiURL = "http://localhost:8080"
const apiURL = "https://andrewsarcade.azurewebsites.net"

$('.start-game').on('click', function(event) {
      window.location="/login-page.html"
    });


$(document).ready(function(response) {
  $.ajax({
    url : apiURL,
    type: "GET",
    success: function(response) {
      console.log('/');
    }
  })
})

swal({
  title: "Error!",
  text: "Here's my error message!",
  type: "error",
  confirmButtonText: "Cool"
});
