import firebase from 'firebase/compat/app'
import "firebase/auth";
import "firebase/compat/database"
import { getAuth, GoogleAuthProvider, TwitterAuthProvider } from 'firebase/auth';

const app = firebase.initializeApp({
   // apiKey: process.env.FIREBASE_API_KEY,
   // authDomain: process.env.FIREBASE_DOMAIN,
   // projectId: process.env.FIREBASE_PROJECT_ID,
   // storageBucket: process.env.FIREBASE_STORAGE_BACKET,
   // messagingSenderId: process.env.FIREBASE_SENDER_ID
   apiKey: "AIzaSyDXqQo2NRRTlH6bq4cDIR3oXPzy4eKlHJc",
   authDomain: "sneakers-shop-8264b.firebaseapp.com",
   databaseURL: "https://sneakers-shop-8264b-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "sneakers-shop-8264b",
   storageBucket: "sneakers-shop-8264b.appspot.com",
   messagingSenderId: "928611178314",
   appId: "1:928611178314:web:753958be76865c787d13b3",
   measurementId: "G-PFE7F4LW9Y"
})

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export { auth, googleProvider, twitterProvider, app, firebase };