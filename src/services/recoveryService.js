
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";


export const recoveryPassword = (email) => {
    debugger
    return new Promise((resolve, reject) => {

        sendPasswordResetEmail(auth, email)
            .then(() => {

                resolve(true)

            }).catch((error) => reject(error));
    })
}
