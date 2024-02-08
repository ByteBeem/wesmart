import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCPGNzDnoicS5LlVa_bv5sZEjwPNb3rLdw",
    authDomain: "wesmart-a981c.firebaseapp.com",
    projectId: "wesmart-a981c",
    storageBucket: "wesmart-a981c.appspot.com",
    databaseURL: "https://wesmart-a981c-default-rtdb.asia-southeast1.firebasedatabase.app",
    messagingSenderId: "722343747867",
    appId: "1:722343747867:web:44e627259245cc6d55b3be",
    measurementId: "G-KVQ04Q4Y57"
  };


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


const storage = getStorage(app);

export { db, storage };
