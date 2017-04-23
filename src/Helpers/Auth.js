import firebase, {githubProvider, facebookProvider, googleProvider} from '../Firebase/index'

export var githubLogin = () => {
        return firebase.auth().signInWithPopup(githubProvider).then((result) => {
            console.log('Authentication successful', result);
        }, (error) => {
            console.log('Unable to authenticate', error);
        });
};

export var facebookLogin = () => {
    return firebase.auth().signInWithPopup(facebookProvider).then((result) => {
        console.log('Authentication successful', result);
    }, (error) => {
        console.log('Unable to authenticate', error);
    });
};

export var googleLogin = () => {
    return firebase.auth().signInWithPopup(googleProvider).then((result) => {
        console.log('Authentication successful', result);
    }, (error) => {
        console.log('Unable to authenticate', error);
    });
};

export var userLogout = () => {
        return firebase.auth().signOut().then(() => {
            console.log('Logged out!');
        });
};