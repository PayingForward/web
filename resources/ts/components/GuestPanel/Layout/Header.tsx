import * as React from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import red from "@material-ui/core/colors/red";

import LoginForm from "./Header/LoginForm";
import UserArea from "./Header/UserArea";
import { APP_NAME } from "../../../constants/config";
import { UserInformations } from "../../../store/AuthController/types";
import { AppState } from "../../../rootReducer";

export const styler = withStyles(({ spacing }) => ({
    grow: {
        flexGrow: 1
    },
    wrapper: {
        paddingTop: spacing(8)
    },
    userArea: {
        width: "50vw"
    },
    zIndex: {
        zIndex: 1900
    },
    loadingBar: {
        background: red[600],
        height: spacing(4),
        position: "fixed",
        zIndex: 5000
    }
}));

export const mapStateToProps = (state: AppState) => ({
    ...state.authController
});

interface Props {
    classes: {
        grow: string;
        wrapper: string;
        userArea: string;
        zIndex: string;
        loadingBar: string;
    };
    user?: UserInformations;
}

class Header extends React.Component<Props> {
    public renderUserArea() {
        const { user } = this.props;

        if (user) {
            return <UserArea />;
        }

        return <LoginForm />;
    }

    public render() {
        const { classes } = this.props;

        return (
            <div>
                <span>
                    <LoadingBar className={classes.loadingBar} />
                </span>
                <div className={classes.wrapper}>
                    <AppBar className={classes.zIndex}>
                        <Toolbar variant="dense">
                            <a href="/" >
                                <Typography variant="h6">{APP_NAME}</Typography>
                            </a>
                            <div className={classes.grow} />
                            {this.renderUserArea()}
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(styler(Header));
