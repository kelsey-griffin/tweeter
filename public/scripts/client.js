
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
    $("#tweet-container").append(listOfTweets.join(' '));
  }
  const loadTweets = () => {
    $.ajax({
      url: '/tweets/', 
      method: 'GET',
      dataType: 'json' 
    })   
    .then(response => {
     renderTweets(response);
    }) 
  }
  loadTweets();
  $("#new-tweet-form").on("submit", function(e) {
    e.preventDefault();
    console.log($('#new-tweet-form'))
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize()
    })
    .then(response => {
      console.log("RESPONSE: ");
      console.log(response);
    })
  })
});