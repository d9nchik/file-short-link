// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDyOoEgQr4GTHQ_UUGoDDKEPdTT3QkIzFY',
  authDomain: 'file-short-link.firebaseapp.com',
  projectId: 'file-short-link',
  storageBucket: 'file-short-link.appspot.com',
  messagingSenderId: '275385992669',
  appId: '1:275385992669:web:1fb69f645211bf75cf6234',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

firebase.auth().useDeviceLanguage();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = (): Promise<firebase.auth.UserCredential> =>
  auth.signInWithPopup(googleProvider);

export default firebase;
