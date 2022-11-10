/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $(".tweet-form").on("submit", onSubmit);
  loadTweets();
});

const onSubmit = function (event) {
  event.preventDefault();
  const textValue = $("#count").val();
  const formData = $(this).serialize();

  console.log($("#count"));
  if (textValue === null || textValue === "") {
    console.log("please input text");
    return alert("please input text");
  }

  if (textValue.length > 140) {
    console.log("too many char");
    return alert("You have too many characters");
  }
 
  $.ajax({
    type: "POST",
    url: "/tweets",
    data: formData,
  }).then(() => {
    loadTweets();
console.log("success");
  // $.ajax({
  //   type: "GET",
  //   url: "http://localhost:8080/",
  //   data: "json",
  //   success: function(response) {
  //     console.log("success")
  //   }
  // });
})
  
};


const createTweetElement = (data) => {
  const $tweet = $(`
     <article class = "tweet-article">
    <header class="tweet-header"> 
    <div class="tweet-name-img"> 
      <span class="tweet-avatar"><img src="${data.user.avatars}" alt=""></span>
      <span class="tweet-name">${data.user.name}</span>
    </div>
      <span class="tweet-handle">${data.user.handle}</span>
    </header>
    <p class="text-field">${data.content.text}</p>
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

  for (let tweet of tweets) {
    const element = createTweetElement(tweet);
    $(".tweet-container").append(element);
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
      $(".text-field").empty();
      renderTweets(data);
    })
  };





  // const tweetData = {
  //   user: {
  //     name: "Newton",
  //     avatars: "https://i.imgur.com/73hZDYK.png",
  //     handle: "@SirIsaac",
  //   },
  //   content: {
  //     text: "If I have seen further it is by standing on the shoulders of giants",
  //   },
  //   created_at: 1461116232227,
  // };