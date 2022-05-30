import { IUser, IVehicle } from 'interfaces';
import { useState } from 'react'
import * as VehicleService from '../../services/vehicleService'
import * as UserService from '../../services/userService'

export const useFavoriteVehicle = () => {

    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<IUser>(undefined);
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [redirectUser, setRedirectUser] = useState(false);


    const loadVehicles = () => {
        setLoading(true)

        loadUserInfo()
            .then((a) => {
                if (a)
                    VehicleService.getByListId(a.favorites_vehicles)
                        .then(respVehicle => {
                            setVehicles(respVehicle)
                        })
                        .catch(() => {

                        })
                        .finally(() => setLoading(false))
                else
                    setRedirectUser(true);
            })
    }

    const loadUserInfo = (): Promise<IUser> => {
        return new Promise((resolve, reject) => {

            UserService.getData()
                .then(_userInfo => {
                    setUserInfo(_userInfo)
                    resolve(_userInfo)
                })
        })
    }

    const handleFavoriteVehicle = (vehicleId: string) => {
        setLoading(true)
        UserService.updateFavoriteVehicle(vehicleId)
            .then(fVehiclesUpdated => {

                const objAtt = {
                    ...userInfo,
                    favorites_vehicles: fVehiclesUpdated
                }

                setUserInfo(objAtt)
                loadVehicles()
            })
            .finally(() => setLoading(false))
    }


    return {
        loading,
        vehicles,

        loadVehicles,
        handleFavoriteVehicle,
        userInfo,
        redirectUser
    }


}