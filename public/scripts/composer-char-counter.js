$().ready(function() {
  console.log("*~ready~*");
  $('#tweet-text').keyup(function() {
    const currentLength = this.value.length;
    const remainingChars = $(this).siblings(".counter")[0];
    remainingChars.value = 140 - currentLength;
    if (remainingChars.value < 0) {
      $(this).siblings(".counter").addClass("negative");
    } else {
      $(this).siblings(".counter").removeClass("negative");
    }
  });
});
