//REVIEWS
function fetchGoogleReviews() {
    const placeId = 'ChIJqfaLmCfDQkgRZPmor6c7_IU';
    const apiKey = 'AIzaSyBafFN9TD4y0JnXdOfXEYB7--a4oKL-Jvg';
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    // Request the reviews data
    service.getDetails({
        placeId: placeId,
        fields: ['reviews'],
        key: apiKey
    }, function (place, status) {
        // Checking if the request was successful
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Limit the reviews to the first 3
            var reviews = place.reviews.slice(0, 3);
            // Get the container where reviews will be displayed
            var reviewsContainer = document.getElementById('review-boxes');

            // Loop through the reviews and display them
            reviews.forEach(function (review) {
                // Create a div for each review
                var reviewDiv = document.createElement('div');
                reviewDiv.className = 'review';
                // Populate the review div with author name, rating, and text
                reviewDiv.innerHTML = '<h2 style="color: #01b79f">' + review.author_name + '</h2>';
                reviewDiv.innerHTML += '<div class="rating-stars" style="color: gold;">' + getStars(review.rating) + '</div>';
                reviewDiv.innerHTML += '<p>' + review.text + '</p>';
                // Send the review div to the reviews container
                reviewsContainer.appendChild(reviewDiv);
            });
        }
    });
}

// Helper function to generate star icons for rating
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

// Fetch reviews when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchGoogleReviews();
});

// Fetch and display ratings
function fetchAndDisplayRatings() {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    // Get rating details
    service.getDetails({
        placeId: placeId,
        fields: ['rating', 'user_ratings_total'],
        key: apiKey //
    }, function (place, status) {
        place.user_ratings_total = undefined;
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            const ratingsContainer = document.querySelector('.ratings');

            // Display the rating if available
            if (place.rating && place.user_ratings_total) {
                const averageRating = place.rating;
                const totalRatings = place.user_ratings_total;
                ratingsContainer.innerHTML = 'Rating: ' + averageRating.toFixed(1) + ' out of 5 stars ' +
                    '(' + totalRatings + ' ratings)';
            } else {
                ratingsContainer.innerHTML = 'Rating not available';
            }
        } else {
            console.error('Error fetching place details:', status);
        }
    });
}

// Calling the function to fetch and display ratings when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchAndDisplayRatings();
});