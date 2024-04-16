//Event listener for the contact form submission.
document.getElementById('contact-form').addEventListener('submit', function (event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get form data
    const formData = new FormData(document.getElementById('contact-form'));
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Send form data to the server via fetch API
    fetch('https://us-central1-gracie-massage.cloudfunctions.net/sendEmail', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, message})
    })
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
                // If not OK, throw an error
                throw new Error('Network response was not ok');
            }
            // If OK, parse the response as text
            return response.text();
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
});