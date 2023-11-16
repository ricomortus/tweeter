/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  // Convert Unix timestamp to a moment object and format it to a relative time
  const formattedDate = timeago.format(new Date(tweet.created_at));

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


$(document).ready(function() {
  //Targets the #new-tweet-form in index.html and adds an event listener on submit.
  $('#new-tweet-form').submit(function(event) {
    //prevent the default behaviour of the submit button; prevents reloading of the page
    event.preventDefault();
    //Extract the text content from the form
    const tweetText = $(this).find('textarea').val().trim();
    const maxTweetChar = 140;

    //Alert user if their tweet is empty
    if (tweetText === "" || tweetText === null) {
      alert('Please enter some characters to post a tweet!');
      return;
    }
    
    //Alert user if tweet length is over the maximum character.
    if (tweetText.length > maxTweetChar) {
      alert(`You are ${tweetText.length - maxTweetChar} characters over.`);
      return;
    }
    
    //Serialize the form to extract the string value, instead of the html tags
    const formData = $(this).serialize();
    console.log("Client side received serialized tweet:", formData);
    //
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: formData,
      success: function(newTweet) {
        // Prepend the new tweet
        $('#tweets-container').prepend(createTweetElement(newTweet));
        // Optionally clear the form
        $('#new-tweet-form').find('textarea').val('');
      },
      error: function(error) {
        console.error('Error posting tweet:', error);
      }
    });
  });

  //Define loadTweets function to fetch tweets from /tweets page using jquery
  const loadTweets = function() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(error) {
        console.log('Error fetching tweets:', error);
      }
    });
  };
  loadTweets();
});

