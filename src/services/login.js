
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./firebaseConfig";


export const signInGoogle = () => {

    return new Promise((resolve, reject) => {

        const provider = new GoogleAuthProvider();

        const auth = getAuth(app);

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