import { IUser } from 'interfaces';
import { useState } from 'react'
import * as UserService from '../../services/userService'

const initialValues: IUser = {
    id: '',
    birthDate: '',
    cpfCnpj: '',
    email: '',
    name: '',
    phone: 0,
    receiveContact: false,
    favorites_vehicles: []
}

export const useUser = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser>(undefined);

    const loadUser = () => {
        setLoading(true)
        UserService.getData()
            .then(respUser => {
                setUser(respUser)
            })
            .catch(() => {

            })
            .finally(() => setLoading(false))
    }

    return {
        loading,
        loadUser,
        user
    }
}