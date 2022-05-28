import React, { useContext, useEffect } from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { MainLayout } from "../components/template";
import { Form as FormBootstrap, Col, Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik, Form } from "formik";
import * as VehicleService from "../services/vehicleService";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../services/firebaseConfig";
import { AuthContext } from "contexts/auth";
import { convertToObject } from "typescript";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    margin: "0px",
    width: "100%",
    maxWidth: "100%",
  },
}));

const schema = yup.object().shape({
  //ano: yup.date().required("Referência de quilometragem requerida"),
  //arCondicionado: yup
  //  .bool()
  //  .required("Informar se o veículo possui ou não ar condicionado"),
  //cambio: yup.string().required("Tipo de câmbio requerido"),
  //cidade: yup.string().required("Cidade requerida"),
  //cilindradas: yup.string().required("Cilindradas requeridas"),
  //descricao: yup.string().required("Preencha a descrição do veículo"),
  //finalPlaca: yup.string().required("Final da placa requerido"),
  //kms: yup.string().required("Quilometragem atual requerida"),
  //dataKms: yup.string().required("Data da quilometragem atual requerida"),
  //marca: yup.string().required("Marca requerida"),
  //modelo: yup.string().required("Modelo requerido"),
  //preco: yup.string().required("Preço requerido"),
  //tipoCombustivel: yup.string().required("Tipo de combustível requerido"),
  //tipoVeiculo: yup.string().required("Tipo de veículo requerido"),
  //uf: yup.string().required("Estado requerido"),
});
const NewVehicle = ({ snackbarShowMessage }) => {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    console.log('reload');

    function returnUfs() {
      var ufs = "";
      fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((response) => (ufs = response.json()))
        .then((data) => setEstados(data));
      return ufs;
    }

    returnUfs();
  }, []);

  const [imagem, setImagem] = React.useState([]);

  const [estados, setEstados] = React.useState([
    { id: 0, sigla: "  ", nome: "Carregando" },
  ]);

  const [cidades, setCidades] = React.useState([
    { id: 0, nome: "Selecione a cidade" },
  ]);

  const uploadFiles = (file) => {
    return new Promise((resolve) => {
      if (!file) return;
      const storageRef = ref(storage, `files/${user.uid + "_" + file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const prog = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
        },
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const save_vehicle = (obj) => {
    let promise = [];
    imagem.forEach((i) => {
      promise.push(uploadFiles(i));
    });
    Promise.all(promise).then((e) => {
      const objAdd = {
        ano: obj.ano,
        arCondicionado: obj.arCondicionado,
        cambio: obj.cambio,
        cidade: obj.cidade,
        cilindradas: obj.cilindradas,
        clientId: user.uid,
        dataKms: obj.dataKms,
        descricao: obj.descricao,
        finalPlaca: obj.finalPlaca,
        kms: obj.kms,
        marca: obj.marca,
        modelo: obj.modelo,
        tipoCombustivel: obj.tipoCombustivel,
        tipoVeiculo: obj.tipoVeiculo,
        uf: obj.uf,
        fotosUrl: e,
      };

      VehicleService.pushData(objAdd)
        .then(() => {
          snackbarShowMessage("Veículo cadastrado com sucesso", "success");
        })
        .catch((erro) => {
          console.log(erro);
          snackbarShowMessage("Erro ao cadastrar veículo", "error");
        });
    });
  };

  function returnCidades(e) {
    var cidades = "";
    fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + e.target.value + "/municipios"
    )
      .then((response) => (cidades = response.json()))
      .then((data) => setCidades(data));
    return cidades;
  }

  // const image = useRef();

  // async function handleNewPost() {
  //   let image_t = await uploadImage(image.current.files);
  // }

  // async function uploadImage(imagem) {
  //   console.log(imagem);
  // }

  function handleFile(e) {
    let imagens = [];
    imagem.forEach((i) => {
      imagens.push(i);
    });
    imagens.push(e.target.files[0]);
    setImagem(imagens);
    console.log(imagens);
  }

  window.onload = function () {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
      var filesInput = document.getElementById("fotos");
      filesInput.addEventListener("change", function (event) {
        var files = event.target.files; //FileList object
        var output = document.getElementById("result");
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          //Only pics
          if (!file.type.match("image")) continue;
          var picReader = new FileReader();
          picReader.addEventListener("load", function (event) {
            var picFile = event.target;
            var div = document.createElement("div");
            div.innerHTML =
              "<img class='thumbnail' style='float:left; height: 175px; margin: 10px' src='" +
              picFile.result +
              "'" +
              "title='" +
              picFile.name +
              "'/>";
            output.insertBefore(div, null);
          });
          //Read the image
          picReader.readAsDataURL(file);
        }
      });
    } else {
      console.log("Your browser does not support File API");
    }
  };

  const classes = useStyles();

  return (
    <MainLayout>
      <Grid item sm={12}>
        <Container className={classes.container}>
          <div name="form_vehicle">
            <Formik
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                save_vehicle(values);
                console.log(values);
                setTimeout(() => {
                  setSubmitting(false);
                }, 400);
              }}
              initialValues={{
                ano: "",
                arCondicionado: "",
                cambio: "",
                cidade: "",
                cilindradas: "",
                descricao: "",
                finalPlaca: "",
                kms: "",
                marca: "",
                modelo: "",
                tipoCombustivel: "",
                uf: "",
              }}
            >
              {(formik) => (
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
                        label="Manual"
                        {...formik.getFieldProps("marca")}
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
                        label="Manual"
                        {...formik.getFieldProps("modelo")}
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
                        isInvalid={!!formik.errors.finalPlaca}
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
                      <FormBootstrap.Control
                        type="text"
                        name="kms"
                        placeholder="Ex.: 2015"
                        {...formik.getFieldProps("ano")}
                        // value={values.email}
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
                        type="text"
                        name="kms"
                        placeholder="Ex.: 200.000km"
                        {...formik.getFieldProps("kms")}
                        // value={values.email}
                        isInvalid={!!formik.errors.kms}
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
                        isInvalid={!!formik.errors.dataKms}
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
                        name="manual"
                        label="Manual"
                        {...formik.getFieldProps("tipoVeiculo")}
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
                        name="manual"
                        label="Manual"
                        {...formik.getFieldProps("tipoCombustivel")}
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
                        name="manual"
                        label="Manual"
                        {...formik.getFieldProps("cilindradas")}
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
                        onChange={(e) => returnCidades}
                      >
                        <option>Selecione...</option>
                        {estados.map((estado) => (
                          <option value={estado.id}>{estado.nome}</option>
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
                      >
                        <option>Selecione...</option>
                        {cidades.map((cidade) => (
                          <option value={cidade.id}>{cidade.nome}</option>
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
                        Possui ar-condicionado?:
                      </FormBootstrap.Label>
                      <FormBootstrap.Select
                        name="manual"
                        label="Manual"
                        {...formik.getFieldProps("arCondicionado")}
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
                        name="manual"
                        label="Manual"
                        {...formik.getFieldProps("cambio")}
                      >
                        <option>Selecione...</option>
                        <option>Manual</option>
                        <option>Automático</option>
                      </FormBootstrap.Select>
                      <FormBootstrap.Control.Feedback type="invalid">
                        {formik.errors.cambio}
                      </FormBootstrap.Control.Feedback>
                    </FormBootstrap.Group>
                  </div>
                  <div className="row" style={{ marginTop: "2vh" }}>
                    <FormBootstrap.Group
                      className="mb-2"
                      as={Col}
                      md="10"
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
                        isInvalid={!!formik.errors.descricao}
                      />

                      <FormBootstrap.Control.Feedback type="invalid">
                        {formik.errors.descricao}
                      </FormBootstrap.Control.Feedback>
                    </FormBootstrap.Group>
                  </div>

                  <div className="row" style={{ marginTop: "2vh" }}>
                    <div className="col-11">
                      <div className="row">
                        <h4 for="fotos">Adicionar fotos: </h4>
                        <input
                          id="fotos"
                          type="file"
                          onChange={handleFile}
                          multiple
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
                          Cadastrar
                        </Button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Grid>
    </MainLayout>
  );
};

export default NewVehicle;
