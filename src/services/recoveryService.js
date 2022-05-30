
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";


export const recoveryPassword = (email) => {
    return new Promise((resolve, reject) => {
        debugger
        sendPasswordResetEmail(auth, email)
        
            .then(() => {

                resolve(true)

            }).catch((error) => reject(error));
    })
}
