$(document).ready(function () {
  // let value = 0;
  $("#count").keyup(function (event) {
    let textLength = $(this).val().length;
    $("#countNum").text(140 - textLength);

    if (textLength > 140) {
      $("#countNum").css("color", "red");
    } else {
      $("#countNum").css("color", "gray")
    }
  });
});
