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
                    HOMEEEEEEEEEEEEEEEEEEEEEEE

                </Container>
            </Grid>
        </MainLayout>
    );
}

export default Home;
