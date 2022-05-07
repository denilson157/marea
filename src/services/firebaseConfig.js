import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "marea-pi05.firebaseapp.com",
    projectId: "marea-pi05",
    storageBucket: "marea-pi05.appspot.com",
    messagingSenderId: "442681379300",
    appId: process.env.REACT_APP_API_ID
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
