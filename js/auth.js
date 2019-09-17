/**
 * LogIn user with form data
 * If user logIn successfully then navigate to Products List
 */

function login() {
    const loginForm = $('#loginForm').serializeArray();
    firebase.auth().signInWithEmailAndPassword(loginForm[0].value, loginForm[1].value)
        .then(() => {
            console.log('Login Successful');
            showLoginToast('LogIn Successful', 'success');

            setTimeout(() => {
                navigateToProductsList();
            }, 500);
        })
        .catch(err => {
            console.log('Error while SignIn :: ', err.message);
            showLoginToast(err.message, 'failed');
        });
}

/**
 * Show toast to user whether login success/fail
 */
function showLoginToast(toastMessage, messageType) {
    if (messageType === 'success') {
        $('#loginToastMessage').text(toastMessage).addClass('toast-success');
    } else {
        $('#loginToastMessage').text(toastMessage).addClass('toast-failed');
    }
    $('#loginToast').toast('show');
}

function navigateToProductsList() {
    window.location.href = 'products-list.html';
}