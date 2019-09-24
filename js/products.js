let count = 0;
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
            window.location.href = 'products-list.html';
        })
        .catch((err) => {
            console.log('Error while creating new Product :: ', err.message);
        });
}

/**
 * Get all Products from Database
 */
function getAllProducts() {
    const query = firebase.database().ref('Products/').orderByKey();

    query.on('value', (snapshot) => {
        snapshot.forEach((data) => {
            count++;
            console.log('Snapshot :: ', data.val());
            $('#productList').append(`<tr>
                <th scope="row"> ${count} </th>
                <td> ${data.val().productCode} </td>
                <td> ${data.val().productName} </td>
                <td> ${'&#8377'} ${data.val().price} </td>
                <td> ${data.val().releaseDate.substring(0, 10)} </td>
                <td> ${data.val().description} </td>
                <td class="d-flex justify-content-center"> 
                    <button id="${data.val().productCode}" type="button" class="btn btn-secondary" onClick="editSelectedProduct(this)" ><i class="fas fa-edit"></i></button>
                    <button id="${data.val().productCode}" type="button" class="btn btn-danger ml-2" onClick="deleteSelectedProduct(this)" ><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`)
        });
    });
}

function editSelectedProduct(product) {
    console.log('Selected Data :: ', product.id);
    window.location.href = `update-product.html?id=${product.id}`;
}

/**
 * Loop through all data,
 * If ID matches with selected data ID, then
 * Delete Product
 */
function deleteSelectedProduct(product) {
    console.log('Selected Product :: ', product.id);
    const query = firebase.database().ref('Products/').orderByKey();

    query.on('value', (snapshot) => {
        snapshot.forEach((data) => {
            if (data.val().productCode === product.id) {
                const database = firebase.database();
                const fireRef = database.ref(`Products/${data.key}`);

                fireRef.set(null)
                    .then(() => {
                        console.log('Product deleted successfully');
                    })
                    .catch(err => {
                        console.log('Error while deleting Product :: ', err.message);
                    });
            }
        });
    });
}

/**
 * Listener on delete operation
 * If any product is deleted, then update the list
 */
const fireRef = firebase.database().ref('Products');
fireRef.on('child_removed', function (data) {
    document.getElementById('productList').innerHTML = "";
    count = 0;
});

getAllProducts();