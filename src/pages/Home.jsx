import React from 'react'
import { Helmet } from 'react-helmet';
import { Container, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        margin: '0px',
        width: '100%',
        maxWidth: '100%'
    },
}));


const Home = () => {

    
    const classes = useStyles();

    return (
        <Grid item sm={12}>
            <Container className={classes.container}>
                <Helmet>
                    <title>Home</title>
                </Helmet>

            </Container>
        </Grid>
    );
}

export default Home;
