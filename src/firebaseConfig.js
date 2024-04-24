import {initializeApp}from 'firebase/app';
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataRef = firebase.database();
