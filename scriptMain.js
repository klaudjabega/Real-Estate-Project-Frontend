window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // If no user is logged in, redirect to login page
        window.location.href = "login.html";
    } else {
        // If the user is logged in, display a welcome message
        alert('Welcome back, ' + loggedInUser + '!');
    }

    // Load properties from localStorage
    loadProperties();
};

// Logout function
function logout() {
    // Clear user session
    localStorage.removeItem('loggedInUser');
    // Redirect to login page
    window.location.href = "login.html";
}

// Function to add properties
document.getElementById('addPropertyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const propertyImage = document.getElementById('propertyImage').files[0] ? document.getElementById('propertyImage').files[0].name : '';

    const newProperty = {
        title: title,
        location: location,
        price: price,
        description: description,
        category: category,
        image: propertyImage
    };

    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties));

    loadProperties();
});

// Function to load properties from localStorage
function loadProperties() {
    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    const propertiesTable = document.getElementById('propertiesTable');

    // Clear previous table data
    propertiesTable.innerHTML = `
        <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
    `;

    properties.forEach((property, index) => {
        const row = propertiesTable.insertRow();
        row.innerHTML = `
            <td>${property.title}</td>
            <td>${property.location}</td>
            <td>${property.price}</td>
            <td>
                <button onclick="editProperty(${index})">Edit</button>
                <button onclick="deleteProperty(${index})">Delete</button>
            </td>
        `;
    });
}

// Function to edit a property
function editProperty(index) {
    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    const property = properties[index];

    // Populate update form with property details
    document.getElementById('updateTitle').value = property.title;
    document.getElementById('updateLocation').value = property.location;
    document.getElementById('updatePrice').value = property.price;
    document.getElementById('updateDescription').value = property.description;

    // Update the property in localStorage
    document.getElementById('updatePropertyForm').addEventListener('submit', function(event) {
        event.preventDefault();

        properties[index] = {
            title: document.getElementById('updateTitle').value,
            location: document.getElementById('updateLocation').value,
            price: document.getElementById('updatePrice').value,
            description: document.getElementById('updateDescription').value,
            category: 'residential', // Default category
            image: '' // Default empty image
        };

        localStorage.setItem('properties', JSON.stringify(properties));
        loadProperties();
    });
}

// Function to delete a property
function deleteProperty(index) {
    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.splice(index, 1);
    localStorage.setItem('properties', JSON.stringify(properties));
    loadProperties();
}

// Search Function (Simulated)
function searchProperties() {
    const searchQuery = document.getElementById('search').value;
    if (searchQuery) {
        alert('Searching for: ' + searchQuery);
        // You would send the search query to the backend and display filtered results
    } else {
        alert('Please enter a search query.');
    }
}

window.onload = function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // If no user is logged in, redirect to login page
        window.location.href = "login.html";
    } else {
        // Display the username dynamically
        document.getElementById('userName').textContent = loggedInUser;
    }

    // Load properties from localStorage
    loadProperties();
};
