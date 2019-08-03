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
    UserInformations,
    AuthControllerState
} from "../../store/AuthController/types";
import { ThunkDispatch } from "redux-thunk";
import Axios from "axios";
import AsyncComponent from "./AsyncComponent";
import DashBoard from "../CPanel/DashBoard";
import { USER_TOKEN_KEY } from "../../constants/config";
import LoadingPage from "./LoadingPage";

const HomePage = () => (
    <AsyncComponent
        page
        Component={React.lazy(() =>
            import(
                /* webpackChunkName: "home-page" */ "../GuestPanel/HomePage/HomePage"
            )
        )}
    />
);
const SearchPage = () => (
    <AsyncComponent
        page
        Component={React.lazy(() =>
            import(
                /* webpackChunkName: "search-page" */ "../GuestPanel/SearchPage/SearchPage"
            )
        )}
    />
);
const SignupPage = () => (
    <AsyncComponent
        page
        Component={React.lazy(() =>
            import(
                /* webpackChunkName: "signup-page" */ "../GuestPanel/SignupPage/SignupPage"
            )
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

const DonatePage = () => (
    <AsyncComponent
        page
        Component={React.lazy(() =>
            import(
                /* webpackChunkName: "donate-page" */ "../GuestPanel/DonatePage/DonatePage"
            )
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

    renderGuestRoutes() {
        const { user } = this.props;

        if (user) return null;

        return [<Route path="*" key={0} exact={true} component={SignupPage} />];
    }

    renderAuthRoutes() {
        const { user } = this.props;

        if (!user) return null;

        return [
            <Route key={0} path="/cpanel" exact={true} component={DashBoard} />,
            <Route
                key={1}
                path="/cpanel/form/:form"
                exact={true}
                component={CRUDPage}
            />,
            <Route
                key={2}
                path="/donate/:id?/:name?"
                exact={true}
                component={DonatePage}
            />
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
                        <Route path="/" exact={true} component={HomePage} />
                        <Route
                            path="/search"
                            exact={true}
                            component={SearchPage}
                        />
                        {this.renderGuestRoutes()}
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
