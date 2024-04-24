// Initialize PayPal buttons with custom options
paypal.Buttons({
    // Function to create the order, fetch cart items and calculate total amount
    createOrder: function(data, actions) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const totalAmount = calculateTotalAmount(cartItems);

        return actions.order.create({
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: totalAmount.toFixed(2)
                }
            }]
        });
    },

    // Function to handle approval of the transaction
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Log transaction details for verification
            console.log(details);
            // Send a verification code to the user
            sendVerificationCode();
            // Clear the cart after successful transaction
            clearCart();
            // Redirect or show a success message to the user
        });
    },
    // Specify PayPal as the funding source
    fundingSource: paypal.FUNDING.PAYPAL
}).render('#paypal-button-container');

// Function to calculate total amount based on cart items
function calculateTotalAmount(cartItems) {
    let totalAmount = 0;
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
