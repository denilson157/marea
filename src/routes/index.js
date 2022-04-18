import {
    Login,
    Home
} from '../pages'
import { Fragment } from 'react'
import { Main } from '../components'

import { Redirect, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthGoogleContext } from "../contexts/authGoogle";


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

export const AppRoutes = () =>
    <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />

        {/* <Route path='/' component={Home} /> */}
        <Route path="/" render={() => <Redirect to="/home" />} />

    </Switch>



// export const AppRoutes = () => {
//     return (
//         <Fragment>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//             </Routes>
//         </Fragment>
//     );
// };
