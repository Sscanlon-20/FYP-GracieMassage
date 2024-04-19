//HEADER//
window.onscroll = function () {
    stickyScroll();
};

const header = document.getElementById("topHeader");
const sticky = header.offsetTop;

// toggling the about tab in the navigation menu in top header
function toggleMenu() {
    const menu = document.getElementById("menu1");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// function to keep top menu on screen when scrolling
function stickyScroll() {
    if (window.scrollY > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

//USER ACCOUNT DETAILS//
document.addEventListener("DOMContentLoaded", function () {
    // Getting references to DOM elements
    const userDetailsContainer = document.getElementById('user-details');
    const saveButton = document.getElementById('save-btn');
    const logoutButton = document.getElementById('logout-btn');

    // Function to display user details
    function displayUserDetails(name, phone) {
        // Clearing the user details container
        userDetailsContainer.innerHTML = '';

        // Displaying the user's email using Firebase authentication
        const userEmail = firebase.auth().currentUser.email;
        userDetailsContainer.innerHTML += `<p><strong>Email:</strong> ${userEmail}</p>`;

        // Displaying the name if provided
        if (name) {
            userDetailsContainer.innerHTML += `<p><strong>Name:</strong> ${name}</p>`;
        }

        // Displaying the phone number if provided
        if (phone) {
            userDetailsContainer.innerHTML += `<p><strong>Phone Number:</strong> ${phone}</p>`;
        }
    }

    // Adding a click event listener to the save button
    saveButton.addEventListener('click', function (event) {
        event.preventDefault();
        // Getting values from input fields
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        console.log("Name:", name);
        console.log("Phone:", phone);
        // Calling displayUserDetails function with provided values
        displayUserDetails(name, phone);
    });

    // Adding a click event listener to the logout button
    logoutButton.addEventListener('click', function () {
        // Signing out the user using Firebase authentication
        firebase.auth().signOut().then(function () {
            console.log("User logged out successfully");
            // Redirecting the user to the login page after successful logout
            window.location.href = "login.html";
        }).catch(function (error) {
            console.error('Error logging out:', error);
        });
    });

    // Displaying user details on page load
    displayUserDetails();
});










