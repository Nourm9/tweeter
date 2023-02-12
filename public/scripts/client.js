/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  //page can't be manipulated until the document is ready.
  $(".tweet-form").on("submit", onSubmit);
  loadTweets();
});

const onSubmit = function (event) {
  event.preventDefault();
  const textValue = $("#count").val();
  const formData = $(this).serialize();
  const errorMssg1 = "There are no characters, please write in the tweet box.";
  const errorMssg2 =
    "You wrote too much. Please keep your characters under 140.";

  console.log($("#count"));
  if (textValue === null || textValue === "") {
    $(".error")
      .html(
        `<p><i class="fa-solid fa-triangle-exclamation"></i>${errorMssg1}<i class="fa-solid fa-triangle-exclamation"></i></p>`
      )
      .show();
  } else if (textValue.length > 140) {
    $(".error")
      .html(
        `<p><i class="fa-solid fa-triangle-exclamation"></i>${errorMssg2}<i class="fa-solid fa-triangle-exclamation"></i></p>`
      )
      .show();
    
  } else {
    $.ajax({
    type: "POST",
    url: "/tweets",
    data: formData,
  }).then(() => {
    loadTweets();
   $(".tweet-form")[0].reset();//resets text-form after loading tweets
   $("#countNum").val(140);  // resets count
  });
  }

  
};

const createTweetElement = (data) => {
  // XSS implementation
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const safeHTML = `<p>${escape(data.content.text)}</p>`;
  // generates tweet data for outputed tweets section
  const $tweet = $(`
     <article class = "tweet-article">
    <header class="tweet-header"> 
    <div class="tweet-name-img"> 
      <span class="tweet-avatar"><img src="${data.user.avatars}" alt=""></span>
      <span class="tweet-name">${data.user.name}</span>
    </div>
      <span class="tweet-handle">${data.user.handle}</span>
    </header>
    <p class="text-field">${safeHTML}</p>
  <footer class="tweet-footer">
    <span class="tweet-date">${data.user.created_at}</span> 
    <span>
      <button><i class="fa-solid fa-flag"></i> </button>
      <button><i class="fa-solid fa-retweet"></i></button>
      <button><i class="fa-solid fa-heart"></i></button>
       </span>
  </footer>
  </article>
    `);
  return $tweet;
};

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const textValue = $("#count").val();
  for (let tweet of tweets) {
    if (textValue <= 140) {
         const element = createTweetElement(tweet);
    $(".tweet-container").prepend(element);
   }
   
  }
};

const loadTweets = () => {
  $.ajax({
    type: "GET",
    url: "/tweets",
    data: JSON,
  }).then((data) => {
    // it will remove the tweet container object elements and before rendwering new tweets
    $(".tweet-article").remove();

    renderTweets(data);
  });
};
