import firebase, {githubProvider, facebookProvider, googleProvider} from '../Firebase/firebase'

export var githubLogin = () => {
        return firebase.auth().signInWithRedirect(githubProvider).then((result) => {
            console.log('Authentication successful', result);
        }, (error) => {
            alert(error);
        });
};

export var facebookLogin = () => {
    return firebase.auth().signInWithRedirect(facebookProvider).then((result) => {
        console.log('Authentication successful', result);
    }, (error) => {
        alert(error);
    });
};

export var googleLogin = () => {
    return firebase.auth().signInWithRedirect(googleProvider).then((result) => {
        console.log('Authentication successful', result);
    }, (error) => {
        alert(error);
    });
};

export var userLogout = () => {
        return firebase.auth().signOut().then(() => {
            console.log('Logged out!');
        });
};