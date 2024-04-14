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

    // Initialize Firebase application with the provided configuration and Firebase authentication service
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const auth = firebaseApp.auth();

    const googleSignInButton = document.getElementById('google-sign-in-button');
    const signInForm = document.getElementById('custom-sign-in-form');
    const signUpButton = document.getElementById('custom-sign-up-button');

    // Function to check if a password meets complexity requirements
    function isPasswordValid(password) {
        // Minimum length requirement
        if (password.length < 8) {
            return false;
        }

        // Regular expressions to check for uppercase, lowercase, numbers, and special characters
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        // Check if password contains at least one uppercase letter, one lowercase letter, one number, and one special character
        if (!uppercaseRegex.test(password) ||
            !lowercaseRegex.test(password) ||
            !numberRegex.test(password) ||
            !specialCharRegex.test(password)) {
            return false;
        }

        return true;
    }

    // Function to redirect the user to the account page.
    function redirectToAccountPage() {
        window.location.href = 'account.html';
    }

    // Add event listener to the Google sign-in button
    googleSignInButton.addEventListener('click', function () {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const user = result.user;
                redirectToAccountPage();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    });

    // Add event listener to the custom sign-in form
    signInForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Sign in the user with the provided email and password
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                redirectToAccountPage();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    });

    // Add event listener to sign up button
    signUpButton.addEventListener('click', function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Check if password meets complexity requirements
        if (!isPasswordValid(password)) {
            alert("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        // Proceed with user creation if password is valid
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                redirectToAccountPage();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
            });
    });
});
