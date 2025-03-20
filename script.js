document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("upload-form");
    const fileInput = document.getElementById("fileInput");
    const genreSelect = document.getElementById("genreSelect");
    const uploadStatus = document.getElementById("upload-status");

    // Load books from localStorage
    function loadBooks() {
        const savedBooks = JSON.parse(localStorage.getItem("books")) || {};

        for (const genre in savedBooks) {
            const bookList = document.querySelector(`#${genre} .book-list`);
            bookList.innerHTML = ""; // Clear existing books

            savedBooks[genre].forEach(book => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="${book.url}" target="_blank">${book.name}</a>`;
                bookList.appendChild(listItem);
            });

            // If the genre has no books, show default text
            if (savedBooks[genre].length === 0) {
                bookList.innerHTML = "<li>No books uploaded yet.</li>";
            }
        }
    }

    // Save books to localStorage
    function saveBook(genre, name, url) {
        const savedBooks = JSON.parse(localStorage.getItem("books")) || {};
        if (!savedBooks[genre]) savedBooks[genre] = [];
        savedBooks[genre].push({ name, url });

        localStorage.setItem("books", JSON.stringify(savedBooks));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (fileInput.files.length === 0) {
            uploadStatus.textContent = "❌ Please select a PDF file.";
            return;
        }

        const file = fileInput.files[0];

        if (file.type !== "application/pdf") {
            uploadStatus.textContent = "⚠️ Only PDF files are allowed.";
            return;
        }

        // Get selected genre
        const selectedGenre = genreSelect.value;
        const bookList = document.querySelector(`#${selectedGenre} .book-list`);

        // Remove "No books uploaded yet." if it's the first book in the genre
        if (bookList.children.length === 1 && bookList.children[0].textContent === "No books uploaded yet.") {
            bookList.innerHTML = "";
        }

        // Add new book to the selected genre
        const bookURL = URL.createObjectURL(file);
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${bookURL}" target="_blank">${file.name}</a>`;
        bookList.appendChild(listItem);

        // Save book in localStorage
        saveBook(selectedGenre, file.name, bookURL);

        uploadStatus.textContent = `✅ Book uploaded to ${selectedGenre}!`;
        fileInput.value = "";
    });

    // Load existing books when the page loads
    loadBooks();
});
