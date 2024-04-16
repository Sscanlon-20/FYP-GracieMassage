// Firebase configuration object containing credentials
document.addEventListener("DOMContentLoaded", function () {
    const firebaseConfig = {
        apiKey: "AIzaSyBafFN9TD4y0JnXdOfXEYB7--a4oKL-Jvg",
        authDomain: "gracie-massage.firebaseapp.com",
        projectId: "gracie-massage",
        storageBucket: "gracie-massage.appspot.com",
        messagingSenderId: "1084385050785",
        appId: "1:1084385050785:web:87c2c31a2df6a30392b0e0",
        measurementId: "G-9HGTFB4K0F"
    };

    firebase.initializeApp(firebaseConfig); // Initialize Firebase
    function handleIconClick() {
        const accountIcon = document.getElementById('top-account-icon');
        accountIcon.addEventListener('click', function (event) {
            event.preventDefault();

            // Firebase Authentication Check
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in, redirect to account page
                    window.location.href = "account.html";
                } else {
                    // No user signed in, redirect to login page
                    window.location.href = "login.html";
                }
            });
        });
    }

// Wait for DOM content to be loaded
    document.addEventListener("DOMContentLoaded", function () {
        handleIconClick(); // Call function to handle icon click
    });
});