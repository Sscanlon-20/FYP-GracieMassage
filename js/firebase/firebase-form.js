document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(document.getElementById('contact-form'));
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    fetch('https://us-central1-gracie-massage.cloudfunctions.net/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
});