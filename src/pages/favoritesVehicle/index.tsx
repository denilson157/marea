
import { Helmet } from 'react-helmet';
import { Container, makeStyles, Grid } from '@material-ui/core';
import { MainLayout } from '../../components/template';
import { Carousel } from 'react-bootstrap';
import { useFavoriteVehicle } from './useFavoritesVehicle';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(5),
        margin: '0px',
        width: '100%',
        maxWidth: '100%'
    },
    title: {
        paddingTop: theme.spacing(5),
        paddingLeft: theme.spacing(3),
        paddingRigth: theme.spacing(3),
        margin: '0px',
        width: '100%',
        maxWidth: '100%',
        display: 'flex',
        alignItems:'center'
    },
    vehicleTitle: {
        textDecoration: 'none',
        color: 'black'
    }
}));

const FavoritesVehicle = () => {

    const {
        loading,
        vehicles,

        loadVehicles,
        handleFavoriteVehicle,
        userInfo
    } = useFavoriteVehicle()

    const classes = useStyles();

    useEffect(() => {

        setTimeout(() => {

            loadVehicles()
        }, 800)

        // eslint-disable-next-line
    }, []);

    return (
        <MainLayout>
            <Helmet>
                <title>Veículos Favoritos</title>
            </Helmet>
            <Grid item sm={12}>
                <div className={classes.title}>
                    <h2 className="h3 mx-2">Veículos Favoritos</h2>
                    {
                        loading &&
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    }
                </div>
                <Container className={classes.container}>
                    <div className='row'>
                        <div className='col-md-1 d-none d-sm-block'>
                            <div className='container bg-white shadow p-3'>
                                <span>ADs</span>
                            </div>
                        </div>
                        <div className='col-10 col-sm-12 col-md-10'>
                            <div className='row'>
                                {
                                    vehicles.map((vehicle) =>
                                        <div key={vehicle.id} className='container bg-white shadow p-3 m-3' style={{ 'maxWidth': '330px' }}>

                                            <Carousel className="carousel-pictures" style={{ minHeight: '40px' }}>
                                                {
                                                    vehicle.fotosUrl.map((f: string, i: number) =>
                                                        <Carousel.Item key={`image_vehicle_${i}`}>
                                                            <Link to={`/vehicle_info/${vehicle.id}`}>
                                                                <img
                                                                    style={{ width: '100%', height: '200px' }}
                                                                    src={f}
                                                                    alt={`slide_${i}`}
                                                                />
                                                            </Link>
                                                        </Carousel.Item>

                                                    )
                                                }
                                            </Carousel>

                                            <div className='d-flex justify-content-between pb-1'>
                                                <Link className={classes.vehicleTitle} to={`/vehicle_info/${vehicle.id}`}>
                                                    <span>{vehicle.marca + ' ' + vehicle.modelo}</span>
                                                </Link>
                                                <span className="material-icons color-primary  cursor-pointer" onClick={() => handleFavoriteVehicle(vehicle?.id)}>favorite</span>
                                            </div>

                                            <div className='d-flex pb-2'>
                                                <span className='text-muted pe-2'>{vehicle.tipoCombustivel}</span>
                                                <span className='text-muted pe-2'>{vehicle.cambio}</span>
                                                <span className='text-muted pe-2'>{vehicle.kms + 'km'}</span>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <span>{'R$ ' + (vehicle.preco || 0)}</span>
                                                <span>{vehicle.cidade + '-' + vehicle.uf}</span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='col-md-1 d-none d-sm-block'>
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

export default FavoritesVehicle;
