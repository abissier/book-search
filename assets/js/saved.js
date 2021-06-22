//grab existing html
const bookResults = document.querySelector('.book-results');

document.addEventListener("DOMContentLoaded", getLocalStorageItems)

function getLocalStorageItems() {

//get item from local storage
var book = JSON.parse(localStorage.getItem("book"))
console.log(book);

// create elements
var bookEl = document.createElement('div');
var imgEl = document.createElement("img");
var aEl = document.createElement("a");

//assign local storage values to new elements
bookEl.classList.add("saved-books")
imgEl.src = book.img;
aEl.href = book.link;
aEl.target = "_blank";

// add new elements to page
bookResults.appendChild(aEl);
aEl.appendChild(imgEl)
}