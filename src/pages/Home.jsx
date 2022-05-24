import React from 'react'
import { Helmet } from 'react-helmet';
import { Container, makeStyles, Grid } from '@material-ui/core';
import { MainLayout } from '../components/template';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'services/firebaseConfig';
import { Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        margin: '0px',
        width: '100%',
        maxWidth: '100%'
    },
}));


const Home = () => {
    const [vehicles, setVehicles] = React.useState([]);
    const [anoDe, setAnoDe] = React.useState([]);
    const [anoAte, setAnoAte] = React.useState([]);
    const [marca, setMarca] = React.useState([]);
    const [modelo, setModelo] = React.useState([]);
    const [precoDe, setPrecoDe] = React.useState([]);
    const [precoAte, setPrecoAte] = React.useState([]);
    const [busca, setBusca] = React.useState({
        anoDe: 0,
        anoAte: 0,
        marca: "",
        modelo: "",
        precoDe: 0,
        precoAte: 0
    });

    function handleBusca(){
        setBusca({
            anoDe: anoDe,
            anoAte: anoAte,
            marca: marca,
            modelo: modelo,
            precoDe: precoDe != "" ? precoDe : 0,
            precoAte: precoAte != "" ? precoAte : 0
        });
    }

    React.useEffect(() =>{
        //const busca = query(collection(db, 'vehicles'), where('marca', '==',  'Scania'), where('modelo', '==', '111S'));
        //const busca = query(collection(db, 'vehicles'), where('preco', '>=',  500), where('preco', '<=',  1000));
        const novaBusca = query(
            collection(db, 'vehicles'), 
            /*where('ano', busca.anoDe != 0 ? '>=' : 'not-in',  busca.anoDe != 0 ? busca.anoDe : [busca.anoDe]), 
            where('ano', busca.anoAte != 0 ? '<=' : '!=',  busca.anoAte)*/
        );

        onSnapshot(novaBusca, (querySnapshot => {
            setVehicles(querySnapshot.docs);
        }));
    }, [busca]);
    const classes = useStyles();

    return (
        <MainLayout>
            <Grid item sm={12}>
                <Container className={classes.container}>
                    <Helmet>
                        <title>Home</title>
                    </Helmet>
                    <div className='row'>
                        <div className='col-2'>
                            <div className='container bg-white shadow p-3 mt-3'>
                                <div className="input-group flex-nowrap">
                                    <input type="text" className="form-control" placeholder="Pesquisar" aria-describedby="addon-wrapping"/>
                                    <button onClick={handleBusca} className="input-group-text material-icons" id="addon-wrapping">search</button>
                                </div>

                                <div className='pt-3'>
                                    <label className='pb-1'>Preço</label>
                                    <div className='d-flex justify-content-between'>
                                        <input onChange={(e) => setPrecoDe(e.target.value)} className='form-control me-2' type="text" placeholder='De'/>
                                        <input onChange={(e) => setPrecoAte(e.target.value)} className='form-control ms-2' type="text" placeholder='Até'/>
                                    </div>
                                </div>

                                <div className='pt-3'>
                                    <label className='pb-1'>Ano</label>
                                    <div className='d-flex justify-content-between'>
                                        <input onChange={(e) => setAnoDe(e.target.value)} className='form-control me-2' type="text" placeholder='De'/>
                                        <input onChange={(e) => setAnoAte(e.target.value)} className='form-control ms-2' type="text" placeholder='Até'/>
                                    </div>
                                </div>

                                <select className="form-select mt-4" onChange={(e) => setMarca(e.target.value)}>
                                    <option selected value="">Marca</option>
                                    <option value="Fiat">Fiat</option>
                                    <option value="Scania">Scania</option>
                                    <option value="Volkswagen">Volkswagen</option>
                                </select>

                                <select className="form-select mt-4" onChange={(e) => setModelo(e.target.value)}>
                                    <option selected value="">Modelo</option>
                                    <option value="Uno">Uno</option>
                                    <option value="111S">111S</option>
                                    <option value="Sandero">Sandero</option>
                                </select>
                            </div>
                            <div className='container bg-white shadow p-3 mt-3'>
                                <span>AD</span>
                            </div>
                        </div>
                        <div className='col-9'>
                            <div className='row'>
                            {
                                vehicles.map((vehicle) => 
                                    <div className='container bg-white shadow p-3 m-3' style={{maxWidth : '330px'}}>
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
                                            <Link to={"/vehicle_info/" + vehicle.data().id} className="text-decoration-none text-reset">{vehicle.data().marca + ' ' + vehicle.data().modelo}</Link>
                                            <span className="material-icons">favorite_border</span>
                                            {/* <span className="material-icons">favorite</span> */}
                                        </div>
                                        <Link to={"/vehicle_info/" + vehicle.data().id} className="text-decoration-none text-reset">
                                            <div className='d-flex pb-2'>
                                                <span className='text-muted pe-2'>{vehicle.data().tipoCombustivel}</span>
                                                <span className='text-muted pe-2'>{vehicle.data().cambio}</span>
                                                <span className='text-muted pe-2'>{vehicle.data().kms + 'km'}</span>
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
                        <div className='col-1'>
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
