import { useContext, useState, useEffect } from 'react';
import { withSnackbar } from '../util/Snackbar'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

import * as LoginService from '../services/loginService';
import * as RegisterService from '../services/registerService'
import { AuthContext } from '../contexts/auth';
import '../components/template/styles.css'
import { BaseLayout } from '../components/template';
import { IUser } from 'interfaces';
import { getDataByEmail } from 'services/userService';

const Login = ({ snackbarShowMessage }) => {
    const { signIn, user } = useContext<any>(AuthContext);
    const [loading, setLoading] = useState(false);
    const [redirectUser, setRedirectUser] = useState(false);

    useEffect(() => {
        if (user)
            setRedirectUser(true);
    }, [user])

    const onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const obj = {
            email: data.get('email'),
            password: data.get('password'),
            device_name: "Desktop"
        };

        setLoading(true)

        LoginService.loginEmailPassword(obj.email, obj.password)
            .then(({ user, token }) => {
                signIn(user, token)



                setRedirectUser(true)
            })
            .catch((erro) => {

                if (erro.Code === 'auth/wrong-password')
                    snackbarShowMessage("Credenciais inválidas", "error");
                else
                    snackbarShowMessage("Erro ao fazer login", "error");
                setLoading(false)
            })
    }

    const loginGoogle = async () => {

        setLoading(true)

        LoginService.signInGoogle()
            .then(({ user, token, }) => {
                const { displayName, email, uid } = user
                signIn(user, token)

                const objRegisterUser: IUser = {
                    id: uid,
                    name: displayName,
                    birthDate: '',
                    cpfCnpj: '',
                    email: email,
                    phone: 0,
                    receiveContact: false,
                    favorites_vehicles: []
                }

                getDataByEmail(email)
                    .then((user) => {
                        if (user?.id) {

                        } else {
                            if (getDataByEmail(email)) {

                                RegisterService.pushData(objRegisterUser, uid)
                                    .then(() => {
                                        snackbarShowMessage("Usuário criado com sucesso", "success")
                                        signIn(user, token)
                                        setRedirectUser(true)
                                    })
                                    .catch((erro) => {
                                        console.log(erro)
                                        snackbarShowMessage("Erro ao registrar usuário", "error")
                                    })
                                    .finally(() => setLoading(false))
                            }
                        }
                    })




            })
            .catch((erro) => {
                console.log(erro)
                snackbarShowMessage("Erro ao fazer login com google", "error")
            })
            .finally(() => setLoading(false))

    }


    if (redirectUser)
        return <Redirect to="/home" />

    return (

        <BaseLayout>

            <div className='d-flex  align-items-center justify-content-center flex-column'>

                <div className='pt-5 pb-4'>
                    <img src="https://imgur.com/kdff5HM.png" alt="marea logo" />
                </div>

                <div className="pt-2" style={{ width: '350px' }}>

                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            name="email"
                            className='form-control mb-3'
                            required
                            placeholder='Email'
                        />
                        <input
                            type="password"
                            name="password"
                            className='form-control'
                            required
                            placeholder='Senha'
                        />

                        <div className="my-3 d-flex justify-content-end">

                            <Link to="/recovery" className='text-decoration-none  text-grey' >
                                Esqueci minha senha
                            </Link>
                        </div>

                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {
                                    loading &&
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                }
                                Entrar
                            </button>
                        </div>

                        <div className='d-flex justify-content-center text-grey mt-3'>
                            <span>OU    </span>
                        </div>


                        <div className="d-flex justify-content-center">

                            <button className="SocialLogin-Google my-3" onClick={loginGoogle} disabled={loading} type="button" aria-label="Fazer login com Google">
                                <span>
                                    {
                                        loading ?
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                className="SocialLoginBox-button--Google">
                                                <g fill="none" fillRule="evenodd">
                                                    <path fill="#EA4335"
                                                        d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"></path>
                                                    <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z">
                                                    </path>
                                                    <path fill="#FBBC05" d="M3.88 10.78A5.54 5.54 0 013.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 000 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"></path><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"></path><path d="M0 0h18v18H0z"></path>
                                                </g>
                                            </svg>
                                    }
                                    <span className="SocialLoginBox-button--ButtonNameGoogle"> Entrar com google </span>
                                </span>
                            </button>
                        </div>

                        <div className="my-3 d-flex justify-content-center">
                            <label className='px-1 text-grey'>Não é Cadastrado?</label>
                            <Link to="/register" className='text-decoration-none' >
                                Cadastre-se.
                            </Link>
                        </div>

                    </form>
                </div>
            </div>

        </BaseLayout>
    );
}


export default withSnackbar(Login)