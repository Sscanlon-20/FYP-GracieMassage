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
        const snapshot = await db.collection('Products').get();
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
            <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add event listener to the product grid container
const productGrid = document.querySelector('.product-grid');
productGrid.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('add-to-cart-btn')) {
        // Find the parent product card element
        const productCard = event.target.closest('.product-card');
        // Extract product data from the product card
        const product = {
            id: productCard.dataset.productId,
            title: productCard.querySelector('.title').textContent,
            price: productCard.querySelector('.price').textContent
        };
        // Add the product to the cart
        addToCart(product);
    }
});


// Fetch product data from Firestore and populate product cards
fetchProductData()
    .then(products => {
        createProductCards(products);
    })
    .catch(error => {
        console.error('Error:', error);
    });






