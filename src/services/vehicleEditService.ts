import { getDoc, doc, updateDoc, collection } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { resolve } from "path";
import { IVehicle } from "../interfaces";
import { db, storage } from "../services/firebaseConfig";

const node = "vehicles"
const nodeCollectionRef = collection(db, node);

export const getData = (id: string): Promise<IVehicle> => {
    return new Promise((resolve, reject) => {
        getDoc(doc(db, node, id))
            .then(snap => {
                const exist = snap.exists();
                if (exist) {
                    const obj: IVehicle = {
                        id: snap.id,
                        ...snap.data() as IVehicle
                    }
                    resolve(obj)
                }
                else
                    reject("Not found")
            })
    })
}

export const updateData = (obj) => {
    const vehicleRef = doc(db, node, obj.id);
        return new Promise((resolve, reject) => {
            updateDoc(vehicleRef, obj)
                .then(rsp => resolve(obj))
                .catch(e => reject(e))
        })
}
