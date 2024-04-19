const admin = require('firebase-admin');
const serviceAccount = require('../../.firebase/gracie-massage-firebase-adminsdk-vtobr-2124df6580.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gracie-massage-default-rtdb.firebaseio.com",
    storageBucket: "gracie-massage.appspot.com"
});

// Get a reference to Firestore
const db = admin.firestore();

/**
 * Updates Firestore documents with image URLs retrieved from Firebase Storage.
 * @returns {Promise<void>} A Promise that resolves when the documents are successfully updated.
 */
async function updateDocuments() {
    const collectionRef = db.collection('Products');

    try {
        // Fetch documents from the collection
        const querySnapshot = await collectionRef.get();

        // Check if querySnapshot exists and has documents
        if (!querySnapshot.empty) {
            // Iterate through each document
            for (const doc of querySnapshot.docs) {
                // Retrieve the image URLs from Firebase Storage
                const imageUrl1 = await getImageUrl('massage_oil.png');
                const imageUrl2 = await getImageUrl('roller_oil.png');

                // Update the document with the image URLs
                await doc.ref.update({
                    imageUrl1: imageUrl1,
                    imageUrl2: imageUrl2
                });
            }
        } else {
            console.log('No documents found in the collection.');
        }
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error; // Propagate the error to the caller
    }
}

/**
 * Retrieves the signed URL of an image from Firebase Storage.
 * @param {string} filePath - The path to the image file in Firebase Storage.
 * @returns {Promise<string>} A Promise that resolves with the signed URL of the image.
 */
async function getImageUrl(filePath) {
    try {
        const storage = admin.storage();
        const bucket = storage.bucket();

        const file = bucket.file(filePath);
        const [url] = await file.getSignedUrl({ action: 'read', expires: '04-10-2050' });

        return url;
    } catch (error) {
        console.error('Error fetching image URL:', error);
        throw error; // Propagate the error to the caller
    }
}

// Call the function to update documents
updateDocuments()
    .then(() => {
        console.log('Documents updated successfully.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error updating documents:', error);
        process.exit(1);
    });
