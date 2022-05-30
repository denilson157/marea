import { IUser } from 'interfaces';
import { useState } from 'react'
import * as UserService from '../../services/userService'
import { AuthContext } from '../../contexts/auth';

const initialValues: IUser = {
    id: '',
    birthDate: '',
    cpfCnpj: '',
    email: '',
    name: '',
    phone: '',
    receiveContact: false,
    favorites_vehicles: []
}

const cnpjMask = "99.999.999/9999-99";
const cpfMask = "999.999.999-99";

export const useUser = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser>(undefined);
    const [mask, setMask] = useState(cpfMask);
    const [redirectUser, setRedirectUser] = useState(false);

    const loadUser = () => {
        setLoading(true)
        UserService.getData()
            .then(respUser => {
                if (respUser) {

                    setUser(respUser)
                    if (respUser?.cpfCnpj.length === 18)
                        setMask(cnpjMask)
                } else
                    setRedirectUser(true);
            })
            .catch((error) => {
                if (error === 'Not found')
                    setRedirectUser(true);
            })
            .finally(() => setLoading(false))
    }

    return {
        loading,
        loadUser,
        user,
        mask,
        cpfMask,
        cnpjMask,
        setMask,
        redirectUser
    }
}