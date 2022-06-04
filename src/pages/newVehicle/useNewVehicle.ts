import { useContext, useEffect, useState } from "react";
import * as VehicleService from "../../services/vehicleService";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../services/firebaseConfig";
import { AuthContext } from "contexts/auth";
import { urlIbgeEstados } from "util/mock";

export const UseNewVehicle = () => {
    const { user } = useContext<any>(AuthContext);

    useEffect(() => {

        function returnUfs() {
            fetch(urlIbgeEstados)
                .then((response) => response.json())
                .then((data) => setEstados(data));
        }

        returnUfs();
    }, []);

    const [imagem, setImagem] = useState([]);
    const [loading, setLoading] = useState(false);

    const [estados, setEstados] = useState([{ id: 0, sigla: "  ", nome: "Carregando" }]);

    const [cidades, setCidades] = useState([{ id: 0, nome: "Selecione a cidade" }]);

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

    const save_vehicle = (obj, snackbarShowMessage: any) => {
        setLoading(true)
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
                preco: obj.preco,
                fotosUrl: e,
            };

            VehicleService.pushData(objAdd)
                .then(() => {
                    snackbarShowMessage("Veículo cadastrado com sucesso", "success");
                })
                .catch((erro) => {
                    console.log(erro);
                    snackbarShowMessage("Erro ao cadastrar veículo", "error");
                })
                .finally(() => setLoading(false));
        })
            .catch(() => setLoading(false));
    };

    const returnCidades = (e) => {
        fetch(`${urlIbgeEstados}/` + e.target.value + "/municipios")
            .then((response) => response.json())
            .then((data) => setCidades(data));
    }


    const handleFile = (e) => {
        let imagens = [];

        imagem.forEach((i) => {
            imagens.push(i);
        });

        imagens.push(e.target.files[0]);

        setImagem(imagens);

    }

    window.onload = function () {
        //Check File API support
        if (window.File && window.FileList && window.FileReader) {
            let filesInput = document.getElementById("fotos");
            filesInput.addEventListener("change", function (event: any) {
                let files = event.target.files; //FileList object
                let output = document.getElementById("result");
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    //Only pics
                    if (!file.type.match("image")) continue;
                    let picReader = new FileReader();
                    picReader.addEventListener("load", function (event) {
                        let picFile = event.target as any;
                        let div = document.createElement("div");
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
        }
    };

    return {
        estados,
        loading,
        cidades,
        save_vehicle,
        returnCidades,
        handleFile
    }

}