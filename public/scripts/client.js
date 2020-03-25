
$(document).ready(function() {
  const createTweetElement = data => {
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
    <p class="tweet-content">${text}</p>
    <footer>
    <span class= "date-created">Tweeted on: ${date}</span>
    <span class="icons">&#127988 &#128257 &#128153</span>
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
    if ($('#tweet-text').val()) {
      if ($('#tweet-text').val().length <= 140) {
        // console.log(loadTweets())
        $.ajax({
          url: '/tweets/',
          type: 'POST',
          data: $(this).serialize(),
          complete: () => {
            // console.log("success form")
            loadTweets();
          }
        })
      } else {
        alert("You've lot a lot to say!\nTweet must be less than or equal to 140 characters.")
      }
    } else {
      alert("Cat got your tongue?\nEmpty tweets are not posted.")
    }
  })
});