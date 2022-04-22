import React, { useState } from 'react';
import { withSnackbar } from '../util/Snackbar'
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import { Formik, Form } from 'formik';
import { Form as FormBootstrap, Col, Button, Row } from 'react-bootstrap'
import * as RecoveryService from '../services/recoveryService'
import { BaseLayout } from '../components/template';


const schema = yup.object()
    .shape({
        email: yup.string().email('O e-mail precisa ser válido').required('E-mail requerido')
    });

const Register = ({ snackbarShowMessage }) => {
    const [loading, setLoading] = useState(false);

    const register = (obj) => {
        RecoveryService.recoveryPassword(obj.email)
            .then(() => snackbarShowMessage("Link para resetar senha enviado", "success"))
            .catch((erro) => {
                console.log(erro)
                snackbarShowMessage("Erro ao fazer login", "error")
            })
            .finally(() => setLoading(false))
    }

    return (

        <BaseLayout>

            <div className='d-flex  align-items-center justify-content-center flex-column'>

                <div className='pt-5 pb-4'>
                    <img src="https://via.placeholder.com/350x243" alt="marea logo" />
                </div>

                <div className='text-grey b-block' style={{ width: '350px' }}>
                    <p className='h5'>Recuperar Senha</p>
                    <label>Digite o e-mail para redefinir a senha</label>
                </div>

                <div className="pt-2" style={{ width: '350px' }}>

                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting }) => {
                            register(values)
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 400);
                        }}
                        initialValues={{ email: '' }}

                    >
                        {formik => (
                            <Form className="py-3" noValidate onSubmit={formik.handleSubmit}>
                                <Row className="mb-3">
                                    <FormBootstrap.Group className="mb-2" as={Col} md="12" controlId="validationFormik02">
                                        <FormBootstrap.Label className="mb-0">E-mail</FormBootstrap.Label>
                                        <FormBootstrap.Control
                                            type="text"
                                            name="email"
                                            {...formik.getFieldProps('email')}
                                            // value={values.email}
                                            // onChange={handleChange}
                                            isInvalid={!!formik.errors.email}
                                        />

                                        <FormBootstrap.Control.Feedback type="invalid">
                                            {formik.errors.email}
                                        </FormBootstrap.Control.Feedback>
                                    </FormBootstrap.Group>
                                </Row>

                                <div className="d-grid gap-2 pt-1">
                                    <Button className="btn btn-primary" type="submit" disabled={loading}>
                                        Recuperar
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>

                    <div className="my-3 d-flex justify-content-center">
                        <label className='px-1 text-grey'>Não é Cadastrado?</label>
                        <Link to="/register" className='text-decoration-none' >
                            Cadastre-se.
                        </Link>
                    </div>
                </div>
            </div>

        </BaseLayout>
    );
}


export default withSnackbar(Register)