/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//temporary object data

let usrObj = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  };

//create new tweet function
const createTweetElement = function (obj) {
  const date = new Date(obj.created_at);
  const formattedDate = date.toLocaleString();

  return `
    <article class="tweet">
    <header>
      <div class="tweeter">
       <img src=${obj.user.avatars} alt="user avatar">
        <span>${obj.user.name}</span>
      </div>
      <span class="username">${obj.user.handle}</span>
    </header>

    <p>
      ${obj.content.text}
    </p>
    
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
};

const $tweet = createTweetElement(usrObj);

$(document).ready(function() {
  $('#tweets-container').append($tweet);
});