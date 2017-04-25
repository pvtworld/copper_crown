import firebase from 'firebase';
import fb_config from './firebase_config';

try {
    var config = {
        apiKey: fb_config.apiKey,
        authDomain: fb_config.authDomain,
        databaseURL: fb_config.databaseURL,
        projectId: fb_config.projectId,
        storageBucket: fb_config.storageBucket,
        messagingSenderId: fb_config.messagingSenderId
    };
    firebase.initializeApp(config);
} catch(event){

}

export var githubProvider = new firebase.auth.GithubAuthProvider();
export var facebookProvider = new firebase.auth.FacebookAuthProvider();
export var googleProvider = new firebase.auth.GoogleAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;
