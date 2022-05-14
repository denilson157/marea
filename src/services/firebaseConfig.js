import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const env = window === 'undefined' ? process.env : window._env_;

console.log(process.env)
console.log(window._env_)

const firebaseConfig = {
    apiKey: env.FIREBASE_KEY,
    authDomain: "marea-pi05.firebaseapp.com",
    databaseURL: "marea-pi05-default-rtdb.firebaseio.com",
    projectId: "marea-pi05",
    storageBucket: "marea-pi05.appspot.com",
    messagingSenderId: "442681379300",
    appId: env.FIREBASE_ID
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
