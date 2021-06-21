/* eslint-disable indent */
let myLibrary = [];

/**
 *
 * Book constructor
 *
 * @param {string} author
 * @param {string} title
 * @param {int} pages number of pages in the book
 * @param {boolean} read whether the book has been read or not
 */
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

/**
 * Adds book to library array.
 * @param {Book} book book object to add to library
 */
function addBookToLibrary(book) {
    myLibrary.push(book);
}

/**
 * Updates the book list in the DOM
 * by recreating the individual entries.
 */
function updateBookListDOM() {
    let index = 0;
    myLibrary.forEach(() => {
        const bookEntry = document.createElement('div');

        bookEntry.classList.toggle('.book-list-entry');
        bookEntry.setAttribute('id', `book-entry-${index}`);

    });
}

/**
 * Creates a book node/entry/element with specific styling
 * that can be added to a container of books
 * @param {Book} bookInfo book information
 * @param {number} index an id-number to identify a book entry
 * @return {Element} newBookEntry returns new entry for the book list
 */
function createBookEntry(bookInfo, index) {
    const bookElement = document.createElement('div');

    const columnNames = ['title', 'author', 'pages', 'status'];

    columnNames.forEach((name) => {
        const columnElement = document.createElement('div');

        columnElement.classList.add(`${name}-column`);
        columnElement.innerText = bookInfo[name];

        bookElement.appendChild(columnElement);
    });

    bookElement.classList.add('book-list-entry');

    const newID = `book-entry-${index}`;

    if (document.getElementById(newID) != undefined) {
        throw Error(`Invalid index ${index}. Already exists.`);
    }

    bookElement.setAttribute('id', newID);

    return bookElement;
}

const bookContent = document.getElementById("book-content");
bookContent.appendChild(createBookEntry(new Book("Eiichiro Oda", "One Piece", 21, false), 5));
bookContent.appendChild(createBookEntry(new Book("Eiichiro Oda", "One Piece", 21, false), 2));

bookContent.appendChild(createBookEntry(new Book("Eiichiro Oda", "One Piece", 21, false), 3));
bookContent.appendChild(createBookEntry(new Book("Eiichiro Oda", "One Piece", 21, false), 4));
