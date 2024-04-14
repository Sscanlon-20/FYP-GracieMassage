// Initialize Firebase
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

// Function to fetch product data from Firestore
async function fetchProductData() {
    try {
        const snapshot = await db.collection('Products').get(); // Capital 'P' for Products
        const products = [];
        snapshot.forEach(doc => {
            // Extract product data from Firestore document
            const productData = doc.data();
            products.push(productData);
        });
        return products;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
}

// Function to create product cards dynamically
function createProductCards(products) {
    const productGrid = document.querySelector('.product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.Title}">
            <h2 class="title">${product.Title}</h2>
            <h3>${product.Subtitle}</h3>
            <p>${product.Description}</p>
            <p class="price">${product.Price}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;
        productCard.dataset.productId = product.id; // Set dataset for product ID
        productGrid.appendChild(productCard);
    });
}

// Fetch product data from Firestore and populate product cards
fetchProductData()
    .then(products => {
        createProductCards(products);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Function to handle adding a product to the cart
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Event listener for the "Add to Cart" button
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('add-to-cart-btn')) {
        console.log("Add to Cart button clicked!");
        const productCard = event.target.closest('.product-card');
        console.log("Product card:", productCard);
        const product = {
            id: productCard.dataset.productId,
            title: productCard.querySelector('.title').textContent,
            price: productCard.querySelector('.price').textContent
        };
        console.log("Product to be added to cart:", product);
        addToCart(product);
    }
});

