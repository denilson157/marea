import {
    Main,
    Login,
    Home
} from './components'

import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";


export const PrivateRoute = props => (
    <Fragment>

        {/* {isAuthenticated() ? */}
        <Switch>
            <Fragment>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path='/' component={Main} />
            </Fragment>
        </Switch>
        {/* //     :
        //     <Switch>
        //         <Route component={Login} />
        // } */}

    </Fragment>
)

export const Routes = () =>
    <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />

        {/* <Route path='/' component={Home} /> */}
        <Route path="/" render={() => <Redirect to="/home" />} />

    </Switch>
