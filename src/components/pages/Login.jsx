import React, { useState } from 'react';
import { createBrowserHistory } from 'history'
import { withSnackbar } from '../../util/Snackbar'
// import {
//     Container,
//     Button,
//     TextField,
//     Box,
//     Typography,
//     CircularProgress,
//     makeStyles
// } from '@material-ui/core';
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//     box: {
//         marginTop: theme.spacing(4),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     boxImage: {
//         marginTop: theme.spacing(4),
//         marginBottom: theme.spacing(4),
//         display: 'flex',
//         justifyContent: 'center'
//     },
//     form: {
//         marginTop: theme.spacing(4),
//         marginBottom: theme.spacing(4),
//     },
//     buttonLogin: {
//         marginTop: theme.spacing(4),
//         marginBottom: theme.spacing(1),
//     },
//     imageBackground: {
//         width: '1286px'
//     },
//     line: {

//     }

// }));

const Login = ({ snackbarShowMessage }) => {

    const [loading, setLoading] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);


        const obj = {
            email: data.get('email'),
            password: data.get('password'),
            device_name: "Desktop"
        };

        setLoading(true)
        snackbarShowMessage("Erro ao fazer login", "error")

    }

    return (
        <div style={{ height: 'calc(100vh - 60px)', overflowY: 'hidden' }}>
            <div className="d-flex col-12" style={{ height: 'calc(100vh - 60px)' }}>

                <div className='col-md-8 d-sm-none d-md-block'>
                    <img src="https://i.pinimg.com/originals/94/f5/3b/94f53bd1f3f7e1975450ae207c54ff1a.jpg" alt="marea logo" className='img-fluid pattern-border' />
                </div>

                <div className="col-md-4 col-sm-12">
                    <div className='d-flex  align-items-center justify-content-center flex-column'>


                        <div className='pt-5 pb-4'>
                            <img src="https://via.placeholder.com/350x243" alt="marea logo" />
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

                                <div className="my-3 d-flex justify-content-end text-grey">
                                    <label>Esqueci minha senha</label>
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

                                <div className="my-3 d-flex justify-content-center">
                                    <label className='px-1 text-grey'>Não é Cadastrado?</label>
                                    <Link to="/register" className='text-decoration-none' >
                                        Cadastre-se.
                                    </Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default withSnackbar(Login)