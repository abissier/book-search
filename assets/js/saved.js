//grab existing html
const bookResults = document.querySelector('.book-results');
const scrollBtn = document.getElementById('scroll-btn');

document.addEventListener('DOMContentLoaded', getLocalStorageItems);
scrollBtn.addEventListener('click', scrollUp);

function getLocalStorageItems() {
	for (var i = 0; i < localStorage.length; i++) {
		//get item from local storage
		var book = JSON.parse(localStorage.getItem(localStorage.key(i)));

		// create elements
		var bookEl = document.createElement('div');
		var imgEl = document.createElement('img');
		var aEl = document.createElement('a');
        var btnEl = document.createElement("button");

		//assign local storage values to new elements
		bookEl.classList.add('saved-book');
        btnEl.classList.add("delete-btn")
		imgEl.src = book.img;
        imgEl.alt = book.title;
		aEl.href = book.link;
		aEl.target = '_blank';
        btnEl.innerText = "X";
        btnEl.dataset.id = book.id;

		// add new elements to page
        bookResults.appendChild(bookEl)
		bookEl.appendChild(aEl);
		aEl.appendChild(imgEl);
        bookEl.appendChild(btnEl);

        // add event listener to button
        btnEl.addEventListener("click", handleDelete)
	}
}

function handleDelete(event){
    localStorage.removeItem(event.target.dataset.id);
    location.reload();
}

function scrollUp() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}