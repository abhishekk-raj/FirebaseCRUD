/**
 * LogIn user with form data
 * If user logIn successfully then navigate to Products List
 */

function login() {
    const loginForm = $('#loginForm').serializeArray();
    firebase.auth().signInWithEmailAndPassword(loginForm[0].value, loginForm[1].value)
        .then(() => {
            navigateToProductsList();
        })
        .catch(err => {
            console.log('Error while SignIn :: ', err.message);
        });
}

function navigateToProductsList() {
    window.location.href = 'products-list.html';
}