$().ready(function() {
  console.log("*~ready~*");
  $('#tweet-text').keyup( function(e) {
    const currentLength = this.value.length;
    $(this).siblings(".counter")[0].value = 140 - currentLength;
    if ($(this).siblings(".counter")[0].value < 0) {
      $(this).siblings(".counter").addClass("negative");
    } else {
      $(this).siblings(".counter").removeClass("negative");
    }
  })
});
