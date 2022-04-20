import {
    Register,
    Login,
    Home,
} from '../pages'
import { Fragment } from 'react'
import { Main } from '../components'

import { Redirect, Switch, Route } from "react-router-dom";


export const PrivateRoute = props => (
    <Fragment>
        <Switch>
            <Fragment>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route path='/' component={Main} />
            </Fragment>
        </Switch>
    </Fragment>
)

export const AppRoutes = () =>
    <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* <Route path='/' component={Home} /> */}
        <Route path="/" render={() => <Redirect to="/home" />} />

    </Switch>