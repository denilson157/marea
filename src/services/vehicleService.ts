import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

const node = "vehicles"
const nodeCollectionRef = collection(db, node);

export const pushData = (obj) => {
    return new Promise((resolve, reject) => {

        addDoc(nodeCollectionRef, obj)
            .then(rsp => resolve(obj))
            .catch(e => reject(e))
    })
} 