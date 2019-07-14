import * as React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { AppState } from "../../rootReducer";
import {fetchLoggedUser, loadLoggedUser} from '../../store/AuthController/actions'
import { UserInformations, AuthControllerState } from "../../store/AuthController/types";
import { ThunkDispatch } from "redux-thunk";
import RouteController from "./RouteController";
import GuestRouteController from './GuestRouteController';
import Axios from 'axios';
import { USER_TOKEN_KEY } from '../../constants/config';
import LoadingPage from './LoadingPage';

const mapStateToProps = (state: AppState) => ({
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad:()=> dispatch(fetchLoggedUser()),
    onNoUser:()=>dispatch(loadLoggedUser())
});

interface Props extends AuthControllerState {
    user:UserInformations,
    onLoad:()=>void,
    onNoUser:()=>void
}

class AuthController extends React.Component<Props> {
    public constructor(props:Props) {
        super(props);

        if(localStorage.getItem(USER_TOKEN_KEY)){
            Axios.defaults.headers.post['Authorization'] = 'Bearer '+localStorage.getItem(USER_TOKEN_KEY)
            props.onLoad();
        } else {
            props.onNoUser();
        }
    }

    public render() {
        const {user,loading} = this.props;

        if(loading){
           return (
               <LoadingPage/>
           )
        }

        if(!user){
            return (
                <GuestRouteController/>
            )
        }

        return (
            <React.Fragment>
                <GuestRouteController/>
                <RouteController  />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthController);
