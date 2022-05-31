import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { withSnackbar } from "util/Snackbar";
import { MainLayout } from "../../components/template";
import { useUser } from './useUser'
import { Form as FormBootstrap, Col, Button, Row } from 'react-bootstrap'
import { Formik, Form } from "formik";
import * as userService from '../../services/userService';
import { getAuth } from "firebase/auth";
import InputMask from 'react-input-mask';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const schemaChangeUserInfo = yup.object().shape({
    name: yup.string()
        .required("Informe o nome"),
    email: yup.string()
        .email('Informe um email valido')
        .required("Informe o email"),
    phone: yup.string()
        .min(10, 'Informe um telefone valido')
        .max(20, 'Informe um telefone valido')
        .required("Informe o telefone"),
    birthDate: yup.date()
        .required("Informe a data de nascimento"),
    cpfCnpj: yup.string()
        .min(11, 'Informe um CPF/CNPJ valido')
        .max(30, 'Informe um CPF/CNPJ  valido')
        .required("Informe o CPF/CNPJ"),
});

const schemaChangePassword = yup.object().shape({
    newPassword: yup.string()
        .min(8, 'Minimo de 8 caracteres')
        .max(20, 'Máximo de 20 caracteres')
        .required('Informe a nova senha'),
    newPasswordConfirmation: yup.string()
        .min(8, 'Minimo de 8 caracteres')
        .max(20, 'Máximo de 20 caracteres')
        .required('Confirme a nova senha'),
});

const authUser = getAuth();

