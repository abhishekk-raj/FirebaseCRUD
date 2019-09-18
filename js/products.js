/***
 * Check user auth state
 */

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $('#userDisplayName').text(user.displayName);
    } else {
        navigateToLogin();
    }
});

function navigateToLogin() {
    window.location.href = 'index.html';
}