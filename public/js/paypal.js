paypal.Buttons({
    createOrder: function(data, actions) {
        // Fetch cart items and calculate total amount
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalAmount = calculateTotalAmount(cartItems);

        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'USD', // Specify currency (e.g., USD, EUR)
                    value: totalAmount.toFixed(2) // Total amount dynamically calculated
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // Function to capture the transaction when the user approves
        return actions.order.capture().then(function(details) {
            // Send the details to server for verification and further processing
            console.log(details);
            // Send the verification code
            sendVerificationCode();
            // Clear the cart
            clearCart();
            // Redirect or show a success message to the user
        });
    },
    fundingSource: paypal.FUNDING.PAYPAL
}).render('#paypal-button-container');

// Function to calculate total amount based on cart items
function calculateTotalAmount(cartItems) {
    let totalAmount = 0;
    // Calculate total amount by summing up the prices of all items in the cart
    cartItems.forEach(item => {
        totalAmount += parseFloat(item.price.replace('€', '').trim()) * parseInt(item.quantity);
    });
    return totalAmount;
}

// Function to clear the cart items from local storage
function clearCart() {
    localStorage.removeItem('cartItems');
}

// Function to generate a random 6-digit code
function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to simulate sending the verification code
function sendVerificationCode() {
    // Generate a random code
    const code = generateRandomCode();

    // Simulate sending the code (for testing purposes)
    console.log("Verification code:", code);

    // In live mode the code would be sent to the user via SMS or email here

}