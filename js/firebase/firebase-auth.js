document.addEventListener("DOMContentLoaded", function() {
    const firebaseConfig = {
        apiKey: "AIzaSyBafFN9TD4y0JnXdOfXEYB7--a4oKL-Jvg",
        authDomain: "gracie-massage.firebaseapp.com",
        projectId: "gracie-massage",
        storageBucket: "gracie-massage.appspot.com",
        messagingSenderId: "1084385050785",
        appId: "1:1084385050785:web:87c2c31a2df6a30392b0e0",
        measurementId: "G-9HGTFB4K0F"
    };

    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const auth = firebaseApp.auth();

    const googleSignInButton = document.getElementById('google-sign-in-button');
    const signInForm = document.getElementById('custom-sign-in-form');
    const signUpButton = document.getElementById('custom-sign-up-button');

    function redirectToAccountPage() {
        window.location.href = 'account.html';
    }

    googleSignInButton.addEventListener('click', function() {
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

    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

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

    signUpButton.addEventListener('click', function() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

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

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;

        auth.sendPasswordResetEmail(email)
            .then(function() {
                // Password reset email sent
                alert("Password reset email sent. Please check your email inbox.");
            })
            .catch(function(error) {
                // An error occurred
                console.error("Error sending password reset email:", error);
                alert("Error sending password reset email. Please try again later.");
            });
    });
});