import { doc, getDoc, setDoc } from "firebase/firestore";
import { IUser } from "interfaces";
import { db } from "./firebaseConfig";
import { auth } from "../services/firebaseConfig";
import { getAuth, signOut, reauthenticateWithCredential, updatePassword, EmailAuthProvider } from "firebase/auth";

const node = "users"

export const updateFavoriteVehicle = async (vehicleId: string): Promise<string[]> => {

    const user = (await getData());
    const favorites = user?.favorites_vehicles != null ? user.favorites_vehicles : [];

    const newFavoritesVehiclesUser = updateVehiclesUser(vehicleId, favorites);
    console.log(newFavoritesVehiclesUser)

    return new Promise((resolve, reject) => {

        const userRef = doc(db, node, auth?.currentUser?.uid)

        setDoc(userRef, {
            ...user,
            favorites_vehicles: newFavoritesVehiclesUser
        })
            .then(() => {
                resolve(newFavoritesVehiclesUser)
            })
            .catch(erro => {
                reject(erro)
            })
        //addDoc(nodeCollectionRef, obj)
    })
}

const updateVehiclesUser = (vehicleIdHandle, favoritesVehicle: string[]): string[] => {

    if (favoritesVehicle.includes(vehicleIdHandle)) {
        favoritesVehicle = favoritesVehicle.filter(f => !f.includes(vehicleIdHandle))
    }
    else
        favoritesVehicle.push(vehicleIdHandle)

    return favoritesVehicle
}

export const getData = (): Promise<IUser> => {
    const userUid = auth?.currentUser?.uid
    console.log(userUid)
    return new Promise((resolve, reject) => {

        if (userUid) {
            getDoc(doc(db, node, userUid))
                .then(snap => {
                    const exist = snap.exists();
                    if (exist)
                        resolve(snap.data() as IUser)
                    else
                        reject("Not found")
                })
        } else
            resolve(undefined)
    })
}

export const updateUser = (obj: IUser): Promise<any> => {
    return new Promise((resolve, reject) => {
        const userRef = doc(db, node, auth?.currentUser?.uid)

        setDoc(userRef, obj)
        .then(rsp => resolve(obj))
        .catch(e => reject(e))
    })
} 

export const updatePasswordUser = (obj: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(obj);
        const credential = EmailAuthProvider.credential( 
            auth.currentUser.email,
            obj.password
        );

        reauthenticateWithCredential(user, credential).then(() => {
            updatePassword(user, obj.newPassword)
            .then(rsp => resolve(obj))
            .catch(e => reject(e))
        }).catch((error) => {
            reject(error)
        });
    })
} 

/*export const signOutUser = () => {
    const auth = getAuth();
    signOut(auth)
    .then(rsp => { return true; })
    .catch(e => { return false; })
}*/