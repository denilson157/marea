import { Redirect } from "react-router-dom";
import { Container, makeStyles } from "@material-ui/core";
import { MainLayout } from "../../components/template";
import { useVehicle } from './useVehicle'
import { useEffect } from "react";
import { Carousel } from 'react-bootstrap'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingRight: theme.spacing(24),
        paddingLeft: theme.spacing(24),
        width: "100%",
        maxWidth: "100%",
    },
    titleVehicle: {
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

    const {
        loading,
        vehicle,
        redirectUser,

        loadVehicle,
        userInfo,
        handleFavoriteVehicle,
        clientInfo,
        setRedirectUser,
        phoneContact
    } = useVehicle()

    useEffect(() => {
        const vehicleId = props.match?.params?.vehicleId;

        if (!vehicleId)
            setRedirectUser(true)
        else
            setTimeout(() => {

                loadVehicle(vehicleId)
            }, 800)
        // eslint-disable-next-line
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
                {
                    vehicle &&
                    <div className="col-12">

                        <div className="row">
                            <div className="col-md-6 col-xs-12">

                                <Carousel className="carousel-pictures">
                                    {
                                        vehicle.fotosUrl.map((f, i) =>
                                            <Carousel.Item>
                                                <img
                                                    style={{ width: '100%', height: '600px' }}
                                                    src={f}
                                                    alt={`slide_${i}`}
                                                />

                                            </Carousel.Item>
                                        )
                                    }
                                </Carousel>


                            </div>
                            <div className="col-md-6 col-xs-12" style={{ height: '600px' }}>
                                <div className='bg-white shadow p-4' style={{ height: '100%' }}>

                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className="d-flex">
                                            <p className={`${classes.titleVehicle} ${classes.p}`}>{`${vehicle?.marca} ${vehicle?.modelo}`}</p>
                                            {
                                                userInfo &&
                                                <div className="px-2 cursor-pointer" onClick={() => handleFavoriteVehicle(vehicle?.id)}>
                                                    {
                                                        userInfo.favorites_vehicles.includes(vehicle.id) ?
                                                            <span className="material-icons color-primary">favorite</span>
                                                            :
                                                            <span className="material-icons color-primary">favorite_border</span>
                                                    }
                                                </div>
                                            }
                                        </div>
                                        <div className={classes.preco}>
                                            <label className="pr-2">R${`${vehicle?.preco}`}</label>
                                        </div>
                                    </div>

                                    <div className='d-flex text-muted pb-3'>
                                        <span className='pe-2'>{vehicle?.tipoCombustivel}</span>
                                        <span className='pe-2'>{vehicle?.cambio}</span>
                                        <span className='pe-2'>{vehicle?.kms + 'km'}</span>
                                        <span className='pe-2'>{`(${vehicle?.dataKms})`}</span>
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
                                        <p className="mb-1"> Dados do anunciante </p>
                                        {
                                            clientInfo &&
                                            <div className="d-flex">

                                                <div>
                                                    <p className="mb-1"> Nome </p>
                                                    <span className="text-muted"> {clientInfo.name} </span>
                                                </div>
                                            </div>
                                        }
                                    </div>


                                    <div className="d-grid gap-2 px-4">
                                        {
                                            clientInfo && clientInfo.receiveContact &&
                                            <>
                                                <a className="btn btn-primary" target="_blank" href={`https://api.whatsapp.com/send?phone=55${phoneContact}`}>
                                                    {
                                                        loading &&
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    }
                                                    Entrar em contato
                                                </a>
                                            </>
                                        }
                                        {clientInfo && !clientInfo.receiveContact &&
                                            <p>
                                                O Anunciante não está recebendo contatos no momento. Favorite o veículo e tente entrar em contato novamente mais tarde.
                                            </p>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                }
            </Container>
        </MainLayout >
    );
};

export default VehicleInfo;
