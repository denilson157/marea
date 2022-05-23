import React, { useEffect, useContext, useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import * as yup from "yup";
import { withSnackbar } from "util/Snackbar";
import { MainLayout } from "../../components/template";
import { useUser } from './useUser'
import { AuthContext } from "../../contexts/auth";
import { Form as FormBootstrap, Col, Button, Row } from 'react-bootstrap'
import { Formik, Form } from "formik";
import * as userService from '../../services/userService';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(24),
        paddingLeft: theme.spacing(24),
        width: "100%",
        maxWidth: "100%",
    }
}))

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

const EditUser = ({ snackbarShowMessage }) => {
    const classes = useStyles();
    const [loadingSubmit, setloadingSubmit] = useState(false);

    const {
        loading,
        loadUser,
        user
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
        if(obj.newPassword === obj.newPasswordConfirmation){
            setloadingSubmit(true);

            userService.updatePasswordUser(obj).then(() => {
                snackbarShowMessage("Senha alterada com sucesso.", "success")
                resetForm();
            })
            .catch((error) => {
                if(error.toString().includes("auth/wrong-password"))
                    snackbarShowMessage("Erro ao alterar a senha.", "error");
                else
                    snackbarShowMessage("Senha informada incorreta!", "error");
            })
            .finally(() => 
                setloadingSubmit(false)
            );
        }
        else{
            snackbarShowMessage("As senhas informadas são divergentes!", "error");
        }
    }

    return (
        <MainLayout>
            <Container className={classes.container}>
                {
                    !loadUser && 
                    <div>
                        Carregando...
                    </div>
                }
                 {
                    loading && 
                    <div>
                        Carregando...
                    </div>
                }
                {
                    !user && !loading &&
                    <div>
                        <label>Usuario não encontrado</label>
                    </div>
                }
                {
                    user && !loading &&
                    <>
                    <Formik
                    validationSchema={schemaChangeUserInfo}
                    onSubmit={(values, { setSubmitting, resetForm  }) => {
                        changeUserInfo(values)
                    }}
                    initialValues={{
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        birthDate: user.birthDate,
                        cpfCnpj: user.cpfCnpj,
                        receiveContact : user.receiveContact
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
                                    <FormBootstrap.Control type="number" name="phone"
                                        {...formik.getFieldProps('phone')}
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
                                    <FormBootstrap.Label className="mb-0">CPF / CNPJ</FormBootstrap.Label>
                                    <FormBootstrap.Control type="number" name="cpfCnpj"
                                        {...formik.getFieldProps('cpfCnpj')}
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
                    </>
                }
            </Container>
        </MainLayout>
    )
}

export default withSnackbar(EditUser);