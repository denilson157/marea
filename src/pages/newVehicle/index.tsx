import { UseNewVehicle } from "./useNewVehicle";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { MainLayout } from "../../components/template";
import { Form as FormBootstrap, Col, Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik, Form } from "formik"; import { withSnackbar } from "util/Snackbar";
import InputMask from 'react-input-mask';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        margin: "0px",
        width: "100%",
        maxWidth: "100%",
    },
}));

const schema = yup.object().shape({
    ano: yup.date().required("Referência de quilometragem requerida"),
    arCondicionado: yup
        .string()
        .required("Informar se o veículo possui ou não ar condicionado"),
    cambio: yup.string().required("Tipo de câmbio requerido"),
    cidade: yup.string().required("Cidade requerida"),
    cilindradas: yup.string().required("Cilindradas requeridas"),
    descricao: yup.string().required("Preencha a descrição do veículo"),
    finalPlaca: yup.string().required("Final da placa requerido"),
    kms: yup.string().required("Quilometragem atual requerida"),
    dataKms: yup.string().required("Data da quilometragem atual requerida"),
    marca: yup.string().required("Marca requerida"),
    modelo: yup.string().required("Modelo requerido"),
    preco: yup.string().required("Preço requerido"),
    tipoCombustivel: yup.string().required("Tipo de combustível requerido"),
    tipoVeiculo: yup.string().required("Tipo de veículo requerido"),
    // uf: yup.string().required("Estado requerido")
});
const NewVehicle = ({ snackbarShowMessage }) => {

    const {
        estados,
        cidades,
        save_vehicle,
        returnCidades,
        handleFile,
        loading
    } = UseNewVehicle()
    const classes = useStyles();

    return (
        <MainLayout>
            <Grid item sm={12}>
                <Container className={classes.container}>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting }) => {
                            save_vehicle(values, snackbarShowMessage);

                            setTimeout(() => {
                                setSubmitting(false);
                            }, 400);
                        }}
                        initialValues={{
                            ano: undefined,
                            arCondicionado: undefined,
                            cambio: undefined,
                            cidade: undefined,
                            cilindradas: undefined,
                            descricao: undefined,
                            finalPlaca: undefined,
                            kms: undefined,
                            marca: undefined,
                            dataKms: undefined,
                            modelo: undefined,
                            tipoCombustivel: undefined,
                            uf: undefined,
                            tipoVeiculo: undefined,
                            preco: undefined
                        }}
                    >
                        {(formik) => {
                            console.log(formik)
                            return (
                                <Form
                                    id="post-form"
                                    className="post-form"
                                    method="post"
                                    onSubmit={(values) => {
                                        formik.handleSubmit(values);
                                    }}
                                >
                                    <h2>Cadastro de veículo</h2>
                                    <div className="row">
                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="2"
                                            controlId="validationFormik04"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Marca:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                name="manual"
                                                {...formik.getFieldProps("marca")}
                                                isInvalid={!!formik.errors.marca && formik.touched.marca === true}
                                            >
                                                <option>Selecione a marca do veículo</option>
                                                <option>Fort</option>
                                                <option>Fiat</option>
                                                <option>Toyota</option>
                                                <option>Jeep</option>
                                                <option>Renault</option>
                                                <option>Chevrolet</option>
                                                <option>Volkswagen</option>
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.marca}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="2"
                                            controlId="validationFormik04"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Modelo:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                name="modelo"
                                                {...formik.getFieldProps("modelo")}
                                                isInvalid={!!formik.errors.modelo && formik.touched.modelo === true}
                                            >
                                                <option>Selecione...</option>
                                                <option>Fiat Uno</option>
                                                <option>Renault Sandero</option>
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.modelo}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="1"
                                            controlId="validationFormik02"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Final da placa:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Control
                                                type="text"
                                                name="kms"
                                                placeholder="Ex.: 0"
                                                {...formik.getFieldProps("finalPlaca")}
                                                // value={values.email}
                                                isInvalid={!!formik.errors.finalPlaca && formik.touched.finalPlaca === true}
                                            />

                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.finalPlaca}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="1"
                                            controlId="validationFormik02"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Ano do veículo:
                                            </FormBootstrap.Label>
                                            <InputMask
                                                type="string"
                                                name="ano"
                                                {...formik.getFieldProps('ano')}
                                                mask="9999"
                                                className="form-control"
                                                isInvalid={!!formik.errors.ano}
                                            />
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.ano}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="2"
                                            controlId="validationFormik02"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Quilometragem atual do veículo:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Control
                                                type="number"
                                                name="kms"
                                                placeholder="Ex.: 200.000km"
                                                {...formik.getFieldProps("kms")}
                                                // value={values.email}
                                                isInvalid={!!formik.errors.kms && formik.touched.kms === true}
                                            />

                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.kms}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="2"
                                            controlId="validationFormik04"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Data da quilometragem:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Control
                                                type="date"
                                                name="dataKms"
                                                {...formik.getFieldProps("dataKms")}
                                                isInvalid={!!formik.errors.dataKms && formik.touched.dataKms === true}
                                            />
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.dataKms}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>
                                    </div>

                                    <div className="row" style={{ marginTop: "2vh" }}>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="2"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Tipo de veículo:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                name="tipoVeiculo"
                                                {...formik.getFieldProps("tipoVeiculo")}
                                                isInvalid={!!formik.errors.tipoVeiculo && formik.touched.tipoVeiculo === true}
                                            >
                                                <option>Selecione...</option>
                                                <option>Carro</option>
                                                <option>Moto</option>
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.tipoVeiculo}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="2"
                                            controlId="validationFormik04"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Combustível:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                name="tipoCombustivel"
                                                {...formik.getFieldProps("tipoCombustivel")}
                                                isInvalid={!!formik.errors.tipoCombustivel && formik.touched.tipoCombustivel === true}
                                            >
                                                <option>Selecione...</option>
                                                <option>Gasolina</option>
                                                <option>Flex</option>
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.tipoCombustivel}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="1"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Cilindradas:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                name="cilindradas"
                                                {...formik.getFieldProps("cilindradas")}
                                                isInvalid={!!formik.errors.cilindradas && formik.touched.cilindradas === true}
                                            >
                                                <option>Selecione...</option>
                                                <option>0</option>
                                                <option>1</option>
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.cilindradas}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="1"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Estado:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                {...formik.getFieldProps("uf")}
                                                isInvalid={!!formik.errors.uf && formik.touched.uf === true}
                                                onChange={(e) => {
                                                    console.log(e)
                                                    formik.handleChange(e)
                                                    returnCidades(e)
                                                }}
                                            >
                                                <option>Selecione...</option>

                                                {estados.map((estado) => (
                                                    <option value={estado.sigla}>{estado.nome}</option>
                                                ))}
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.uf}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="1"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Cidade:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                {...formik.getFieldProps("cidade")}
                                                isInvalid={!!formik.errors.cidade && formik.touched.cidade === true}
                                            >
                                                <option>Selecione...</option>
                                                {cidades.map((cidade) => (
                                                    <option value={cidade.nome}>{cidade.nome}</option>
                                                ))}
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.cidade}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="2"
                                            controlId="validationFormik04"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Possui ar-condicionado?
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                name="arCondicionado"
                                                {...formik.getFieldProps("arCondicionado")}
                                                isInvalid={!!formik.errors.arCondicionado && formik.touched.arCondicionado === true}
                                            >
                                                <option>Selecione...</option>
                                                <option>Sim</option>
                                                <option>Não</option>
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.arCondicionado}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="1"
                                            controlId="validationFormik04"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Câmbio:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Select
                                                name="cambio"
                                                {...formik.getFieldProps("cambio")}
                                                isInvalid={!!formik.errors.cambio && formik.touched.cambio === true}
                                            >
                                                <option>Selecione...</option>
                                                <option>Manual</option>
                                                <option>Automático</option>
                                            </FormBootstrap.Select>
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.cambio}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>


                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="1"
                                            controlId="validationFormik090"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Preço:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Control
                                                type="number"
                                                name="preco"
                                                placeholder="Ex.: 20000"
                                                {...formik.getFieldProps("preco")}
                                                // value={values.email}
                                                isInvalid={!!formik.errors.preco && formik.touched.preco === true}
                                            />
                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.preco}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>

                                    </div>
                                    <div className="row" style={{ marginTop: "2vh" }}>
                                        <FormBootstrap.Group
                                            className="mb-2"
                                            as={Col}
                                            md="12"
                                            controlId="validationFormik02"
                                        >
                                            <FormBootstrap.Label className="mb-0">
                                                Descrição:
                                            </FormBootstrap.Label>
                                            <FormBootstrap.Control
                                                type="text"
                                                name="descricao"
                                                placeholder="Ex.: 0"
                                                {...formik.getFieldProps("descricao")}
                                                // value={values.email}
                                                isInvalid={!!formik.errors.descricao && formik.touched.descricao === true}
                                            />

                                            <FormBootstrap.Control.Feedback type="invalid">
                                                {formik.errors.descricao}
                                            </FormBootstrap.Control.Feedback>
                                        </FormBootstrap.Group>
                                    </div>

                                    <div className="row" style={{ marginTop: "2vh" }}>
                                        <div className="col-11">
                                            <div className="row">
                                                <h4>Adicionar fotos: </h4>
                                                <input
                                                    id="fotos"
                                                    type="file"
                                                    onChange={handleFile}
                                                    multiple
                                                    accept="image/*"
                                                />
                                            </div>
                                            <div className="row">
                                                <output id="result" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="d-grid gap-2 pt-1">
                                                <Button className="btn btn-primary" type="submit">
                                                    {
                                                        loading &&
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    }
                                                    Cadastrar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                        }
                    </Formik>
                </Container>
            </Grid>
        </MainLayout>
    );
};

export default withSnackbar(NewVehicle);
