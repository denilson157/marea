import React from "react";
import { Helmet } from "react-helmet";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { BaseLayout, MainLayout } from "../components/template";
import { Form as FormBootstrap, Col, Button, Row } from 'react-bootstrap'
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    margin: "0px",
    width: "100%",
    maxWidth: "100%",
  },
}));


const NewVehicle = () => {

function returnUfs(){
    var ufs = '';
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response => ufs = response.json())
    .then(console.log)
    return ufs
}

const data = returnUfs()

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
            <form id="post-form" className="post-form" method="post">
              <h2>Cadastro de veículo</h2>
              <div className="row">
                <div className="col-2">
                  <div class="form-group">
                    <label for="select_marca">Marca:</label>
                    <select class="form-control" id="select_marca">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
                <div className="col-2">
                  <div class="form-group">
                    <label for="select_modelo">Modelo:</label>
                    <select class="form-control" id="select_modelo">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
                <div className="col-1">
                  <div class="form-group">
                    <label for="input_final_placa">Final da placa:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="input_final_placa"
                      placeholder="Ex.: 0"
                    />
                  </div>
                </div>
                <div className="col-1">
                  <div class="form-group">
                    <label for="input_ano">Ano do veículo:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="input_ano"
                      placeholder="Ex.: 2015"
                    />
                  </div>
                </div>
                <div className="col-2">
                  <div class="form-group">
                    <label for="input_km">
                      Quilometragem atual do veículo:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="input_km"
                      placeholder="Ex.: 200.000km"
                    />
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "2vh" }}>
                <div className="col-1">
                  <div class="form-group">
                    <label for="input_ano">Tipo de veículo:</label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio_carro"
                        id="radio_carro"
                      />
                      <label class="form-check-label" for="radio_carro">
                        Carro
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio_moto"
                        id="radio_moto"
                      />
                      <label class="form-check-label" for="radio_moto">
                        Moto
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div class="form-group">
                    <label for="input_ano">Tipo de combustível:</label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio_gasolina"
                        id="radio_gasolina"
                      />
                      <label class="form-check-label" for="radio_gasolina">
                        Gasolina
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio_flex"
                        id="radio_flex"
                      />
                      <label class="form-check-label" for="radio_flex">
                        Flex
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div class="form-group">
                    <label for="select_cilindradas">Cilindradas:</label>
                    <select class="form-control" id="select_cilindradas">
                      <option>1.0</option>
                      <option>2.0</option>
                      <option>3.0</option>
                      <option>4.0</option>
                      <option>5.0</option>
                    </select>
                  </div>
                </div>
                <div className="col-2">
                  <div class="form-group">
                    <label for="select_estado">Estado:</label>
                    <select class="form-control" id="select_estado">
                         {
                            
                         }
                    </select>
                  </div>
                </div>
                <div className="col-2">
                  <div class="form-group">
                    <label for="select_cidade">Cidade:</label>
                    <select class="form-control" id="select_cidade">
                      <option>VOU COLOCAR API PRA FORNECER ESSES DADOS</option>
                    </select>
                  </div>
                </div>
                <div className="col-1">
                  <div class="form-group">
                    <label for="input_ano">Possui ar-condicionado?:</label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio_ac_sim"
                        id="radio_ac_sim"
                      />
                      <label class="form-check-label" for="radio_ac_sim">
                        Sim
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio_ac_nao"
                        id="radio_ac_nao"
                      />
                      <label class="form-check-label" for="radio_ac_nao">
                        Não
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div class="form-group">
                    <label for="input_ano">Câmbio:</label>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio_manual"
                        id="radio_manual"
                      />
                      <label class="form-check-label" for="radio_manual">
                        Manual
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="radio_automatico"
                        id="radio_automatico"
                      />
                      <label class="form-check-label" for="radio_automatico">
                        Automático
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ marginTop: "2vh" }}>
                <div className="col-6">
                  <label for="txtarea_descricao">Descrição:</label>
                  <textarea
                    class="form-control"
                    id="txtarea_descricao"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <div className="row" style={{ marginTop: "2vh" }}>
                <div className="col-11">
                  <div className="row">
                    <h4 for="fotos">Adicionar fotos: </h4>
                    <input id="fotos" type="file" multiple />
                  </div>
                  <div className="row">
                    <output id="result" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <Button type="submit" className="btn btn-primary">
                    Salvar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Container>
      </Grid>
    </MainLayout>
  );
};

export default NewVehicle;
