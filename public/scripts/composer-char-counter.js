$().ready(function() {
  console.log("*~ready~*");
  $('#tweet-text').keyup( function(e) {
    const currentLength = this.value.length;
    $(this).siblings(".counter")[0].value = 140 - currentLength;
  })
});
