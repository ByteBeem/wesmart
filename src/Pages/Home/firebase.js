import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCPGNzDnoicS5LlVa_bv5sZEjwPNb3rLdw",
    authDomain: "wesmart-a981c.firebaseapp.com",
    projectId: "wesmart-a981c",
    storageBucket: "wesmart-a981c.appspot.com",
    messagingSenderId: "722343747867",
    appId: "1:722343747867:web:44e627259245cc6d55b3be",
    measurementId: "G-KVQ04Q4Y57"
  };


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


const storage = getStorage(app);

export { db, storage };
