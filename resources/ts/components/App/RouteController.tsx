import * as React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route } from 'react-router';
import DashBoard from '../CPanel/DashBoard';
import CRUDPage from '../CPanel/CRUDPage';

const history = createBrowserHistory();

export default class RouteController extends React.Component {
    public render(){
        return (
            <div>
                <Router history={history}>
                    <Route path="/cpanel" exact={true} component={DashBoard} />
                    <Route path="/cpanel/form/:form" exact={true} component={CRUDPage}/>
                </Router>
            </div>
        )
    }
}