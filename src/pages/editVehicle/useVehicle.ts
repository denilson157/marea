import { IUser, IVehicle } from 'interfaces';
import { useState } from 'react'
import * as VehicleInfoService from '../../services/vehicleInfoService'
import * as UserService from '../../services/userService'

const initialValues: IVehicle = {
    id: '',
    ano: 0,
    arCondicionado: false,
    cambio: '',
    cidade: '',
    cilindradas: '',
    clientId: '',
    data_kms: '',
    descricao: '',
    finalPlaca: '',
    kms: 0,
    marca: '',
    modelo: '',
    preco: '',
    tipoCombustivel: '',
    uf: '',
    fotosUrl: []
}

export const useVehicle = () => {

    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<IUser>(undefined);
    const [vehicle, setVehicle] = useState<IVehicle>(initialValues);
    const [redirectUser, setRedirectUser] = useState(false)

    const loadVehicle = (vehicleId: string) => {
        setLoading(true)

        loadUserInfo()
            .then((a) => {
                console.log(a)
                VehicleInfoService.getData(vehicleId)
                    .then(respVehicle => {
                        setVehicle(respVehicle)
                    })
                    .catch(() => {

                    })
                    .finally(() => setLoading(false))
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
            })
            .finally(() => setLoading(false))
    }


    return {
        loading,
        vehicle,
        redirectUser,

        loadVehicle,
        handleFavoriteVehicle,
        userInfo,

        setRedirectUser
    }


}