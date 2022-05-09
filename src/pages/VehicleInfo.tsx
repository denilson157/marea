import { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom";
import { Container, makeStyles } from "@material-ui/core";
import { MainLayout } from "../components/template";
import { IVehicle } from '../interfaces'
import * as VehicleInfoService from '../services/vehicleInfoService'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(24),
        paddingLeft: theme.spacing(24),
        width: "100%",
        maxWidth: "100%",
    },
    title: {
        fontSize: '20px'
    },
    p: {
        marginBottom: '16px'
    },
    preco: {
        fontSize: "26px",
        color: '#D23232'
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

                                <div className='d-flex align-items-center justify-content-between'>
                                    <div className="d-flex">
                                        <p className={`${classes.title} ${classes.p}`}>{`${vehicle?.marca} ${vehicle?.modelo}`}</p>
                                        <span className=" px-2 material-icons">favorite_border</span>
                                    </div>
                                    <div className={classes.preco}>
                                        <label className="pr-2">R${`${vehicle?.preco}`}</label>
                                    </div>
                                </div>

                                <div className='d-flex text-muted pb-3'>
                                    <span className='pe-2'>{vehicle?.tipoCombustivel}</span>
                                    <span className='pe-2'>{vehicle?.cambio}</span>
                                    <span className='pe-2'>{vehicle?.kms + 'km'}</span>
                                    <span className='pe-2'>{`(${vehicle?.data_kms})`}</span>
                                </div>

                                <div className="pb-3">
                                    <p className={classes.p}>Descrição</p>
                                    <span className="text-muted">
                                        {vehicle?.descricao}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div className="mr-2">
                                        <p className="mb-1"> Ano </p>
                                        <span className="text-muted"> {vehicle?.ano} </span>
                                    </div>
                                    <div className="mr-2">
                                        <p className="mb-1"> Ar Condicionado </p>
                                        <span className="text-muted"> {vehicle?.arCondicionado ? "Sim" : "Não"} </span>
                                    </div>
                                    <div className="mr-2">
                                        <p className="mb-1"> Potência </p>
                                        <span className="text-muted"> {vehicle?.cilindradas} </span>
                                    </div>
                                    <div className="mr-2">
                                        <p className="mb-1"> Localidade </p>
                                        <span className="text-muted"> {`${vehicle?.cidade} - ${vehicle?.uf}`} </span>
                                    </div>
                                </div>

                                <hr className="mb-3" />

                                <div className="mb-5">
                                    <p className="mb-1"> Dados vendedor </p>

                                    <div>
                                        <p className="mb-1"> Nome </p>
                                        <span className="text-muted"> {`${vehicle?.cidade} / ${vehicle?.uf}`} </span>
                                    </div>
                                </div>


                                <div className="d-grid gap-2 px-4">
                                    <button className="btn btn-primary" type="button" disabled={loading}>
                                        {
                                            loading &&
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        }
                                        Entrar em contato
                                    </button>
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
