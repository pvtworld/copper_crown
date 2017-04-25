import firebase from 'firebase'

try {
    var config = {
        apiKey: "AIzaSyBxf-SMmqau97RBu5y4f4a62OQBWLwevUM",
        authDomain: "coppercrown-a18fd.firebaseapp.com",
        databaseURL: "https://coppercrown-a18fd.firebaseio.com",
        projectId: "coppercrown-a18fd",
        storageBucket: "coppercrown-a18fd.appspot.com",
        messagingSenderId: "699730349008"
    };
    firebase.initializeApp(config);
} catch(event){

}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
