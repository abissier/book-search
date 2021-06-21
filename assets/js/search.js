const searchBtn = document.getElementById('search-btn');
const userInput = document.getElementById('book-title');
const bookResults = document.getElementById('book-results');

var buttonEl = document.createElement('button');

searchBtn.addEventListener('click', searchBook);

function searchBook(event) {
	event.preventDefault();
	fetch(`https://www.googleapis.com/books/v1/volumes?q=${userInput.value}`)
		.then((response) => response.json())
		.then((data) => showResults(data));
}

function showResults(data) {
	// console.log(data)
	data.items.map((book) => {
		var bookEl = document.createElement('div');
		var h2El = document.createElement('h2');
        var h5El = document.createElement('h5');
        var pEl = document.createElement('p');

        bookEl.classList.add("book-entry")
		h2El.textContent = book.volumeInfo.title;
        h5El.textContent = book.volumeInfo.authors;
        pEl.textContent = book.volumeInfo.description;

		bookResults.append(bookEl);
		bookEl.appendChild(h2El);
        bookEl.appendChild(h5El);
		bookEl.appendChild(pEl);

	});
}
