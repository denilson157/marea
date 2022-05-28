import { addDoc, collection, documentId, query, where, getDocs } from "firebase/firestore";
import { IVehicle } from "interfaces";
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

export const getByListId = async (uids: string[]): Promise<IVehicle[]> => {
    const docData = query(nodeCollectionRef, where(documentId(), "in", uids));
    const vehiclesData = await getDocs(docData);

    const vehicles: IVehicle[] = []

    vehiclesData.forEach(vd => {
        const vehicle = vd.data() as IVehicle
        vehicle.id = vd.id
        vehicles.push(vehicle)
    })

    return vehicles
}