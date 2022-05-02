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
    console.log('eaiporra')

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
                                <span>filtros</span>
                            </div>
                        </div>
                        <div className='col-10'>
                            <div className='row'>
                                <div className='container bg-white shadow p-3 m-3' style={{'max-width' : '330px'}}>
                                    <img src='https://via.placeholder.com/300x200' className='d-block'/>
                                    <span className='d-block'>Nome da jabiraca</span>
                                    <span className='d-block'>R$ 25.000,00</span>
                                    <span className='text-muted pe-2'>Flex</span>
                                    <span className='text-muted pe-2'>Manual</span>
                                    <span className='text-muted pe-2'>Ar Condicionado</span>
                                </div>

                                <div className='container bg-white shadow p-3 m-3' style={{'max-width' : '330px'}}>
                                    <img src='https://via.placeholder.com/300x200' className='d-block'/>
                                    <span className='d-block'>Nome da jabiraca</span>
                                    <span className='d-block'>R$ 25.000,00</span>
                                    <span className='text-muted pe-2'>Flex</span>
                                    <span className='text-muted pe-2'>Manual</span>
                                    <span className='text-muted pe-2'>Ar Condicionado</span>
                                </div>

                                <div className='container bg-white shadow p-3 m-3' style={{'max-width' : '330px'}}>
                                    <img src='https://via.placeholder.com/300x200' className='d-block'/>
                                    <span className='d-block'>Nome da jabiraca</span>
                                    <span className='d-block'>R$ 25.000,00</span>
                                    <span className='text-muted pe-2'>Flex</span>
                                    <span className='text-muted pe-2'>Manual</span>
                                    <span className='text-muted pe-2'>Ar Condicionado</span>
                                </div>

                                <div className='container bg-white shadow p-3 m-3' style={{'max-width' : '330px'}}>
                                    <img src='https://via.placeholder.com/300x200' className='d-block'/>
                                    <span className='d-block'>Nome da jabiraca</span>
                                    <span className='d-block'>R$ 25.000,00</span>
                                    <span className='text-muted pe-2'>Flex</span>
                                    <span className='text-muted pe-2'>Manual</span>
                                    <span className='text-muted pe-2'>Ar Condicionado</span>
                                </div>

                                <div className='container bg-white shadow p-3 m-3' style={{'max-width' : '330px'}}>
                                    <img src='https://via.placeholder.com/300x200' className='d-block'/>
                                    <span className='d-block'>Nome da jabiraca</span>
                                    <span className='d-block'>R$ 25.000,00</span>
                                    <span className='text-muted pe-2'>Flex</span>
                                    <span className='text-muted pe-2'>Manual</span>
                                    <span className='text-muted pe-2'>Ar Condicionado</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </Container>
            </Grid>
        </MainLayout>
    );
}

export default Home;
