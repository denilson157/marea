import React from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { MainLayout } from "../components/template";
import { Link } from 'react-router-dom';

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

          <div name="xyz" style={{ backgroundColor: "black", height: "500px" }}>
            <h2 style={{ color: "white" }}>
              ENTRARÁ A LISTAGEM DE MEUS VEÍCULOS
            </h2>
          </div>
        </Container>
      </Grid>
    </MainLayout>
  );
};

export default Vehicles;
