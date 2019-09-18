/**
 * LogIn user with form data
 * If user logIn successfully then navigate to Products List
 */

function login() {
    const loginForm = $('#loginForm').serializeArray();
    firebase.auth().signInWithEmailAndPassword(loginForm[0].value, loginForm[1].value)
        .then(() => {
            console.log('Login Successful');
            showToast('LogIn Successful', 'success');

            setTimeout(() => {
                navigateToProductsList();
            }, 500);
        })
        .catch(err => {
            console.log('Error while SignIn :: ', err.message);
            showToast(err.message, 'failed');
        });
}

/**
 * Create user after getting forms data and
 * call updateProfile method to update user profile
 */

function createUser() {
    const registerForm = $('#registerForm').serializeArray();
    console.log('Event :: ', registerForm);
    const firebaseAuth = firebase.auth();
    firebaseAuth.createUserWithEmailAndPassword(registerForm[1].value, registerForm[2].value)
        .then((user) => {
            console.log('User created :: ', user);
            updateProfile(firebaseAuth, registerForm[0].value)
        })
        .catch(error => {
            console.log('Error occurred while creating user :: ', error.message);
            showToast(error.message, 'failed');
        });
}

/**
 * Update user profile
 * Update displayName, photoURL, emailVerified
 * Logout user, because we want user to sign-in manually
 */

function updateProfile(auth, name) {
    console.log('Current User :: ', firebase.auth().currentUser);
    auth.currentUser.updateProfile({
        displayName: name,
        photoURL: ""
    })
        .then((user) => {
            showToast('Registration Successful', 'success')
            logout();
        })
        .catch((err) => {
            console.log('Error occurred while updating user :: ', err.message);
            showToast(err.message, 'failed');
        });
}

/**
 * Logout User and
 * Navigate to Login page
 */

function logout() {
    firebase.auth().signOut()
        .then(() => {
            navigateToLogin();
        })
        .catch(err => {
            console.log("Error while singing out user :: ", err.message);
        });
}

/**
 * Show toast to user, whether
 * Login success/fail
 * Registration success/fail
 */
function showToast(toastMessage, messageType) {
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

function navigateToLogin() {
    window.location.href = 'index.html';
}