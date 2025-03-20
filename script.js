document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("book-form");
    const bookList = document.getElementById("books");

    function checkPassword() {
        const password = document.getElementById("admin-password").value;
        const correctPassword = "admin123"; // Change this password!

        if (password === correctPassword) {
            document.getElementById("add-book-section").style.display = "block"; // Show upload form
            document.getElementById("admin-login").style.display = "none"; // Hide login
        } else {
            alert("Incorrect password!");
        }
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const fileInput = document.getElementById("book-file");

        if (fileInput.files.length === 0) {
            alert("Please upload a book.");
            return;
        }

        const file = fileInput.files[0];
        const fileURL = URL.createObjectURL(file); // Temporary URL for preview

        const listItem = document.createElement("li");
        listItem.innerHTML = `<b>${title}</b> by ${author} - <a href="${fileURL}" target="_blank">Read PDF</a>`;
        bookList.appendChild(listItem);

        // Reset Form
        form.reset();
    });

    window.checkPassword = checkPassword; // Make the function accessible in HTML
});
