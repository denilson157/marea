import React from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { MainLayout } from "../components/template";
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'services/firebaseConfig';
import { Helmet } from 'react-helmet';
import { Button, Carousel } from 'react-bootstrap'
import { useUser } from './userInfo/useUser';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    margin: "0px",
    width: "100%",
    maxWidth: "100%",
  },
}));

const Vehicles = () => {
  const classes = useStyles();
  const [vehicles, setVehicles] = React.useState([]);

  const {
    loading,
    loadUser,
    user
  } = useUser()

  React.useEffect(() => {
    setTimeout(() => {
      loadUser()
    }, 800)
  }, []);

  React.useEffect(() => {
    if (!loading && user !== undefined) {
      const busca = query(
        collection(db, 'vehicles'), where('clientId', '==', user.id)
      );

      onSnapshot(busca, (querySnapshot => {
        setVehicles(querySnapshot.docs);
      }));
    }
  }, [loading, user]);

  return (
    <MainLayout>
      <Grid item sm={12}>
        <Container className={classes.container}>
          <Helmet>
            <title>Veiculos</title>
          </Helmet>
          <div className="row">
            <div className="col-md-4 col-6">
              <h2 className="h3 mx-2">Veículos Cadastrados</h2>
            </div>
            <div className="col-md-7 col-6 d-flex justify-content-end">
              <Link to="/new_vehicle" className="text-decoration-none">
                <Button className="btn btn-primary" title="Novo Veículo">
                  Cadastrar Veiculo
                </Button>
              </Link>
            </div>
            <div className="col-md-1 d-md-block d-none"></div>
          </div>
          <div className="row">
            <div className='col-12 col-md-2'>
              <div className='container bg-white shadow p-3 mt-3'>
                <span>AD</span>
              </div>
            </div>
            <div className='col-12 col-md-9'>
              <div className='row justify-content-center justify-content-md-start'>
                {
                  loading && !user &&
                  <div className="d-flex justify-content-center mt-4">
                    <div className="spinner-border spinner-border-lg" style={{ width: '50px', height: '50px', color: '#D23232' }} role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                }
                {
                  !loading && user &&
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
                        <Link to={"/edit_vehicle/" + vehicle.id} className="d-flex justify-content-between w-100 text-decoration-none text-reset">
                          <span>{vehicle.data().marca + ' ' + vehicle.data().modelo}</span>
                          <span>{vehicle.data().ano}</span>
                        </Link>
                      </div>
                      <Link to={"/edit_vehicle/" + vehicle.id} className="text-decoration-none text-reset">
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
            <div className='col-12 col-md-1'>
              <div className='container bg-white shadow p-3 mt-3'>
                <span>ADs</span>
              </div>
            </div>
          </div>
        </Container>
      </Grid>
    </MainLayout>
  );
};

export default Vehicles;
