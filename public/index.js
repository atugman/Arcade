$('.start-game').on('click', function(event) {
      window.location="/login-page.html"
    });


$(document).ready(function(response) {
  $.ajax({
    url : "http://localhost:8080/",
    type: "GET",
    success: function(response) {
      console.log('/ worked');
    }
  })
})