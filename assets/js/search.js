const searchBtn = document.getElementById('search-btn');
const userInput = document.getElementById('book-title');
const bookResults = document.getElementById('book-results');

searchBtn.addEventListener('click', searchBook);

function searchBook(event) {
	event.preventDefault();
    bookResults.innerHTML = "";
	fetch(`https://www.googleapis.com/books/v1/volumes?q=${userInput.value}`)
		.then((response) => response.json())
		.then((data) => showResults(data));
}

function showResults(data) {
	console.log(data)
	data.items.map((book) => {
		var bookEl = document.createElement('div');
		var h2El = document.createElement('h2');
        var h5El = document.createElement('h5');
        var pEl = document.createElement('p');
        var imgEl = document.createElement("img");
        var buttonEl = document.createElement('button');

        bookEl.classList.add("book-entry");
        buttonEl.classList.add("save-btn");

		h2El.textContent = book.volumeInfo.title;
        h5El.textContent = `Written By: ${book.volumeInfo.authors}`;
        pEl.textContent = book.volumeInfo.description;
        imgEl.src = book.volumeInfo.imageLinks.smallThumbnail;
        imgEl.alt = book.volumeInfo.title;
        buttonEl.textContent = "Favorite";
        buttonEl.dataset.infoLink = book.volumeInfo.infoLink;
        buttonEl.dataset.image = book.volumeInfo.imageLinks.smallThumbnail

		bookResults.append(bookEl);
		bookEl.appendChild(h2El);
        bookEl.appendChild(h5El);
		bookEl.appendChild(pEl);
        bookEl.appendChild(imgEl);
        bookEl.appendChild(buttonEl);

        buttonEl.addEventListener("click", saveBook);
	});
}

function saveBook(event){
    localStorage.setItem(event.target.dataset.infoLink, event.target.dataset.image)
}
