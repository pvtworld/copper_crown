import firebase from 'firebase'

try {
    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: ""
};
    firebase.initializeApp(config);
} catch(event){
    console.log(event);
}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
