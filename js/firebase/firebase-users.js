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

    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const saveButton = document.getElementById('save-btn');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');

    saveButton.addEventListener('click', function(event) {
        event.preventDefault();
        const name = nameInput.value;
        const phone = phoneInput.value;
        console.log("Name:", name);
        console.log("Phone:", phone);

        const user = firebase.auth().currentUser;

        // Save user details to Firebase database
        db.collection('users').doc(user.uid).set({
            name: name,
            phone: phone,
            email: user.email
        }).then(function() {
            console.log("User details saved successfully");
        }).catch(function(error) {
            console.error('Error saving user details:', error);
        });
    });
});


