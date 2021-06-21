/* eslint-disable indent */
const myLibrary = [];
const bookList = document.getElementById('book-content');

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
    myLibrary.forEach((book) => {
        const bookEntry = createBookEntry(book, index);
        bookList.appendChild(bookEntry);
        index++;
    });
}

/**
 * Creates a new book element that contains styling
 * for each book entry in the list and its corresponding
 * background information.
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

const onePiece = new Book('Kevin Monisit',
                        'The KevMan Book',
                        21,
                        'false');

addBookToLibrary(onePiece);
updateBookListDOM();

// ======================== ADD BOOK FORM ========================
