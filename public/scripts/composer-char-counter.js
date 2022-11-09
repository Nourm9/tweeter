$(document).ready(function () {
  // let value = 0;
  $("#count").keyup(function (event) {
    $("#countNum").text(140 - $(this).val().length);
  });
});
