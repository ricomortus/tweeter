/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
  // Convert Unix timestamp to a relative time string
  const formattedDate = timeago.format(new Date(tweet.created_at));

  // Create the tweet element using jQuery
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="tweeter">
          <img src="" alt="user avatar">
          <span class="user-name"></span>
        </div>
        <span class="username"></span>
      </header>
      <p class="tweet-content"></p>
      <footer>
        <span class="tweet-date">${formattedDate}</span>
        <div class="tweet-functions">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-sharp fa-solid fa-repeat"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);

  // Set the contents safely using .text() or .attr() to prevent XSS
  $tweet.find('.tweeter img').attr('src', tweet.user.avatars);
  $tweet.find('.user-name').text(tweet.user.name);
  $tweet.find('.username').text(tweet.user.handle);
  $tweet.find('.tweet-content').text(tweet.content.text);

  return $tweet;
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
  //hide error box
  $('.error-box').hide();
  //Targets the #new-tweet-form in index.html and adds an event listener on submit.
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault();
    const tweetText = $(this).find('textarea').val().trim();
    const maxTweetChar = 140;

    // Hide the error message at the beginning of form submission
    $('.error-box').slideUp();

    // Check if the tweet is empty
    if (tweetText === "" || tweetText === null) {
      $('.error-box .error-message').text('Please enter some characters to post a tweet!');
      $('.error-box').slideDown();
      return;
    }

    // Check if the tweet length is over the maximum character limit
    if (tweetText.length > maxTweetChar) {
      $('.error-box .error-message').text(`You are ${tweetText.length - maxTweetChar} characters over.`);
      $('.error-box').slideDown();
      return;
    }
    
    //Serialize the form to extract the string value, instead of the html tags
    const formData = $(this).serialize();
    console.log("Client side received serialized tweet:", formData);
    
    //READ THROUGH THIS CODE AGAIN
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

