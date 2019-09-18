/***
 * Check user auth state
 */

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $('#userDisplayName').text(user.displayName);
    } else {
        navigateToLogin();
    }
});

function navigateToLogin() {
    window.location.href = 'index.html';
}

/**
 * Model function for Product
 */
function Product(productName, productCode, releaseDate, price, description) {
    this.productName = productName;
    this.productCode = productCode;
    this.releaseDate = releaseDate;
    this.price = price;
    this.description = description;
}

/**
 * Create new product with user form's input
 * Save data to Firebase Realtime Database
 */
function createNewProduct() {
    const cpForm = $('#createProductForm').serializeArray();
    const newProduct = new Product(cpForm[0].value, cpForm[1].value,
        new Date(cpForm[2].value).toISOString(), cpForm[3].value, cpForm[4].value)
    console.log(newProduct);

    const database = firebase.database();
    // const pushKey = database.ref('Products/').push().key;
    const fireRef = database.ref(`Products/${database.ref('Products/').push().key}`);
    
    fireRef.update(newProduct)
    .then(() => {
        console.log('New Product created successfully');
    })
    .catch((err) => {
        console.log('Error while creating new Product :: ', err.message);
    });
}