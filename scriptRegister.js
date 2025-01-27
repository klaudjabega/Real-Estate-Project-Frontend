// Handle form submission for registration
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate form fields
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        alert("Please fill in all fields.");
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Check if the username or email already exists
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username || user.email === email);

    if (userExists) {
        alert("Username or email already exists.");
        return;
    }

    // Create new user object
    const newUser = {
        username: username,
        email: email,
        password: password, // Password is saved here, but only in the users array for validation
    };

    // Store user in localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Store only the username in localStorage to track logged-in user
    localStorage.setItem('loggedInUser', username);

    // Redirect to the main page after successful registration
    alert("Registration successful! Redirecting to your main page.");
    window.location.href = "mainpage.html";
});
