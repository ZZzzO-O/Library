document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("upload-form");
    const fileInput = document.getElementById("fileInput");
    const genreSelect = document.getElementById("genreSelect");
    const uploadStatus = document.getElementById("upload-status");

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

        // Get selected genre
        const selectedGenre = genreSelect.value;
        const bookList = document.querySelector(`#${selectedGenre} .book-list`);

        // Remove "No books uploaded yet." if it's the first book in the genre
        if (bookList.children.length === 1 && bookList.children[0].textContent === "No books uploaded yet.") {
            bookList.innerHTML = ""; 
        }

        // Add new book to the selected genre
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${URL.createObjectURL(file)}" target="_blank">${file.name}</a>`;
        bookList.appendChild(listItem);

        uploadStatus.textContent = `Book uploaded to ${selectedGenre.charAt(0).toUpperCase() + selectedGenre.slice(1)} section!`;
        fileInput.value = "";
    });
});
