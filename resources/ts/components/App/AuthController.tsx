import * as React from "react";
import { connect } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { AppState } from "../../rootReducer";
import {
    fetchLoggedUser,
    loadLoggedUser
} from "../../store/AuthController/actions";
import {
    AuthControllerState
} from "../../store/AuthController/types";
import { ThunkDispatch } from "redux-thunk";
import Axios from "axios";
import AsyncComponent from "./AsyncComponent";
import DashBoard from "../CPanel/DashBoard";
import { USER_TOKEN_KEY } from "../../constants/config";
import LoadingPage from "./LoadingPage";
import { UserInformations } from '../../store/mainTypes';

const HomePage = () => (
    <AsyncComponent
        page
        Component={React.lazy(() =>
            import(/* webpackChunkName: "home-page" */ "../GuestPanel/HomePage/HomePage")
        )}
    />
);

const CRUDPage = () => (
    <AsyncComponent
        page
        Component={React.lazy(() =>
            import(/* webpackChunkName: "crud-page" */ "../CPanel/CRUDPage")
        )}
    />
);


const mapStateToProps = (state: AppState) => ({
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad: () => dispatch(fetchLoggedUser()),
    onNoUser: () => dispatch(loadLoggedUser())
});

interface Props extends AuthControllerState {
    user: UserInformations;
    onLoad: () => void;
    onNoUser: () => void;
}

const history = createBrowserHistory();

class AuthController extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        if (localStorage.getItem(USER_TOKEN_KEY)) {
            Axios.defaults.headers.post["Authorization"] =
                "Bearer " + localStorage.getItem(USER_TOKEN_KEY);
            props.onLoad();
        } else {
            props.onNoUser();
        }
    }

    renderAuthRoutes() {
        const { user } = this.props;

        if (!user) return null;

        return [
            user.type == "admin" ? (
                <Route
                    key={0}
                    path="/admin"
                    exact={true}
                    component={DashBoard}
                />
            ) : null,
            user.type == "admin" ? (
                <Route
                    key={1}
                    path="/admin/form/:form"
                    exact={true}
                    component={CRUDPage}
                />
            ) : null
        ];
    }

    public render() {
        const { loading } = this.props;

        if (loading) {
            return <LoadingPage />;
        }

        return (
            <React.Fragment>
                <Router history={history}>
                    <Switch>
                        <Route path='/' exact={true} component={HomePage}/>
                        {this.renderAuthRoutes()}
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthController);
