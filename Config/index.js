import app from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';


const firebaseConfig = {
    apiKey: "AIzaSyCcYkdZ8AsAtTIWAeVdtLurUmL5bc_EAfM",
    authDomain: "whatsapp-e70e8.firebaseapp.com",
    projectId: "whatsapp-e70e8",
    databaseURL: "https://whatsapp-e70e8-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "whatsapp-e70e8.appspot.com",
    messagingSenderId: "985858437897",
    appId: "1:985858437897:web:bdac7da5287a06c5f2d9d8"
  };

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;