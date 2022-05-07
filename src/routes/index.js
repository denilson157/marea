import {
    Register,
    Login,
    Home,
    Recovery,
    Vehicles,
    NewVehicle,
    VehicleInfo
} from '../pages'
import { Redirect } from 'react-router-dom'
import { Fragment } from 'react'

import { Switch, Route } from "react-router-dom";


export const PrivateRoute = props => (
    <Fragment>
        <Switch>
            <Fragment>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/recovery" component={Recovery} />
                <Route path="/vehicles" component={Vehicles} />
                <Route path="/new_vehicle" component={NewVehicle} />
                <Route path="/vehicle_info/:vehicleId?" component={VehicleInfo} />
                <Route exact path='/' component={Login} />
                <Route exact path="/" render={() => <Redirect to="/home" />} />
            </Fragment>
        </Switch>
    </Fragment>
)