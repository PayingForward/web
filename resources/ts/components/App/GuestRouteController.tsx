import * as React from "react";
import { Router,Route } from "react-router";
import { createBrowserHistory } from 'history';
import AsyncComponent from './AsyncComponent';

const HomePage =()=> (<AsyncComponent page Component={React.lazy(()=>import(/* webpackChunkName: "home-page" */'../GuestPanel/HomePage/HomePage'))} />);
const SearchPage =()=> (<AsyncComponent page Component={React.lazy(()=>import(/* webpackChunkName: "search-page" */'../GuestPanel/SearchPage/SearchPage'))} />);

const history = createBrowserHistory();

class GuestRouteController extends React.Component {
    public render() {
        return (
            <Router history={history}>
                <Route path="/" exact component={HomePage} />
                <Route path="/search" exact component={SearchPage} />
            </Router>
        );
    }
}

export default GuestRouteController;
