const searchBtn = document.getElementById('search-btn');
const userInput = document.getElementById('book-title');
const bookResults = document.getElementById('book-results');
const scrollBtn = document.getElementById('scroll-btn');

searchBtn.addEventListener('click', searchBook);
scrollBtn.addEventListener('click', scrollUp);

function searchBook(event) {
	event.preventDefault();
	bookResults.innerHTML = '';
	fetch(`https://www.googleapis.com/books/v1/volumes?q=${userInput.value}`)
		.then((response) => response.json())
		.then((data) => showResults(data));
}

function showResults(data) {
	console.log(data);
	data.items.map((book) => {
		var bookEl = document.createElement('div');
		var h2El = document.createElement('h2');
		var h5El = document.createElement('h5');
		var pEl = document.createElement('p');
		var pictureEl = document.createElement('picture');
		var imgEl = document.createElement('img');
		var asideEl = document.createElement('aside');
		var buttonEl = document.createElement('button');

		bookEl.classList.add('book-entry');
		buttonEl.classList.add('save-btn');

		h2El.textContent = book.volumeInfo.title;
		h5El.textContent = `Written By: ${book.volumeInfo.authors}`;
		pEl.textContent = book.volumeInfo.description;
		imgEl.src = book.volumeInfo.imageLinks.smallThumbnail;
		imgEl.alt = book.volumeInfo.title;
		buttonEl.textContent = 'Favorite';
		buttonEl.dataset.infoLink = book.volumeInfo.infoLink;
		buttonEl.dataset.image = book.volumeInfo.imageLinks.smallThumbnail;
		buttonEl.dataset.title = book.volumeInfo.title;
		buttonEl.dataset.id = book.id;

		bookResults.append(bookEl);
		bookEl.appendChild(pictureEl);
		pictureEl.appendChild(imgEl);

		bookEl.appendChild(asideEl);
		asideEl.appendChild(h2El);
		asideEl.appendChild(h5El);
		asideEl.appendChild(pEl);
		asideEl.appendChild(buttonEl);

		buttonEl.addEventListener('click', saveBook);
	});
}

function saveBook(event) {
	let bookId = event.target.dataset.id;

	var book = {
		title: event.target.dataset.title,
		id: event.target.dataset.id,
		img: event.target.dataset.image,
		link: event.target.dataset.infoLink
	};
	localStorage.setItem(bookId, JSON.stringify(book));
}

function scrollUp() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
