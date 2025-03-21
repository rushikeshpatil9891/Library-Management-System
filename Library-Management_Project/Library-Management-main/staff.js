// Retrieve or initialize data from local storage
let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

document.getElementById('add-book-btn').addEventListener('click', function() {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const isbn = document.getElementById('book-isbn').value;
    const quantity = parseInt(document.getElementById('book-quantity').value);
    const department = document.getElementById('book-department').value;

    if (title && author && isbn && quantity && department) {
        const existingBook = bookCollection.find(book => book.isbn === isbn);
        if (existingBook) {
            existingBook.quantity += quantity;
        } else {
            bookCollection.push({ title, author, isbn, quantity, department });
        }

        localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
        updateBookList();

        // Reset form
        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
        document.getElementById('book-isbn').value = '';
        document.getElementById('book-quantity').value = '';
        document.getElementById('book-department').value = '';
    } else {
        alert('Please fill in all fields.');
    }
});

function updateBookList() {
    const bookList = document.getElementById('book-list').getElementsByTagName('tbody')[0];
    bookList.innerHTML = '';

    bookCollection.forEach(book => {
        const row = bookList.insertRow();
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.quantity}</td>
            <td>
                <button onclick="editBook('${book.isbn}')">Edit</button>
                <button onclick="deleteBook('${book.isbn}')">Delete</button>
            </td>
        `;
    });
}

function editBook(isbn) {
    const book = bookCollection.find(book => book.isbn === isbn);
    if (book) {
        document.getElementById('book-title').value = book.title;
        document.getElementById('book-author').value = book.author;
        document.getElementById('book-isbn').value = book.isbn;
        document.getElementById('book-quantity').value = book.quantity;
        document.getElementById('book-department').value = book.department;
    }
}

function deleteBook(isbn) {
    bookCollection = bookCollection.filter(book => book.isbn !== isbn);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
    updateBookList();
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    updateBookList();
});
