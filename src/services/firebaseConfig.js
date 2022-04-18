import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBKUl3Nndhe86Ub8oV8pQcTDR3J8R2yh_4",
    authDomain: "marea-pi05.firebaseapp.com",
    projectId: "marea-pi05",
    storageBucket: "marea-pi05.appspot.com",
    messagingSenderId: "442681379300",
    appId: "1:442681379300:web:2389f842ad39be0e2b5ff1"
};

export const app = initializeApp(firebaseConfig);