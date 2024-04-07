//HEADER//
window.onscroll = function () {
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
document.addEventListener("DOMContentLoaded", function () {
    const userDetailsContainer = document.getElementById('user-details');
    const saveButton = document.getElementById('save-btn');
    const logoutButton = document.getElementById('logout-btn');

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

    saveButton.addEventListener('click', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        console.log("Name:", name);
        console.log("Phone:", phone);
        displayUserDetails(name, phone);
    });

    logoutButton.addEventListener('click', function () {
        firebase.auth().signOut().then(function () {
            console.log("User logged out successfully");

            window.location.href = "login.html";
        }).catch(function (error) {
            console.error('Error logging out:', error);
        });
    });

    displayUserDetails();
});

//ACCOUNT OR LOGIN
document.addEventListener("DOMContentLoaded", function () {
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
        firebase.auth().onAuthStateChanged(function (user) {
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

//REVIEWS
function fetchGoogleReviews() {
    // Set your place ID
    var placeId = 'ChIJqfaLmCfDQkgRZPmor6c7_IU';
    // Set your API key
    var apiKey = 'AIzaSyBafFN9TD4y0JnXdOfXEYB7--a4oKL-Jvg';

    // Initialize Places Service
    var service = new google.maps.places.PlacesService(document.createElement('div'));

    // Request reviews data
    service.getDetails({
        placeId: placeId,
        fields: ['reviews'],
        key: apiKey
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var reviews = place.reviews.slice(0, 3);
            var reviewsContainer = document.getElementById('review-boxes');

            // Loop through reviews and display them
            reviews.forEach(function(review) {
                var reviewDiv = document.createElement('div');
                reviewDiv.className = 'review';
                reviewDiv.innerHTML = '<h2 style="color: #01b79f">' + review.author_name + '</h2>';
                reviewDiv.innerHTML += '<div class="rating-stars" style="color: gold;">' + getStars(review.rating) + '</div>';
                reviewDiv.innerHTML += '<p>' + review.text + '</p>';
                reviewsContainer.appendChild(reviewDiv);
            });
        }
    });
}

// Helper function to generate star icons based on rating
function getStars(rating) {
    var stars = '';
    for (var i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Call the function to fetch reviews when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchGoogleReviews();
});


// Function to fetch and display ratings
function fetchAndDisplayRatings() {
    var service = new google.maps.places.PlacesService(document.createElement('div'));

    // Make a request to get details including ratings
    service.getDetails({
        placeId: placeId, // Your place ID here
        fields: ['rating', 'user_ratings_total'], // Specify the fields you want to retrieve
        key: apiKey // Your API key here
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var ratingsContainer = document.querySelector('.ratings');

            // Display the rating if available
            if (place.rating && place.user_ratings_total) {
                var averageRating = place.rating;
                var totalRatings = place.user_ratings_total;
                ratingsContainer.innerHTML = 'Rating: ' + averageRating.toFixed(1) + ' out of 5 stars (' + totalRatings + ' ratings)';
            } else {
                ratingsContainer.innerHTML = 'Rating not available';
            }
        } else {
            console.error('Error fetching place details:', status);
        }
    });
}

// Call the function to fetch and display ratings when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayRatings();
});












