import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Container, makeStyles, Grid } from '@material-ui/core';
import { MainLayout } from '../components/template';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'services/firebaseConfig';
import { Link } from "react-router-dom";
import { Button, Carousel } from 'react-bootstrap'
import { useUser } from './userInfo/useUser';
import { updateFavoriteVehicle } from 'services/userService';
import { retornarUrlMarcas, retornarUrlModelo } from 'util/mock';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        margin: "0px",
        width: "100%",
        maxWidth: "100%",
    },
}));


const Home = () => {
    const classes = useStyles();
    const [vehicles, setVehicles] = React.useState([]);

    //Pega dados do usuario
    const {
        loading,
        loadUser,
        user
    } = useUser()
    React.useEffect(() => {
        setTimeout(() => {
            loadUser()
        }, 800)


        // eslint-disable-next-line
    }, []);

    //Filtros
    const [anoDe, setAnoDe] = useState("");
    const [anoAte, setAnoAte] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [tipoVeiculo, setTipoVeiculo] = useState("");
    const [precoDe, setPrecoDe] = useState("");
    const [precoAte, setPrecoAte] = useState("");
    const [filtros, setFiltros] = useState([]);

    const [modelos, setModelos] = useState([]);
    const [marcas, setMarcas] = useState([]);

    const preencherMarcas = (tipoVeiculo) => {

        if (tipoVeiculo !== '') {
            fetch(retornarUrlMarcas(tipoVeiculo === "Carro" ? 'carros' : 'motos'))
                .then((response) => response.json())
                .then((data) => setMarcas(data));
        } else {
            setModelos([])
            setMarcas([])
        }

    }

    const preencherModelos = (tipoVeiculo, codigoMarca) => {

        if (codigoMarca !== '' && tipoVeiculo !== '') {
            fetch(retornarUrlModelo(tipoVeiculo === "Carro" ? 'carros' : 'motos', codigoMarca))
                .then((response) => response.json())
                .then((data) => setModelos(data.modelos));
        } else {
            setModelos([])
        }
    }


    //Desabilita filtros de ano e preco quando um dos dois é preenchido
    //Essa ação por enquanto é necessario pois o Firebase possui limitação para filtros de >= e <= para apenas um campo
    const [disableAno, setDisableAno] = React.useState(false);
    const [disablePreco, setDisablePreco] = React.useState(false);
    React.useEffect(() => {
        setDisablePreco(anoDe.length > 0 || anoAte.length > 0);
        setDisableAno(precoDe.length > 0 || precoAte.length > 0);
    }, [anoDe, anoAte, precoDe, precoAte]);


    function handleBusca() {
        const arrayBusca = [];
        if (marca.length > 0)
            arrayBusca.push(where('marca', '==', marca))
        if (modelo.length > 0)
            arrayBusca.push(where('modelo', '==', modelo));

        if (!disableAno && anoDe.length > 0)
            arrayBusca.push(where('ano', '>=', parseInt(anoDe)));
        if (!disableAno && anoAte.length > 0)
            arrayBusca.push(where('ano', '<=', parseInt(anoAte)));

        if (!disablePreco && precoDe.length > 0)
            arrayBusca.push(where('preco', '>=', parseInt(precoDe)));
        if (!disablePreco && precoAte.length > 0)
            arrayBusca.push(where('preco', '<=', parseInt(precoAte)));

        setFiltros(arrayBusca);
    }

    React.useEffect(() => {
        const busca = query(
            collection(db, 'vehicles'), ...filtros
        );

        onSnapshot(busca, (querySnapshot => {
            setVehicles(querySnapshot.docs);
        }));
    }, [filtros]);

    function handleFavorite(e) {
        updateFavoriteVehicle(e.target.getAttribute("value"))
            .then(() => {
                loadUser();
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <MainLayout>
            <Grid item sm={12}>
                <Container className={classes.container}>
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                    <div className='row'>
                        <div className='col-12 col-md-2'>
                            <div className='container bg-white shadow p-3 mt-3'>
                                <div className="input-group flex-nowrap d-none">
                                    <input type="text" className="form-control" placeholder="Pesquisar" aria-describedby="addon-wrapping" />
                                    <button onClick={handleBusca} className="input-group-text material-icons" id="addon-wrapping">search</button>
                                </div>

                                <div className=''>
                                    <label className='pb-1'>Preço</label>
                                    <div className='d-flex justify-content-between'>
                                        <input onChange={(e) => setPrecoDe(e.target.value)} disabled={disablePreco} className='form-control me-2' type="text" placeholder='De' />
                                        <input onChange={(e) => setPrecoAte(e.target.value)} disabled={disablePreco} className='form-control ms-2' type="text" placeholder='Até' />
                                    </div>
                                </div>

                                <div className='pt-3'>
                                    <label className='pb-1'>Ano</label>
                                    <div className='d-flex justify-content-between'>
                                        <input onChange={(e) => setAnoDe(e.target.value)} disabled={disableAno} className='form-control me-2' type="text" placeholder='De' />
                                        <input onChange={(e) => setAnoAte(e.target.value)} disabled={disableAno} className='form-control ms-2' type="text" placeholder='Até' />
                                    </div>
                                </div>

                                <select className="form-select mt-4" defaultValue="" onChange={(e) => {

                                    setTipoVeiculo(e.target.value)
                                    preencherMarcas(e.target.value)
                                }}>
                                    <option value="">Tipo Veículo</option>
                                    <option value="Carro">Carro</option>
                                    <option value="Moto">Moto</option>
                                </select>

                                <select className="form-select mt-4" defaultValue="" onChange={(e) => {
                                    setMarca(e.target.value)
                                    preencherModelos(tipoVeiculo, marcas.find(m => m.nome === e.target.value)?.codigo)
                                }}>
                                    <option value="">Marca</option>
                                    {
                                        marcas.map(m =>
                                            <option value={m.nome}>{m.nome}</option>
                                        )
                                    }
                                </select>

                                <select className="form-select mt-4" defaultValue="" onChange={(e) => setModelo(e.target.value)}>

                                    <option value="">Modelo</option>
                                    {
                                        modelos.map(m =>
                                            <option value={m.nome}>{m.nome}</option>
                                        )
                                    }
                                </select>

                                <Button className="btn btn-primary mt-4 w-100" type="button" onClick={handleBusca}>Pesquisar</Button>
                            </div>
                            <div className='container bg-white shadow p-3 mt-3'>
                                <span>AD</span>
                            </div>
                        </div>
                        <div className='col-12 col-md-8 d-flex justify-content-center'>
                            <div className='row'>
                                {
                                    vehicles.map((vehicle, index) =>
                                        <div key={index} className='container bg-white shadow p-3 m-3' style={{ maxWidth: '330px' }}>
                                            <Carousel className="carousel-pictures">
                                                {
                                                    vehicle.data().fotosUrl.map((f, i) =>
                                                        <Carousel.Item>
                                                            <img
                                                                className='d-block pb-1 img-fluid'
                                                                style={{ height: '200px', objectFit: 'cover' }}
                                                                src={f}
                                                                alt={`slide_${i}`}
                                                            />
                                                        </Carousel.Item>
                                                    )
                                                }
                                            </Carousel>
                                            <div className='d-flex justify-content-between pb-1'>
                                                <Link to={"/vehicle_info/" + vehicle.data().id} className="d-flex justify-content-between w-100 text-decoration-none text-reset">
                                                    <span>{vehicle.data().marca + ' ' + vehicle.data().modelo}</span>
                                                    <span>{vehicle.data().ano}</span>
                                                </Link>
                                                {
                                                    user &&
                                                    <button type="button" class="btn color-primary p-0 h-auto" onClick={handleFavorite}>
                                                        <span className="material-icons" value={vehicle.data().id}>
                                                            {
                                                                !loading && user && user.favorites_vehicles.includes(vehicle.data().id) ?
                                                                    "favorite" :
                                                                    "favorite_border"
                                                            }
                                                        </span>
                                                    </button>
                                                }
                                            </div>
                                            <Link to={"/vehicle_info/" + vehicle.data().id} className="text-decoration-none text-reset">
                                                <div className='d-flex pb-2'>
                                                    <span className='text-muted pe-2'>{vehicle.data().tipoCombustivel}</span>
                                                    <span className='text-muted pe-2'>{vehicle.data().cambio}</span>
                                                    <span className='text-muted ms-auto'>{vehicle.data().kms + 'km'}</span>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <span>{'R$ ' + vehicle.data().preco}</span>
                                                    <span>{vehicle.data().cidade + '-' + vehicle.data().uf}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='col-12 col-md-2'>
                            <div className='container bg-white shadow p-3 mt-3'>
                                <span>ADs</span>
                            </div>
                        </div>
                    </div>

                </Container>
            </Grid>
        </MainLayout>
    );
}

export default Home;
