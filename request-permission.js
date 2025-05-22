document.getElementById('permission-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const thesisTitle = document.getElementById('thesis-title').value;
    const message = document.getElementById('message').value;

    // Display a confirmation message
    alert(`Request submitted successfully!\n\nName: ${name}\nEmail: ${email}\nThesis Title: ${thesisTitle}\nMessage: ${message}`);

    // Clear the form fields
    document.getElementById('permission-form').reset();
});