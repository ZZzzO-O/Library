document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("upload-form");
    const fileInput = document.getElementById("fileInput");
    const bookList = document.getElementById("book-list");
    const uploadStatus = document.getElementById("upload-status");

    form.addEventListener("submit", function(event) {
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

        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="${URL.createObjectURL(file)}" target="_blank">${file.name}</a>`;
        bookList.appendChild(listItem);

        uploadStatus.textContent = "Book uploaded successfully!";
        fileInput.value = "";
    });
});
