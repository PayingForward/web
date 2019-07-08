import * as React from "react";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import { APP_NAME } from "../../../constants/config";
import { AppState } from "../../../rootReducer";
import LoginForm from "./Header/LoginForm";
import { UserInformations } from "resources/ts/store/AuthController/types";
import { Toolbar } from "@material-ui/core";

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
    zIndex:{
        zIndex:2000
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
        zIndex:string
    };
    user?: UserInformations;
}

class Header extends React.Component<Props> {
    public renderUserArea() {
        const { user } = this.props;

        if (user) {
            return null;
        }

        return <LoginForm />;
    }

    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.wrapper}>
                <AppBar className={classes.zIndex}>  
                    <Toolbar variant="dense" >
                        <Typography variant="h6">{APP_NAME}</Typography>
                        <div className={classes.grow} />
                        {this.renderUserArea()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default connect(mapStateToProps)(styler(Header));
