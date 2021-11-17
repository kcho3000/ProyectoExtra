import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/auth/";

var firebaseConfig = {
  apiKey: "AIzaSyCE9TeSksm7VkKtrFwkedCjZagx6dIatcI",
  authDomain: "extra-f6108.firebaseapp.com",
  projectId: "extra-f6108",
  storageBucket: "extra-f6108.appspot.com",
  messagingSenderId: "765807118099",
  appId: "1:765807118099:web:c8ecaa2d48aa36572f3ce6"
  };
  // Initialize Firebase
//export default firebase.initializeApp(firebaseConfig);
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
 const auth = firebase.auth()

  export default {
      firebase,
      db,
      auth
  }
