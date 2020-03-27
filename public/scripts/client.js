$(document).ready(function() {
  
  //use form data to build tweet element 
  const createTweetElement = data => {
    //safeguard agains XSS, escape userEnteredText
    const escape =  function(str) {
      let p = document.createElement('p');
      p.appendChild(document.createTextNode(str));
      return p.innerHTML;
    }
    const { name, avatars, handle } = data.user;
    const text = data.content.text;
    const fullDate = new Date(data.created_at);
    const date = (fullDate.getUTCMonth() + 1) + "/" + fullDate.getUTCDate() + "/" + fullDate.getFullYear();
    
    //framework for each tweet in tweet list
    const $markup = `
      <article class= "tweet">
        <header>
          <div class="user-info">
            <span class= "avatar"><img src= ${avatars}></span>
            <span class= "name">${name}</span>
          </div>
          <span class= "handle">${handle}</span>
        </header>
        <p class="tweet-content">${escape(text)}</p>
        <footer>
          <span class= "date-created">Tweeted on: ${date}</span>
          <span class="icons">⚑ ⟲ ♥︎</span>
        </footer>
      </article>
      `;
    return $markup;
  }
  //make a list of tweets (newest to oldest), append to tweet container
  const renderTweets = tweets => {
    const listOfTweets = [];
    for (element of tweets) {
      listOfTweets.push(createTweetElement(element));
    }
    $('#tweet-container').empty();
    $("#tweet-container").append(listOfTweets.reverse().join(' '));
  }
  //ajax get request for list of tweets
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/', 
      method: 'GET',
      dataType: 'json',
      success: response => {
        renderTweets(response);
      } 
    })
  }
  //call loadTweets
  loadTweets();
  
  //button to reveal hidden new-tweet element or vice versa
  $(".compose-tweet").click(function() {
    if ($(".new-tweet").hasClass("#show")) {
      $(".new-tweet").removeClass("#show").slideUp('slow');
    } else {
      $(".new-tweet").addClass("#show").slideDown('slow');
      $("#new-tweet-form textarea").focus();
    }
  })
    
  //when form is submitted, validate tweet and either load or send error
  $("#new-tweet-form").on("submit", function(e) {
    e.preventDefault();
    $('#message-box').removeClass('#error');
    const checkTweetValidity = () => {
      const length = $('#tweet-text').val().length;
      //if tweet is too long, reject
      if (length > 140) {
        $('#message-box')[0].innerText = "🚩  You've lot a lot to say!\nTweet must be less than or equal to 140 characters.";
        $('#message-box').addClass('#error').slideDown('slow').delay(1500).slideUp('slow');
        return false;
      //if tweet is empty, reject
      } else if (length === 0) {
        $('#message-box')[0].innerText = "🚩  Cat got your tongue? Empty tweets are not posted.";
        $('#message-box').addClass('#error').slideDown('slow').delay(1500).slideUp('slow');
        return false;
      
      } else return true;
    }
    if (checkTweetValidity()) {
      $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: $(this).serialize(),
        complete: () => {
          loadTweets();
        }
      })
      //on successful tweet submission, clean textbox for next tweet
      $('#tweet-text').val('');
    }
  })
});