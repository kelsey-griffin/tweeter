$(document).ready(function() {
  console.log("in client js")
  const createTweetElement = data => {
    const { name, avatars, handle } = data.user;
    const $markup = `
    <article class= "tweet">
      <header>
        <div class="user-info">
          <span class= "avatar"><img src= ${avatars}></span>
          <span class= "name">${name}</span>
        </div>
        <span class= "handle">${handle}</span>
      </header>
      <p class="tweet-content">${data.content}</p>
      <footer>
        <span class= "date-created">Tweeted on: ${Date(data.created_at)}</span>
        <span class="icons">&#127988 &#128257 &#128153</span>
      </footer>
    </article>
    `;
    return $markup;
  }

// const renderTweets = tweets => {
//   for (element of tweets) {
//     const $tweet = createTweetElement(element);
//     $("#tweet-container").append($tweet);
//     console.log(createTweetElement(element));
//   }
// }


// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  // renderTweets(data);
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
}

  const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet);
});