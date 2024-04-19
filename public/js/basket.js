/**
 * Redirects the user to the shop page.
 */
function redirectToShop() {
    window.location.href = "shop.html";
}

/**
 * Handles adding a product to the cart.
 * @param {Object} product - The product object to add to the cart.
 */
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
        // If the product already exists, update its quantity
        cartItems[existingItemIndex].quantity++;
    } else {
        // If the product doesn't exist, add it to the cart
        product.quantity = 1;
        cartItems.push(product);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Event listener for the "Add to Cart" button
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('add-to-cart-btn')) {

        const productCard = event.target.closest('.product-card');
        const product = {
            id: productCard.dataset.productId,
            title: productCard.querySelector('.title').textContent,
            price: productCard.querySelector('.price').textContent
        };
        addToCart(product);
        console.log("Product added to cart:", product);
    }
});

/**
 * Retrieves and displays cart items.
 */
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const basketList = document.getElementById('basket-items');
    let totalPrice = 0; // Initialize total price

    basketList.innerHTML = '';

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('trash', 'icon', 'delete-item-icon');

        deleteIcon.addEventListener('click', function() {
            // Remove the item from the cartItems array
            const index = cartItems.findIndex(cartItem => cartItem.id === item.id);
            cartItems.splice(index, 1);
            // Update the localStorage with the modified cartItems array
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            // Update the displayed cart items
            displayCartItems();
        });

        // Ensure proper parsing of price and quantity as numbers
        const price = parseFloat(item.price.replace('€', '').trim());
        const quantity = parseInt(item.quantity);

        // Calculate the subtotal for each item (price * quantity)
        const subtotal = price * quantity;
        totalPrice += subtotal;

        listItem.textContent = `${item.title} - €${price.toFixed(2)} x${quantity}`;
        // Append the delete icon to the list item
        listItem.appendChild(deleteIcon);
        basketList.appendChild(listItem);
    });

    // Display the total price after iterating through all items
    document.getElementById('total-amount').textContent = totalPrice.toFixed(2);
}

// Call the function when the basket page loads
window.addEventListener('load', displayCartItems);

