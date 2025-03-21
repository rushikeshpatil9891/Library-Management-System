let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

document.getElementById('search-books-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-term').value.toLowerCase();
    const filteredBooks = bookCollection.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) ||
        book.isbn.includes(searchTerm)
    );
    displayBooks(filteredBooks);
});

document.getElementById('suggest-books-btn').addEventListener('click', function() {
    const department = document.getElementById('department').value.toLowerCase();
    const suggestedBooks = bookCollection.filter(book => book.department.toLowerCase() === department);
    displayBooks(suggestedBooks);
});

function displayBooks(books) {
    const bookList = document.getElementById('book-list').getElementsByTagName('tbody')[0];
    bookList.innerHTML = '';

    books.forEach(book => {
        const row = bookList.insertRow();
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button onclick="selectBook('${book.title}', '${book.author}', '${book.isbn}')">Select</button></td>
        `;
    });
}

function selectBook(title, author, isbn) {
    document.getElementById('selected-title').textContent = `Title: ${title}`;
    document.getElementById('selected-author').textContent = `Author: ${author}`;
    document.getElementById('selected-isbn').textContent = `ISBN: ${isbn}`;
    document.getElementById('borrow-form').style.display = 'block';
}

document.getElementById('borrow-btn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const rollNo = document.getElementById('roll-no').value;
    const studentClass = document.getElementById('class').value;

    if (name && rollNo && studentClass) {
        const borrowedBook = {
            name: name,
            rollNo: rollNo,
            studentClass: studentClass
        };

        borrowedBooks.push(borrowedBook);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks)); // Save borrowed books to local storage
        updateBorrowedBooksList();

        document.getElementById('borrow-form').reset();
        document.getElementById('borrow-form').style.display = 'none';

        alert('Book borrowed successfully!');
    } else {
        alert('Please fill in all the fields.');
    }
});

function updateBorrowedBooksList() {
    const borrowedBooksList = document.getElementById('borrowed-books-list').getElementsByTagName('tbody')[0];
    borrowedBooksList.innerHTML = '';

    borrowedBooks.forEach((book, index) => {
        const row = borrowedBooksList.insertRow();
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.studentClass}</td>
            <td>${book.rollNo}</td>
            <td><button onclick="deleteBorrowedBook(${index})">Delete</button></td>
        `;
    });
}

function deleteBorrowedBook(index) {
    borrowedBooks.splice(index, 1);
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
    updateBorrowedBooksList();
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    displayBooks(bookCollection);
    updateBorrowedBooksList();
});
