import * as React from "react";
import { connect } from "react-redux";
import { LoadingBar } from "react-redux-loading-bar";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

import LoginForm from "./Header/LoginForm";
import UserArea from "./Header/UserArea";
import { APP_NAME, APP_URL } from "../../../constants/config";
import { UserInformations } from "../../../store/mainTypes";
import { AppState } from "../../../rootReducer";
import { Link } from "react-router-dom";

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
        zIndex: 1900,
        minHeight: 56
    },
    loadingBar: {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "red",
        zIndex: 5000
    },
    iconButton: {
        marginRight: spacing(2)
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
        iconButton: string;
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
                <LoadingBar className={classes.loadingBar} />
                <div className={classes.wrapper}>
                    <AppBar className={classes.zIndex}>
                        <Toolbar variant="dense">
                            <a href="/">
                                <Typography variant="h6">{APP_NAME}</Typography>
                            </a>
                            <div className={classes.grow} />
                            <Button href="https://github.com/PayingForward/web" className={classes.iconButton}>
                                <img width="24px" src={APP_URL+"images/github.svg"} className={classes.iconButton} />
                                Contribute
                            </Button>
                            <Link to="/search">
                                <Button className={classes.iconButton}>
                                    <SearchIcon
                                        className={classes.iconButton}
                                    />
                                    Search Childs
                                </Button>
                            </Link>
                            {this.renderUserArea()}
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(styler(Header));
