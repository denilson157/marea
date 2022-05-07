import { getDoc, doc } from "firebase/firestore";
import { IVehicle } from "../interfaces";
import { db } from "../services/firebaseConfig";

const node = "vehicles"

export const getData = (id: string): Promise<IVehicle> => {
    return new Promise((resolve, reject) => {

        getDoc(doc(db, node, id))
            .then(snap => {
                const exist = snap.exists();

                if (exist)
                    resolve(snap.data() as IVehicle)
                else
                    reject("Not found")
            })
    })
}