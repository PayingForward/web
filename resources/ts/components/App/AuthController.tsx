import * as React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { AppState } from "../../rootReducer";
import {fetchLoggedUser} from '../../store/AuthController/actions'
import { UserInformations } from "../../store/AuthController/types";
import { ThunkDispatch } from "redux-thunk";
import HomePage from "../HomePage/HomePage";

const mapStateToProps = (state: AppState) => ({
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad:()=>fetchLoggedUser()
});

interface Props {
    user:UserInformations,
    onLoad:()=>void
}

class AuthController extends React.Component<Props> {
    public constructor(props:Props) {
        super(props);

        if(localStorage.getItem('userToken')){
            props.onLoad();
        }
    }

    public render() {
        const {user} = this.props;

        if(!user){
            return (
                <HomePage/>
            )
        }

        return <div />;
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AuthController);
