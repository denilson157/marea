import { useContext, useEffect, useState } from 'react';
import { withSnackbar } from '../util/Snackbar'
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik';
import { Form as FormBootstrap, Col, Button, Row } from 'react-bootstrap'
import * as RegisterService from '../services/registerService'
import * as LoginService from '../services/loginService'
import { AuthContext } from '../contexts/auth';
import { BaseLayout } from '../components/template';
import InputMask from 'react-input-mask';
import { getDataByEmail } from 'services/userService';


const cnpjMask = "99.999.999/9999-99";
const cpfMask = "999.999.999-99";

const schema = yup.object()
    .shape({
        name: yup.string().required('Nome requerido'),
        email: yup.string().email('O e-mail precisa ser válido').required('E-mail requerido'),
        phone: yup.string().required('Telefone requerido'),
        birthDate: yup.date().required('Data de nascimento requerido'),
        cpfCnpj: yup.string().required('CPF / CNPJ requerido'),
        password: yup.string().required('Senha requerida'),
        receiveContact: yup.bool(),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Senhas precisam ser iguais'),
    });

const Register = ({ snackbarShowMessage }) => {
    const { signIn } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [mask, setMask] = useState(cpfMask);
    const [redirectUser, setRedirectUser] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user)
            setRedirectUser(true);
    }, [user])

    const userExist = (email) =>
        new Promise(resolve => {
            getDataByEmail(email)
                .then((user) => {
                    console.log(user)
                    resolve(user?.id !== undefined)
                })
                .catch((err) => {
                    resolve(false)
                    console.log(err)
                })
        })


    const register = async (obj) => {
        setLoading(true)

        userExist(obj.email)
            .then(exist => {


                if (exist) {
                    snackbarShowMessage("e-mail já cadastrado", "error")
                    return;
                }

                LoginService.signInEmailPassword(obj.email, obj.password)
                    .then(({ user, token }) => {

                        const objAdd = {
                            id: user.uid,
                            name: obj.name,
                            email: obj.email,
                            phone: obj.phone,
                            birthDate: obj.birthDate,
                            cpfCnpj: obj.cpfCnpj,
                            receiveContact: (obj.receiveContact || false),
                            favorites_vehicles: []
                        }

                        RegisterService.pushData(objAdd, user.uid)
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

                    })
                    .catch((erro) => {
                        console.log(erro)
                        snackbarShowMessage(erro.Message, "error", 5000)
                    })
                    .finally(() => setLoading(false))
            })
    }

    if (redirectUser)
        return <Redirect to="/vehicles" />

    return (

        <BaseLayout>

            <div className='px-4 pt-5'>
                <label className='px-3 h4'>Informe os dados abaixo</label>

            </div>
            <div className='d-flex align-items-center justify-content-center flex-column p-4'>


                <Formik
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        register(values)
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 400);
                    }}
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        birthDate: '',
                        cpfCnpj: '',
                        password: '',
                        passwordConfirmation: '',
                    }}
                >
                    {formik => (
                        <Form className="p-3" noValidate onSubmit={formik.handleSubmit}>
                            <Row className="mb-3">
                                <FormBootstrap.Group className="mb-2" as={Col} md="12" controlId="validationFormik01">
                                    <FormBootstrap.Label className="mb-0">Nome completo</FormBootstrap.Label>
                                    <FormBootstrap.Control
                                        type="text"
                                        name="name"
                                        {...formik.getFieldProps('name')}
                                        // value={values.name}
                                        // onChange={handleChange}
                                        isInvalid={!!formik.errors.name}
                                    />

                                    <FormBootstrap.Control.Feedback type="invalid">
                                        {formik.errors.name}
                                    </FormBootstrap.Control.Feedback>
                                </FormBootstrap.Group>
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
                                <FormBootstrap.Group className="mb-2" as={Col} md="12" controlId="validationFormik03">
                                    <FormBootstrap.Label className="mb-0">Telefone</FormBootstrap.Label>

                                    <InputMask
                                        type="string"
                                        name="phone"
                                        {...formik.getFieldProps('phone')}
                                        mask="(99) 99999-9999"
                                        className="form-control"
                                    />

                                    <FormBootstrap.Control.Feedback type="invalid">
                                        {formik.errors.phone}
                                    </FormBootstrap.Control.Feedback>
                                </FormBootstrap.Group>

                                <FormBootstrap.Group className="mb-2" as={Col} md="12" controlId="validationFormik04">
                                    <FormBootstrap.Label className="mb-0">Data nascimento</FormBootstrap.Label>
                                    <FormBootstrap.Control
                                        type="date"
                                        name="birthDate"
                                        {...formik.getFieldProps('birthDate')}
                                        // value={values.birthDate}
                                        // onChange={handleChange}
                                        isInvalid={!!formik.errors.birthDate}
                                    />

                                    <FormBootstrap.Control.Feedback type="invalid">
                                        {formik.errors.birthDate}
                                    </FormBootstrap.Control.Feedback>
                                </FormBootstrap.Group>

                                <FormBootstrap.Group className="mb-2" as={Col} md="12" controlId="validationFormik05">
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
                                    />
                                    {/* <FormBootstrap.Control
                                        type="string"
                                        name="cpfCnpj"
                                        {...formik.getFieldProps('cpfCnpj')}
                                        // value={values.cpfCnpj}
                                        // onChange={handleChange}
                                        isInvalid={!!formik.errors.cpfCnpj}
                                    /> */}

                                    <FormBootstrap.Control.Feedback type="invalid">
                                        {formik.errors.cpfCnpj}
                                    </FormBootstrap.Control.Feedback>
                                </FormBootstrap.Group>
                                <FormBootstrap.Group className="mb-2" as={Col} md="12" controlId="validationFormik06">
                                    <FormBootstrap.Label className="mb-0">Senha</FormBootstrap.Label>
                                    <FormBootstrap.Control
                                        type="password"
                                        name="password"
                                        {...formik.getFieldProps('password')}
                                        // value={values.password}
                                        // onChange={handleChange}
                                        isInvalid={!!formik.errors.password}
                                    />

                                    <FormBootstrap.Control.Feedback type="invalid">
                                        {formik.errors.password}
                                    </FormBootstrap.Control.Feedback>
                                </FormBootstrap.Group>
                                <FormBootstrap.Group className="mb-2" as={Col} md="12" controlId="validationFormik07">
                                    <FormBootstrap.Label className="mb-0">Confirmar senha</FormBootstrap.Label>
                                    <FormBootstrap.Control
                                        type="password"
                                        name="passwordConfirmation"
                                        {...formik.getFieldProps('passwordConfirmation')}
                                        // value={values.passwordConfirmation}
                                        // onChange={handleChange}
                                        isInvalid={!!formik.errors.passwordConfirmation}
                                    />

                                    <FormBootstrap.Control.Feedback type="invalid">
                                        {formik.errors.passwordConfirmation}
                                    </FormBootstrap.Control.Feedback>
                                </FormBootstrap.Group>
                            </Row>
                            <FormBootstrap.Group className="pb-4">


                                <FormBootstrap.Check
                                    required
                                    name="receiveContact"
                                    label="Deseja receber contato?"
                                    // onChange={formik.handleChange}
                                    {...formik.getFieldProps('receiveContact')}
                                    id="validationFormik08"
                                />
                            </FormBootstrap.Group>
                            <div className="d-grid gap-2 pt-1">
                                <Button className="btn btn-primary" type="submit" disabled={loading}>
                                    {
                                        loading &&
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    }
                                    Cadastrar
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <div className="d-flex justify-content-center">
                    <label className='px-1 text-grey'>Já é cadastrado?</label>
                    <Link to="/login" className='text-decoration-none' >
                        Faça login
                    </Link>
                </div>

            </div>

        </BaseLayout>
    );
}


export default withSnackbar(Register)