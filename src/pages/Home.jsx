import React from 'react'
import { Helmet } from 'react-helmet';
import { Container, makeStyles, Grid } from '@material-ui/core';
import { MainLayout } from '../components/template';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        margin: '0px',
        width: '100%',
        maxWidth: '100%'
    },
}));


const Home = () => {
    const vechicles = [
        {
            ano : 1999,
            arCondicionado : true,
            cambio : 'Manual',
            cidade : 'São Paulo',
            cilindradas : '2.0',
            clientId : '9B1yfOhg6xOJx7sx48L4',
            data_kms : '03/02/2020',
            descricao : 'Aluga esta merda, ele vai te fuder',
            finalPlaca : 2,
            kms : 187965,
            marca : 'Peugeot',
            modelo : '205',
            tipoCombustivel : 'Flex',
            uf : 'SP',
            preco : '4.000'
        },
        {
            ano : 1999,
            arCondicionado : true,
            cambio : 'Manual',
            cidade : 'São Paulo',
            cilindradas : '2.0',
            clientId : '9B1yfOhg6xOJx7sx48L4',
            data_kms : '03/02/2020',
            descricao : 'Aluga esta merda, ele vai te fuder',
            finalPlaca : 2,
            kms : 106584,
            marca : 'Fiat',
            modelo : 'Marea Trubo',
            tipoCombustivel : 'Flex',
            uf : 'SP',
            preco : '15.500'
        }
    ]

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
                                    <span className="input-group-text material-icons" id="addon-wrapping">search</span>
                                    <input type="text" className="form-control" placeholder="Pesquisar" aria-describedby="addon-wrapping"/>
                                </div>

                                <div className='pt-3'>
                                    <label className='pb-1'>Preço</label>
                                    <div className='d-flex justify-content-between'>
                                        <input className='form-control me-2' type="text" placeholder='De'/>
                                        <input className='form-control ms-2' type="text" placeholder='Até'/>
                                    </div>
                                </div>

                                <div className='pt-3'>
                                    <label className='pb-1'>Ano</label>
                                    <div className='d-flex justify-content-between'>
                                        <input className='form-control me-2' type="text" placeholder='De'/>
                                        <input className='form-control ms-2' type="text" placeholder='Até'/>
                                    </div>
                                </div>

                                <select className="form-select mt-4">
                                    <option selected>Marca</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>

                                <select className="form-select mt-4">
                                    <option selected>Modelo</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className='container bg-white shadow p-3 mt-3'>
                                <span>AD</span>
                            </div>
                        </div>
                        <div className='col-9'>
                            <div className='row'>
                            {
                                vechicles.map((vechicle) => 
                                    <div className='container bg-white shadow p-3 m-3' style={{'max-width' : '330px'}}>
                                        <img src='https://via.placeholder.com/300x200' className='d-block pb-1'/>
                                        <div className='d-flex justify-content-between pb-1'>
                                            <span>{vechicle.marca + ' ' + vechicle.modelo}</span>
                                            <span className="material-icons">favorite_border</span>
                                            {/* <span className="material-icons">favorite</span> */}
                                        </div>
                                        <div className='d-flex pb-2'>
                                            <span className='text-muted pe-2'>{vechicle.tipoCombustivel}</span>
                                            <span className='text-muted pe-2'>{vechicle.cambio}</span>
                                            <span className='text-muted pe-2'>{vechicle.kms + 'km'}</span>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <span>{'R$ ' + vechicle.preco}</span>
                                            <span>{vechicle.cidade + '-' + vechicle.uf}</span>
                                        </div>
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
