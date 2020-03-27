$().ready(function() {
  
  //update output to show number of characters remaining in tweet
  $('#tweet-text').keyup(function() {
    
    const currentLength = this.value.length;
    const remainingChars = $(this).siblings(".counter")[0];
    
    remainingChars.value = 140 - currentLength;
    
    if (remainingChars.value < 0) {
      $(this).siblings(".counter").addClass("negative");
    } else {
      $(this).siblings(".counter").removeClass("negative");
    }

    //change height of the textarea to fit tweet as user types
    $(this).height(0).height(this.scrollHeight);

  });
});