const EditUser = ({ snackbarShowMessage }) => {
    const [loadingSubmit, setloadingSubmit] = useState(false);

    const {
        loading,
        loadUser,
        user,
        mask,
        setMask,
        cpfMask,
        cnpjMask,
        redirectUser
    } = useUser()

    useEffect(() => {
        setTimeout(() => {
            loadUser()
        }, 800)
    }, []);

    const changeUserInfo = (obj) => {
        setloadingSubmit(true);

        userService.updateUser(obj).then(() => {
            snackbarShowMessage("Dados alterados com sucesso.", "success")
        })
            .catch((erro) => {
                console.log(erro);
                snackbarShowMessage("Erro ao alterar os dados.", "error")
            })
            .finally(() =>
                setloadingSubmit(false)
            );
    }

    const changePassword = (obj, resetForm) => {
        if (obj.newPassword === obj.newPasswordConfirmation) {
            setloadingSubmit(true);

            userService.updatePasswordUser(obj).then(() => {
                snackbarShowMessage("Senha alterada com sucesso.", "success")
                resetForm();
            })
                .catch((error) => {
                    if (error.toString().includes("auth/wrong-password"))
                        snackbarShowMessage("Erro ao alterar a senha.", "error");
                    else
                        snackbarShowMessage("Senha informada incorreta!", "error");
                })
                .finally(() =>
                    setloadingSubmit(false)
                );
        }
        else {
            snackbarShowMessage("As senhas informadas são divergentes!", "error");
        }
    }

    if (redirectUser)
        return <Redirect to="/home" />
        
    return (
        <MainLayout>
            <Helmet>
                <title>Minha Conta</title>
            </Helmet>
            <div className="container">
                {
                    !loadUser &&
                    <div className="d-flex justify-content-center mt-4">
                        <div className="spinner-border spinner-border-lg" style={{ width: '50px', height: '50px', color: '#D23232' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                {
                    loading &&
                    <div className="d-flex justify-content-center mt-4">
                        <div className="spinner-border spinner-border-lg" style={{ width: '50px', height: '50px', color: '#D23232' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                {
                    user && !loading &&
                    <>
                        <Formik
                            validationSchema={schemaChangeUserInfo}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                changeUserInfo(values)
                            }}
                            initialValues={{
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                birthDate: user.birthDate,
                                cpfCnpj: user.cpfCnpj,
                                receiveContact: user.receiveContact
                            }}
                        >
                            {formik => (
                                <Form className="p-3" noValidate onSubmit={formik.handleSubmit}>
                                    <Row className="mb-3" >
                                        <h2 className="h4">Dados Pessoais</h2>
                                        <FormBootstrap.Group className="mb-2" as={Col} md={6} xs={12} controlId="validationFormik01">
                                            <FormBootstrap.Label className="mb-0">Nome completo</FormBootstrap.Label>
                                            <FormBootstrap.Control type="text" name="name"
                                                {...formik.getFieldProps('name')}
                                                isInvalid={!!formik.errors.name}
                                            />
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.name}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group className="mb-2" as={Col} md={6} xs={12} controlId="validationFormik02">
                                            <FormBootstrap.Label className="mb-0">E-mail</FormBootstrap.Label>
                                            <FormBootstrap.Control type="text" name="email"
                                                {...formik.getFieldProps('email')}
                                                isInvalid={!!formik.errors.email}
                                            />

                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.email}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>
                                        <FormBootstrap.Group className="mb-2" as={Col} md={4} xs={6} controlId="validationFormik03">
                                            <FormBootstrap.Label className="mb-0">Telefone</FormBootstrap.Label>

                                            <InputMask
                                                type="string"
                                                name="phone"
                                                {...formik.getFieldProps('phone')}
                                                mask="(99) 99999-9999"
                                                className="form-control"
                                                isInvalid={!!formik.errors.phone}
                                            />

                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.phone}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group className="mb-2" as={Col} md={4} xs={6} controlId="validationFormik04">
                                            <FormBootstrap.Label className="mb-0">Data nascimento</FormBootstrap.Label>
                                            <FormBootstrap.Control type="date" name="birthDate"
                                                {...formik.getFieldProps('birthDate')}
                                                isInvalid={!!formik.errors.birthDate}
                                            />

                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.birthDate}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group className="mb-2" as={Col} md={4} xs={12} controlId="validationFormik05">
                                            <FormBootstrap.Label className="mb-0">
                                                <FormBootstrap.Check
                                                    type="switch"
                                                    id="checkCNPJCPF"
                                                    label={mask === cpfMask ? 'CPF' : 'CNPJ'}
                                                    checked={mask === cpfMask}
                                                    onChange={() => setMask(old => old === cpfMask ? cnpjMask : cpfMask)}
                                                    name="A"
                                                />
                                            </FormBootstrap.Label>
                                            <InputMask
                                                type="string"
                                                name="cpfCnpj"
                                                {...formik.getFieldProps('cpfCnpj')}
                                                mask={mask}
                                                className="form-control"
                                                isInvalid={!!formik.errors.cpfCnpj}
                                            />
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.cpfCnpj}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>
                                    </Row>
                                    <Row>
                                        <h2 className="h4">Configuracoes</h2>
                                        <FormBootstrap.Group className="pb-4">
                                            <FormBootstrap.Check required name="receiveContact" label="Deseja receber contato?"
                                                {...formik.getFieldProps('receiveContact')}
                                                defaultChecked={user.receiveContact}
                                            />
                                        </FormBootstrap.Group>
                                    </Row>

                                    <div className="d-grid gap-2 pt-1">
                                        <Button className="btn btn-primary" type="submit" disabled={loadingSubmit}>
                                            {
                                                loadingSubmit &&
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            }
                                            Gravar
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        {
                            authUser.currentUser && !authUser.currentUser.providerData[0].providerId.includes("google.com") &&
                            <Formik
                                validationSchema={schemaChangePassword}
                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    changePassword(values, resetForm);
                                }}
                                initialValues={{
                                    password: '',
                                    newPassword: '',
                                    newPasswordConfirmation: '',
                                }}
                            >
                                {formik => (
                                    <Form className="p-3" noValidate onSubmit={formik.handleSubmit}>
                                        <Row>
                                            <h2 className="h4">Alterar Senha</h2>
                                            <FormBootstrap.Group className="mb-2" as={Col} md={4} xs={12} controlId="validationFormik06">
                                                <FormBootstrap.Label className="mb-0">Senha</FormBootstrap.Label>
                                                <FormBootstrap.Control type="password" name="password"
                                                    {...formik.getFieldProps('password')}
                                                    isInvalid={!!formik.errors.password}
                                                />
                                                <FormBootstrap.Control.Feedback type="invalid">
                                                    {formik.errors.password}
                                                </FormBootstrap.Control.Feedback>
                                            </FormBootstrap.Group>

                                            <FormBootstrap.Group className="mb-2" as={Col} md={4} xs={12} controlId="validationFormik06">
                                                <FormBootstrap.Label className="mb-0">Nova senha</FormBootstrap.Label>
                                                <FormBootstrap.Control type="password" name="newPassword"
                                                    {...formik.getFieldProps('newPassword')}
                                                    isInvalid={!!formik.errors.newPassword}
                                                />

                                                <FormBootstrap.Control.Feedback type="invalid">
                                                    {formik.errors.newPassword}
                                                </FormBootstrap.Control.Feedback>
                                            </FormBootstrap.Group>

                                            <FormBootstrap.Group className="mb-2" as={Col} md={4} xs={12} controlId="validationFormik07">
                                                <FormBootstrap.Label className="mb-0">Confirmar nova senha</FormBootstrap.Label>
                                                <FormBootstrap.Control type="password" name="newPasswordConfirmation"
                                                    {...formik.getFieldProps('newPasswordConfirmation')}
                                                    isInvalid={!!formik.errors.newPasswordConfirmation}
                                                />
                                                <FormBootstrap.Control.Feedback type="invalid">
                                                    {formik.errors.newPasswordConfirmation}
                                                </FormBootstrap.Control.Feedback>
                                            </FormBootstrap.Group>
                                        </Row>
                                        <div className="d-grid gap-2 pt-1">
                                            <Button className="btn btn-primary" type="submit" disabled={loadingSubmit}>
                                                {
                                                    loadingSubmit &&
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                }
                                                Alterar
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        }
                    </>
                }
            </div>
        </MainLayout>
    )
}

export default withSnackbar(EditUser);