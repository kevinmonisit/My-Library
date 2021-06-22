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
    updateAndClearBookListDOM();
}

/**
 * Updates the book list in the DOM
 * by recreating the individual entries.
 *
 * This is useful when using sorting the files
 * as the function rebuilds the entire list instead
 * of pushing each entry at the end. However, with extremely
 * long lists, this is not the most efficient way.
 */
function updateAndClearBookListDOM() {
    let index = 0;
    bookList.innerHTML = '';
    myLibrary.forEach((book) => {
        const bookEntry = createBookEntry(book, index);
        const breadCrumb = document.createElement('div');
        breadCrumb.classList.add('entry-breadcrumb');

        bookList.appendChild(breadCrumb);
        bookList.appendChild(bookEntry);

        index++;
    });
}

/**
 * Function is called by an event listener and deletes
 * the element (the book entry) that it is called by.
 * @param {int} index index of book entry in library array
 */
function deleteEntry(index) {
    console.log("clicked");
    myLibrary.splice(index, 1);
    updateAndClearBookListDOM();
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
    const columnNames = ['title', 'author', 'pages', 'status', 'delete-button'];

    columnNames.forEach((name) => {
        const columnElement = document.createElement('div');

        columnElement.classList.add(`${name}-column`);
        columnElement.innerText = bookInfo[name];

        if (name === 'delete-button') {
            columnElement.innerText = '';
            const button = document.createElement('button');
            button.classList.add('delete-button');
            button.innerText = 'X';

            button.addEventListener('click', () => {
                deleteEntry(index);
            });

            columnElement.appendChild(button);
        }

        bookElement.appendChild(columnElement);
    });

    bookElement.classList.add('book-list-entry');

    /**
     * @TODO
     * We don't really need the book-entry-index thing. Remove it when possible.
     */
    const newID = `book-entry-${index}`;
    if (document.getElementById(newID) != undefined) {
        throw Error(`Invalid index ${index}. Already exists.`);
    }

    bookElement.setAttribute('id', newID);

    return bookElement;
}

const onePiece = new Book('One Piece',
                        'Eiichiro Oda',
                        984,
                        'false');

addBookToLibrary(onePiece);

// ======================== ADD BOOK FORM ========================

const input = {
    'author': null,
    'title': null,
    'pages': null,
    'read': null,
    'submit': null,
};

for (const key in input) {
    if ({}.hasOwnProperty.call(input, key)) {
        input[key] = document.getElementById(`${key}-input`);
    }
}

/**
 * Creates a book object by referencing the input fields
 * @return {Book} new book w/ info
 */
function retrieveBookInputInfo() {
    // get all values from input object except last one (submit button)

    // input object values are references to nodes so retrieve
    // its current value
    const bookInfo = Object.values(input).slice(0, -1).map((element) => {
        return element.value;
    });

    return new Book(...bookInfo);
}

/**
 * Clears all input fields
 */
function clearBookInputs() {
   Object.values(input).forEach((element) => {
       element.value = '';
   });
}

input['submit'].addEventListener('click', () => {
    const newBook = retrieveBookInputInfo();
    addBookToLibrary(newBook);
    clearBookInputs();
});
