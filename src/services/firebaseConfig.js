import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBKUl3Nndhe86Ub8oV8pQcTDR3J8R2yh_4",
    authDomain: "marea-pi05.firebaseapp.com",
    databaseURL: "https://marea-pi05-default-rtdb.firebaseio.com",
    projectId: "marea-pi05",
    storageBucket: "marea-pi05.appspot.com",
    messagingSenderId: "442681379300",
    appId: "1:442681379300:web:2389f842ad39be0e2b5ff1"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
