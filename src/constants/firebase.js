import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyACWfcCPXSG-poy5YQ1ot7M11exBezFx08",
  authDomain: "chatapp-14d4b.firebaseapp.com",
  databaseURL: "https://chatapp-14d4b.firebaseio.com",
  projectId: "chatapp-14d4b",
  storageBucket: "chatapp-14d4b.appspot.com",
  messagingSenderId: "5607583636"
};
firebase.initializeApp(config);

export default firebase;
