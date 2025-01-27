// Handle form submission for login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the values entered by the user
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email and password match a registered user
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        // Store only the username in localStorage to track the logged-in user
        localStorage.setItem('loggedInUser', validUser.username);

        // Display success message
        alert('Logged in successfully!');

        // Redirect to mainpage.html after successful login
        window.location.href = "mainpage.html";
    } else {
        // Show error message if credentials are incorrect
        document.getElementById('errorMessage').style.display = "block";
        document.getElementById('errorMessage').innerText = "Invalid email or password.";
    }
});
