import React from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { MainLayout } from "../components/template";
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from 'services/firebaseConfig';
import { Helmet } from 'react-helmet';
import { Button, Carousel } from 'react-bootstrap'
import { useUser } from './userInfo/useUser';
import { getAuth } from "firebase/auth";

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

  //Pega dados do usuario
  const authUser = getAuth().currentUser.uid

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
    const busca = query( 
      collection(db, 'vehicles'), where('clientId', '==',  user)
    );

    onSnapshot(busca, (querySnapshot => {
      setVehicles(querySnapshot.docs);
    }));
  }, []);

  return (
    <MainLayout>
      <Grid item sm={12}>
        <Container className={classes.container}>
          <div className="row">
            <div className="col-11"></div>
            <div className="col-1">
              <Link to="/new_vehicle" className="text-decoration-none">
                <button
                  className="btn text-light cursor-pointer px-1"
                  title="Novo Veículo"
                >
                  <span
                    className="material-icons"
                    style={{ backgroundColor: "black" }}
                  >
                    add_box
                  </span>
                </button>
              </Link>
            </div>
          </div>

          <div className='col-12 col-md-9'>
            <div className='row justify-content-center justify-content-md-start'>
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
                        authUser &&
                        <button type="button" class="btn color-primary p-0 h-auto">
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
                        <span className='text-muted pe-2 ms-auto'>{vehicle.data().kms + 'km'}</span>
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
        </Container>
      </Grid>
    </MainLayout>
  );
};

export default Vehicles;
