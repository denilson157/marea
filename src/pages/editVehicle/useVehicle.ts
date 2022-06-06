import { IUser, IVehicle } from 'interfaces';
import { useState, useEffect, useContext } from 'react'
import * as VehicleInfoService from '../../services/vehicleInfoService'
import * as UserService from '../../services/userService'
import { retornarUrlMarcas, retornarUrlModelo, urlIbgeEstados } from "util/mock";
import * as EditVehicleService from "../../services/vehicleEditService";
import { AuthContext } from "contexts/auth"
import { VehicleBrandModelAPI } from "interfaces/VehicleAPI";

const initialValues: IVehicle = {
    id: '',
    ano: 0,
    arCondicionado: false,
    cambio: '',
    cidade: '',
    cilindradas: '',
    clientId: '',
    dataKms: '',
    descricao: '',
    finalPlaca: '',
    kms: 0,
    marca: '',
    modelo: '',
    preco: '',
    tipoCombustivel: '',
    tipoVeiculo: '',
    uf: '',
    fotosUrl: []
}

export const useVehicle = () => {

    const { user } = useContext<any>(AuthContext);
    const [loading, setLoading] = useState(false);
    const [vehicleLoaded, setVehicleLoaded] = useState(false);
    const [userInfo, setUserInfo] = useState<IUser>(undefined);
    const [vehicle, setVehicle] = useState<IVehicle>(initialValues);
    const [initialVehicle, setInitialVehicle] = useState<IVehicle>(initialValues);
    const [redirectUser, setRedirectUser] = useState(false);

    const [imagem, setImagem] = useState([]);

    const [estados, setEstados] = useState([{ id: undefined, sigla: "  ", nome: "Carregando" }]);

    const [cidades, setCidades] = useState([{ id: undefined, nome: "Selecione a cidade" }]);


    const [modelos, setModelos] = useState<VehicleBrandModelAPI[]>([]);
    const [marcas, setMarcas] = useState<VehicleBrandModelAPI[]>([]);


    const preencherMarcas = (tipoVeiculo: string) => {

        if (tipoVeiculo !== 'Selecione') {
            fetch(retornarUrlMarcas(tipoVeiculo === "Carro" ? 'carros' : 'motos'))
                .then((response) => response.json())
                .then((data) => setMarcas(data));
        } else {
            setModelos([])
            setMarcas([])
        }

    }

    const preencherModelos = (tipoVeiculo: string, codigoMarca: string) => {

        if (codigoMarca !== 'Selecione' && tipoVeiculo !== 'Selecione') {
            fetch(retornarUrlModelo(tipoVeiculo === "Carro" ? 'carros' : 'motos', codigoMarca))
                .then((response) => response.json())
                .then((data) => setModelos(data.modelos));
        } else {
            setModelos([])
        }
    }



    useEffect(() => {

        function returnUfs() {
            fetch(urlIbgeEstados)
                .then((response) => response.json())
                .then((data) => {
                    setEstados(data)

                });
        }

        returnUfs();


        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (vehicle.id !== '' && estados.length > 0) {

            fetch(`${urlIbgeEstados}/` + estados.find(x => x.sigla === vehicle.uf)?.id + "/municipios")
                .then((response) => response.json())
                .then((dataCidade) => {
                    setCidades(dataCidade)
                });
                
            const tipoVeiculo = vehicle.tipoVeiculo === "Carro" ? 'carros' : 'motos';

            fetch(retornarUrlMarcas(tipoVeiculo))
                .then((response) => response.json())
                .then((marcas) => {
                    setMarcas(marcas)

                    fetch(retornarUrlModelo(tipoVeiculo, marcas.find(m => m.nome === vehicle.marca)?.codigo))
                        .then((response) => response.json())
                        .then((modelos) => setModelos(modelos.modelos));
                });

        }
    }, [estados, vehicle])

    const listaFotos = (fotos: string[]) => {
        setVehicle({
            ...vehicle,
            fotosUrl: fotos
        });
        setInitialVehicle({
            ...initialVehicle,
            fotosUrl: fotos
        });
    }

    const loadVehicle = (vehicleId: string) => {
        setLoading(true)
        loadUserInfo()
            .then((a) => {
                VehicleInfoService.getData(vehicleId)
                    .then(respVehicle => {

                        setVehicleLoaded(true)
                        setVehicle(respVehicle)
                        setInitialVehicle(respVehicle)

                    })
                    .catch(() => {

                    })
                    .finally(() => setLoading(false))
            })
    }

    const loadUserInfo = (): Promise<IUser> => {
        return new Promise((resolve, reject) => {

            UserService.getData()
                .then(_userInfo => {
                    setUserInfo(_userInfo)
                    resolve(_userInfo)
                })
        })
    }

    const handleFavoriteVehicle = (vehicleId: string) => {
        setLoading(true)
        UserService.updateFavoriteVehicle(vehicleId)
            .then(fVehiclesUpdated => {

                const objAtt = {
                    ...userInfo,
                    favorites_vehicles: fVehiclesUpdated
                }

                setUserInfo(objAtt)
            })
            .finally(() => setLoading(false))
    }


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

    const deleteFile = (foto) => {
        let nome_foto = foto;
        nome_foto = nome_foto.split("%2F");
        let foto_nome = nome_foto[1].split("?");
        let excluir_foto = initialVehicle.fotosUrl.filter(nome_foto => !nome_foto.includes(foto));
        EditVehicleService.deleteImage(foto_nome[0]).then(() => {
            const objAdd = {
                ...initialVehicle,
                fotosUrl: excluir_foto,
            };
            EditVehicleService.updateData(objAdd)
                .then(() => {
                    listaFotos(excluir_foto);
                    setImagem([]);
                })
                .catch((erro) => {
                    console.log(erro);
                });
        });
    };

    const edit_vehicle = (obj, snackbarShowMessage: any) => {
        setLoading(true)
        const objAdd = {
            ano: obj.ano,
            arCondicionado: obj.arCondicionado,
            cambio: obj.cambio,
            cidade: obj.cidade,
            cilindradas: obj.cilindradas,
            clientId: obj.clientId,
            dataKms: obj.dataKms,
            descricao: obj.descricao,
            finalPlaca: obj.finalPlaca,
            kms: obj.kms,
            marca: obj.marca,
            modelo: obj.modelo,
            tipoCombustivel: obj.tipoCombustivel,
            tipoVeiculo: obj.tipoVeiculo,
            uf: obj.uf,
            fotosUrl: vehicle.fotosUrl,
            preco: obj.preco,
            id: vehicle?.id,
        };
        EditVehicleService.updateData(objAdd)
            .then(() => {

                snackbarShowMessage("Veículo atualizado com sucesso", "success");
            })
            .catch((erro) => {
                console.log(erro);
                snackbarShowMessage("Erro ao editar veículo", "error");
            })
            .finally(() => setLoading(false));
    };


    return {
        loading,
        vehicle,
        initialVehicle,
        redirectUser,
        listaFotos,
        loadVehicle,
        handleFavoriteVehicle,
        userInfo,
        setRedirectUser,
        returnCidades,
        handleFile,
        deleteFile,
        edit_vehicle,
        estados,
        cidades,
        user,
        imagem,
        setImagem,
        vehicleLoaded,
        modelos,
        marcas,
        preencherMarcas,
        preencherModelos,
        setLoading
    }


}