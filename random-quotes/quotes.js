let button = document.getElementById("btn");

const url = "https://api.quotable.io/random";

const getQuote = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let text = document.getElementById("text");
      let author = document.getElementById("author");

      if (text && author) {
        text.innerText = data?.content;
        author.innerText = data?.author;
      }
    });
};

window.addEventListener("load", getQuote);

button.addEventListener("click", getQuote);

let currentQuote = text.innerText;
let currentAuthor = author.innerText;

$("#tweet-quote").attr(
  "href",
  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
    encodeURIComponent("" + currentQuote + "" + currentAuthor + "")
);
