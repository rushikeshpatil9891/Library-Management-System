document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('search-button').addEventListener('click', searchBook);
});

function searchBook() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    
    searchResults.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Actions</th>
        </tr>
    `;

    const books = JSON.parse(localStorage.getItem('books')) || [];
    let found = false;

    books.forEach(book => {
        if (book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery)) {
            const row = searchResults.insertRow();
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><button onclick="selectBook(this)">Select</button></td>
            `;
            found = true;
        }
    });

    if (!found) {
        searchResults.innerHTML = '<tr><td colspan="4">No books found.</td></tr>';
    }
}

function selectBook(el) {
    const row = el.parentElement.parentElement;
    const title = row.cells[0].innerText;
    const author = row.cells[1].innerText;
    const isbn = row.cells[2].innerText;
    
    // You can implement further actions here, like filling out a form
    document.getElementById('borrow-form').style.display = 'block';
    document.getElementById('selected-title').innerText = `Title: ${title}`;
    document.getElementById('selected-author').innerText = `Author: ${author}`;
    document.getElementById('selected-isbn').innerText = `ISBN: ${isbn}`;
}
