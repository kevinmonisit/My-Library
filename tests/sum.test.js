/* eslint-disable indent */
const sum = require('../main.js');

test('Create a book object', () => {
    const bookEntry = new Book(
        'Person',
        'Title',
        21,
        false);

    expect(bookEntry.author).toBe('Person');
    expect(bookEntry.title).toBe('Title');
    expect(bookEntry.pages).toBe(21);
    expect(bookEntry.read).toBe(false);
});


test('')