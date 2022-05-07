import React from "react";
import { Helmet } from "react-helmet";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { BaseLayout, MainLayout } from "../components/template";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        margin: "0px",
        width: "100%",
        maxWidth: "100%",
    },
}));

const VehiclesInfo = () => {

    const classes = useStyles();

    return (
        <MainLayout>
            <div className="col-12">

                <div className="col-6">
                    
                </div>

            </div>
        </MainLayout>
    );
};

export default VehiclesInfo;
