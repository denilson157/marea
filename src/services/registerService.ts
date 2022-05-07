import { doc, setDoc } from "firebase/firestore";
import { IUser } from "interfaces";
import { db } from "./firebaseConfig";

const node = "users"

export const pushData = (obj: IUser, authUid: string): Promise<any> => {
    return new Promise((resolve, reject) => {

        setDoc(doc(db, node, authUid), obj)
            .then(rsp => resolve(obj))
            .catch(e => reject(e))


        //addDoc(nodeCollectionRef, obj)
    })
} 