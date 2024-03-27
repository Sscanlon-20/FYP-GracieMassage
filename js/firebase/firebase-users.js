document.addEventListener("DOMContentLoaded", function() {
    const db = firebase.firestore();
    const userDetailsContainer = document.getElementById('user-details');
    const saveButton = document.getElementById('save-btn');

    function formatBirthday(dateString) {
        const [day, month] = dateString.split('-').map(Number);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Determine suffix for the day
        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31) {
            suffix = 'st';
        } else if (day === 2 || day === 22) {
            suffix = 'nd';
        } else if (day === 3 || day === 23) {
            suffix = 'rd';
        }

        return `${day}${suffix} ${monthNames[month - 1]}`;
    }

    function displayUserDetails(user) {
        userDetailsContainer.innerHTML = ''; // Clear previous content

        userDetailsContainer.innerHTML += `
            <p><strong>Email:</strong> ${user.email}</p>
        `;

        if (user.displayName) {
            userDetailsContainer.innerHTML += `
                <p><strong>Name:</strong> ${user.displayName}</p>
            `;
        } else {
            userDetailsContainer.innerHTML += `
                <p><strong>Name:</strong> Not provided</p>
            `;
        }

        db.collection('users').doc(user.uid).get()
            .then(function(doc) {
                if (doc.exists) {
                    const userData = doc.data();
                    const birthday = userData.birthday;
                    if (birthday) {
                        const formattedBirthday = formatBirthday(birthday);
                        userDetailsContainer.innerHTML += `
                            <p><strong>Birthday:</strong> ${formattedBirthday}</p>
                        `;
                    } else {
                        userDetailsContainer.innerHTML += `
                            <p><strong>Birthday:</strong> Not provided</p>
                        `;
                    }
                } else {
                    console.log('No such document!');
                }
            }).catch(function(error) {
            console.error('Error getting document:', error);
        });
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            displayUserDetails(user);
        } else {
            userDetailsContainer.innerHTML = '<p>No user signed in</p>';
        }
    });

    saveButton.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const birthday = document.getElementById('birthday').value;

        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
        }).then(function() {

            return db.collection('users').doc(user.uid).set({
                birthday: birthday,
            }, { merge: true });
        }).then(function() {

            displayUserDetails(user);
        }).catch(function(error) {
            console.error('Error updating user profile:', error);
        });
    });
});




