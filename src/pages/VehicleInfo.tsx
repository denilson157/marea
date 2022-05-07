import { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { BaseLayout, MainLayout } from "../components/template";
import { IVehicle } from '../interfaces'
import * as VehicleInfoService from '../services/vehicleInfoService'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingRigth: theme.spacing(24),
        paddingLeft: theme.spacing(24),
        width: "100%",
        maxWidth: "100%",
    },
    title: {
        fontSize: '20px',
        paddingBottom: '0px'
    }
}))

const VehicleInfo = (props) => {
    const classes = useStyles();

    const [redirectUser, setRedirectUser] = useState(false)
    const [loading, setLoading] = useState(false)
    const [vehicle, setVehicle] = useState<IVehicle>()

    useEffect(() => {
        const vehicleId = props.match?.params?.vehicleId;

        const loadVehicle = () => {

            setLoading(true)
            VehicleInfoService.getData(vehicleId)
                .then(respVehicle => {
                    setVehicle(respVehicle)
                })
                .catch(() => {

                })
                .finally(() => setLoading(false))
        }

        if (!vehicleId)
            setRedirectUser(true)
        else
            loadVehicle()



    }, [props.match?.params?.vehicleId])

    if (redirectUser)
        return <Redirect to="/vehicles" />

    return (
        <MainLayout>
            <Container className={classes.container}>

                {
                    !vehicle && !loading &&
                    <div>
                        <label>Nenhum veículo encontrado</label>
                    </div>
                }
                <div className="col-12">
                    <div className="row">
                        <div className="col-md-6 col-xs-12">

                            <img src="https://i.pinimg.com/originals/94/f5/3b/94f53bd1f3f7e1975450ae207c54ff1a.jpg" alt="img vehicle" style={{ width: '100%', height: '600px' }} />

                        </div>
                        <div className="col-md-6 col-xs-12" style={{ height: '600px' }}>
                            <div className='bg-white shadow p-4' style={{ height: '100%' }}>

                                <div className='d-flex align-items-center pb-1'>
                                    <p className={classes.title}>{`${vehicle?.marca} ${vehicle?.modelo}`}</p>
                                    <span className=" px-2 material-icons">favorite_border</span>
                                </div>

                                <div className='d-flex pb-2'>
                                    <span className='text-muted pe-2'>{vehicle?.tipoCombustivel}</span>
                                    <span className='text-muted pe-2'>{vehicle?.cambio}</span>
                                    <span className='text-muted pe-2'>{vehicle?.kms + 'km'}</span>
                                </div>

                                <div className='d-flex justify-content-between'>
                                    <span>{'R$ ' + vehicle?.preco}</span>
                                    <span>{vehicle?.cidade + '-' + vehicle?.uf}</span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </MainLayout >
    );
};

export default VehicleInfo;
