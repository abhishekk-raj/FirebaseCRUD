let selectedProductKey;

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

$(document).ready(function () {
    const productId =  window.location.search.split('=')[1];
    console.log('Url Param :: ', productId);

    const query = firebase.database().ref('Products/').orderByKey();

    query.on('value', (snapshot) => {
        snapshot.forEach((data) => {
            if (data.val().productCode === productId) {
                console.log('Key :: ', data.key);
                selectedProductKey = data.key;
                return editSelectedProduct(data.val());
            }
        });
    });
});

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

function editSelectedProduct(product) {
    console.log('Selected Product :: ', product);
    
    document.getElementById('product_name').value = product.productName;
    document.getElementById('product_code').value = product.productCode;
    document.getElementById('price').value = product.price;
    document.getElementById('description').value = product.description;
    $("#release_date").datepicker({ 
        autoclose: true, 
        todayHighlight: true
  }).datepicker('update', new Date(product.releaseDate));
}

function saveEditedProduct() {
    const upForm = $('#updateProductForm').serializeArray();
    const updatedProduct = new Product(upForm[0].value, upForm[1].value,
        new Date(upForm[2].value).toISOString(), upForm[3].value, upForm[4].value)
    console.log(updatedProduct);

    const database = firebase.database();
    const fireRef = database.ref(`Products/${selectedProductKey}`);

    fireRef.update(updatedProduct)
        .then(() => {
            console.log('Product updated successfully');
            window.location.href = 'products-list.html';
        })
        .catch((err) => {
            console.log('Error while updating Product :: ', err.message);
        });
}
