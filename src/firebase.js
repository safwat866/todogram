// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCKAzK343tgrElyQ22eP2rnFV13sCrYLVI",
//   authDomain: "orbital-caldron-326023.firebaseapp.com",
//   databaseURL: "https://orbital-caldron-326023-default-rtdb.firebaseio.com",
//   projectId: "orbital-caldron-326023",
//   storageBucket: "orbital-caldron-326023.firebasestorage.app",
//   messagingSenderId: "144053416440",
//   appId: "1:144053416440:web:9a7d8715a524741eaee60d",
//   measurementId: "G-E0M42GBSQR",
// };

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };