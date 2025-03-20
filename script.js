document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("upload-form");
    const fileInput = document.getElementById("fileInput");
    const bookList = document.getElementById("book-list");
    const uploadStatus = document.getElementById("upload-status");

    // Load books from localStorage when the page loads
    function loadBooks() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        bookList.innerHTML = ""; // Clear list before adding stored books

        if (books.length === 0) {
            bookList.innerHTML = "<li>No books uploaded yet.</li>";
        } else {
            books.forEach(book => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `<a href="${book.url}" target="_blank">${book.name}</a>`;
                bookList.appendChild(listItem);
            });
        }
    }

    loadBooks(); // Load books when the page loads

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (fileInput.files.length === 0) {
            uploadStatus.textContent = "Please select a PDF file.";
            return;
        }

        const file = fileInput.files[0];

        if (file.type !== "application/pdf") {
            uploadStatus.textContent = "Only PDF files are allowed.";
            return;
        }

        const bookURL = URL.createObjectURL(file);
        const bookName = file.name;

        // Save book info to localStorage
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.push({ name: bookName, url: bookURL });
        localStorage.setItem("books", JSON.stringify(books));

        loadBooks(); // Reload book list

        uploadStatus.textContent = "Book uploaded successfully!";
        fileInput.value = "";
    });
});
