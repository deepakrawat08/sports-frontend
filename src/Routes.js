import React from 'react'
import { BrowserRouter, Switch, Route ,useHistory} from "react-router-dom"
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import Home from './core/Home'
import Profile from './user.js/Profile'
import PrivateRoute from './auth/authhelper/PrivateRoute'
import Registration from './user.js/Registration'
import Status from './user.js/Status'
import AdminRoute from './auth/authhelper/AdminRoute'
import RegDash from './core/RegDetailDash'
import AdminDash from './Admin/AdminDash'
import CoordinatorRoute from './Admin/helper/CoordinatorRoute'
import ACoordinator from './Admin/ACoordinator'
import Coordinator from './coordinator/Coordinator'
import { signout, isAuthenticated } from './auth/authhelper'

function Routes() {
   
    
    return <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/registration" exact component={Registration} />
            <Route path='/signin' exact component={Signin}/>
            <Route path='/signup' exact component={Signup} />
            <PrivateRoute path='/status' exact component={Status} />
            <PrivateRoute path="/profile" exact component={Profile} />
            <Route path="/regDetailDash" exact component={RegDash} />
           <AdminRoute path='/admin' exact component={AdminDash} />
            <CoordinatorRoute path='/coordinator' exact component={Coordinator}/>
        </Switch>
    </BrowserRouter>
}

export default Routes