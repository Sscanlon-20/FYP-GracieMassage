//HEADER//
window.onscroll = function() {
    myFunction();
};

const header = document.getElementById("topHeader");
const sticky = header.offsetTop;

function toggleMenu() {
    const menu = document.getElementById("menu1");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function myFunction() {
    if (window.scrollY > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

//USER DETAILS//
document.addEventListener("DOMContentLoaded", function() {
    const userDetailsContainer = document.getElementById('user-details');
    const saveButton = document.getElementById('save-btn');
    const logoutButton = document.getElementById('logout-btn');

    // Function to display user details
    function displayUserDetails(name, phone) {
        userDetailsContainer.innerHTML = '';

        const userEmail = firebase.auth().currentUser.email;
        userDetailsContainer.innerHTML += `<p><strong>Email:</strong> ${userEmail}</p>`;


        if (name) {
            userDetailsContainer.innerHTML += `<p><strong>Name:</strong> ${name}</p>`;
        }


        if (phone) {
            userDetailsContainer.innerHTML += `<p><strong>Phone Number:</strong> ${phone}</p>`;
        }
    }


    saveButton.addEventListener('click', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        console.log("Name:", name);
        console.log("Phone:", phone);
        displayUserDetails(name, phone);
    });


    logoutButton.addEventListener('click', function() {
        firebase.auth().signOut().then(function() {
            console.log("User logged out successfully");

            window.location.href = "login.html";
        }).catch(function(error) {
            console.error('Error logging out:', error);
        });
    });

    displayUserDetails();
});

//ACCOUNT OR LOGIN
document.addEventListener("DOMContentLoaded", function() {
    const topAccountTab = document.getElementById('top-account-tab');
    const bottomAccountTab = document.getElementById('bottom-account-tab');

    function handleTopAccountTabClick(event) {
        event.preventDefault();
        redirectToCorrectPage();
    }

    function handleBottomAccountTabClick(event) {
        event.preventDefault();
        redirectToCorrectPage();
    }

    function redirectToCorrectPage() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in, redirect to the user's account page
                window.location.href = "/account";
            } else {
                // No user signed in, redirect to the login page
                window.location.href = "/login";
            }
        });
    }

    if (topAccountTab) {
        topAccountTab.addEventListener('click', handleTopAccountTabClick);
    }

    if (bottomAccountTab) {
        bottomAccountTab.addEventListener('click', handleBottomAccountTabClick);
    }
});






