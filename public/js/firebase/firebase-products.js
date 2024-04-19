/**
 * Initialize Firebase with configuration.
 */
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

/**
 * Reference to Firestore database.
 * @type {firebase.firestore.Firestore}
 */
const db = firebase.firestore();

/**
 * Fetches product data from Firestore.
 * @returns {Promise<Object[]>} A promise resolving to an array of product objects.
 */
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

/**
 * Dynamically creates product cards based on the provided product data.
 * @param {Object[]} products - An array of product objects.
 */
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
           <button class="add-to-cart-btn" data-productId="${product.id}">Add to Cart</button>
        `;
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






