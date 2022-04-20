
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";


export const signInGoogle = () => {

    return new Promise((resolve, reject) => {

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                const user = result.user;

                const objReturn = {
                    token,
                    user
                }

                resolve(objReturn)

            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;

                const email = error.email;

                const credential = GoogleAuthProvider.credentialFromError(error);

                const objerror = {
                    errorCode,
                    errorMessage,
                    email,
                    credential
                }

                reject(objerror)
            });
    })
}

export const signInEmailPassword = (email, password) => {
    return new Promise((resolve, reject) => {

        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                
                const token = userCredential.accessToken;

                const user = userCredential.user;

                const objReturn = {
                    token,
                    user
                }

                resolve(objReturn)
            })
            .catch(error => {
                reject(({
                    Code: error.code,
                    Message: error.message
                }))
            })


    })


}