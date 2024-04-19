/**
 * Fetches Google reviews for a specific place and displays them on the page.
 */
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
            const reviews = place.reviews.slice(0, 3);
            // Get the container where reviews will be displayed
            const reviewsContainer = document.getElementById('review-boxes');

            // Loop through the reviews and display them
            reviews.forEach(function (review) {
                // Create a div for each review
                const reviewDiv = document.createElement('div');
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

/**
 * Generates star icons based on the rating.
 * @param {number} rating - The rating of the review.
 * @returns {string} A string containing HTML for star icons representing the rating.
 */
function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
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
