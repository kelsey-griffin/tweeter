$(document).ready(function() {

  const createTweetElement = data => {

    const escape =  function(str) {
      let p = document.createElement('p');
      p.appendChild(document.createTextNode(str));
      return p.innerHTML;
    }

    const { name, avatars, handle } = data.user;
    const text = data.content.text;
    const fullDate = new Date(data.created_at);
    const date = (fullDate.getUTCMonth() + 1) + "/" + fullDate.getUTCDate() + "/" + fullDate.getFullYear();
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
  
  const renderTweets = tweets => {
    const listOfTweets = [];
    for (element of tweets) {
      listOfTweets.push(createTweetElement(element));
    }
    $('#tweet-container').empty();
    $("#tweet-container").append(listOfTweets.reverse().join(' '));
  }
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/', 
      method: 'GET',
      dataType: 'json',
      success: response => {
        renderTweets(response);
        console.log("in load tweets")
      } 
    })
  }
  loadTweets();
  $("#new-tweet-form").on("submit", function(e) {
    e.preventDefault();
    const checkTweetValidity = () => {
      const length = $('#tweet-text').val().length;
      console.log($('section.error-msg')[0].innerText)
      $('#error-msg').removeClass('error').slideDown(300);
      if (length > 140) {
        $('#error-msg').addClass('error');
        $('section.error-msg')[0].innerText = "You've lot a lot to say!\nTweet must be less than or equal to 140 characters.";
        return false;
        
      } else if (length === 0) {
        $('#error-msg').addClass('error');
        $('section.error-msg')[0].innerText = "Cat got your tongue? Empty tweets are not posted.";
        return false;
      
      } else return true;
    }
    console.log(checkTweetValidity())
    if (checkTweetValidity()) {
      $.ajax({
        url: '/tweets/',
        type: 'POST',
        data: $(this).serialize(),
        complete: () => {
          // console.log("success form")
          loadTweets();
        }
      })
    }
  })
});