import { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom";
import { Container, makeStyles, Grid } from "@material-ui/core";
import { BaseLayout, MainLayout } from "../components/template";
import { Link } from 'react-router-dom';
import { IVehicle } from '../interfaces'
import * as VehicleInfoService from '../services/vehicleInfoService'


const VehicleInfo = (props) => {

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
            <div className="col-12">

                <div className="col-6">

                </div>

            </div>
        </MainLayout>
    );
};

export default VehicleInfo;
