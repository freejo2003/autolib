import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA6K9iL1iBaNpoWbS5S4fnIo3sHxxTBgzY",
    authDomain: "library-ccdfe.firebaseapp.com",
    projectId: "library-ccdfe",
    storageBucket: "library-ccdfe.appspot.com",
    messagingSenderId: "885058746520",
    appId: "1:885058746520:web:d6e635fe06b3ef82b5f8ed",
    measurementId: "G-BEW23X6B78"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();