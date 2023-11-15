/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

const createTweetElement = function(tweet) {
  // Convert Unix timestamp to a moment object and format it to a relative time
  const formattedDate = moment(tweet.created_at).fromNow();

  // Create the tweet HTML using template literals
  const tweetHTML = `
    <article class="tweet">
      <header>
        <div class="tweeter">
          <img src="${tweet.user.avatars}" alt="user avatar">
          <span>${tweet.user.name}</span>
        </div>
        <span class="username">${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <footer>
        <span>${formattedDate}</span>
        <div class="tweet-functions">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-repeat"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;

  // Convert the HTML string to a jQuery object and return it
  return $(tweetHTML);
};




// Function definition outside of the document.ready

const renderTweets = function(tweets) {
  // Create an empty jQuery object
  let $allTweets = $();

  tweets.forEach(tweet => {
    // Create a tweet element and add it to the jQuery object
    $allTweets = $allTweets.add(createTweetElement(tweet));
  });

  // Append all tweets to the DOM at once
  $('#tweets-container').append($allTweets);
};


// Document ready block
$(document).ready(function() {
  renderTweets(data); // Call the function when the DOM is ready
});
