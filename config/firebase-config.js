(function () {
    const firebaseConfig = {
        apiKey: "AIzaSyCjRV0ds57xbcehsJTIcWsipxV6jDnxcII",
        authDomain: "betatest-presentation.firebaseapp.com",
        databaseURL: "https://betatest-presentation.firebaseio.com",
        projectId: "betatest-presentation",
        storageBucket: "",
        messagingSenderId: "438122853060",
        appId: "1:438122853060:web:72f85d4e9ae099b36e8f91"
    };

    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
}());