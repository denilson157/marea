import {
    Register,
    Login,
    Home,
} from '../pages'
import { Fragment } from 'react'

import { Switch, Route } from "react-router-dom";


export const PrivateRoute = props => (
    <Fragment>
        <Switch>
            <Fragment>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}
                <Route exact path='/' component={Login} />
            </Fragment>
        </Switch>
    </Fragment>
)