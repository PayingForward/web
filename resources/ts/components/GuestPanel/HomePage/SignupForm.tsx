import * as React from "react";
import { ThunkDispatch } from "redux-thunk";

import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { APP_URL } from "../../../constants/config";
import { SignupPageState } from "../../../store/SignupPage/types";
import {
    validateName,
    validateEmail,
    validatePassword,
    submit
} from "../../../store/SignupPage/actions";
import { AppState } from "../../../rootReducer";
import { connect } from 'react-redux';

const styler = withStyles(theme=>({
    avatar: {
        background: theme.palette.common.white,
        width: 100,
        height: 100,
        margin: "auto"
    },
    wrapper: {
        paddingTop: 20,
        paddingBottom: 20
    },
    paper: {
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        marginTop: 10,
        marginRight: "20%",
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8)
    },
    title: {
        background: theme.palette.common.black,
        maxWidth: 120,
        position: "relative"
    },
    titleAfter: {
        width: 0,
        height: 0,
        borderTop: "28px solid #000",
        borderRight: "28px solid transparent",
        position: "absolute",
        top: 0,
        left: "100%"
    },
    formWrapper: {
        width: "80%",
        margin: "auto",
        paddingTop: 20
    },
    grow: {
        flexGrow: 1
    },
    loginLink: {
        marginTop: 40,
        color: "purple"
    },
}))


const mapStateToProps = (state: AppState) => ({
    ...state.signupPage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeName: (name: string) => dispatch(validateName(name)),
    onChangeEmail: (email: string) => dispatch(validateEmail(email)),
    onChangePassword: (password: string) =>
        dispatch(validatePassword(password)),
    onSubmit: (name: string, email: string, password: string) =>
        dispatch(submit(name, email, password))
});


interface Props extends SignupPageState {
    onChangeName: (name: string) => void;
    onChangeEmail: (email: string) => void;
    onChangePassword: (password: string) => void;
    onSubmit: (name: string, email: string, password: string) => void;
    classes:{
        title: string;
        titleAfter: string;
        formWrapper: string;
        grow: string;
        loginLink: string;
        avatar: string;
        wrapper: string;
        paper: string;
    }
}

class SignupForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChangeName(e.target.value);
    }

    handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChangeEmail(e.target.value);
    }

    handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChangePassword(e.target.value);
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const {
            email,
            name,
            password,
            emailError,
            nameError,
            passwordError
        } = this.props;

        if (emailError || nameError || passwordError) {
            return;
        }

        this.props.onSubmit(name, email, password);
    }


    render() {
        const {
            email,
            name,
            password,
            nameError,
            emailError,
            passwordError,
            classes
        } = this.props;

        return (
            <div>
                <div className={classes.wrapper}>
                    <Avatar
                        className={classes.avatar}
                        src={APP_URL + "images/logo.png"}
                    />
                    <Paper className={classes.paper}>
                        <div className={classes.title}>
                            <Typography variant="h6">Registration</Typography>
                            <div className={classes.titleAfter} />
                        </div>
                        <form
                            onSubmit={this.handleSubmit}
                            className={classes.formWrapper}
                        >
                            <TextField
                                label="Name"
                                onChange={this.handleChangeName}
                                value={name}
                                error={!!nameError}
                                helperText={nameError}
                                fullWidth
                            />
                            <TextField
                                label="Email"
                                onChange={this.handleChangeEmail}
                                value={email}
                                error={!!emailError}
                                helperText={emailError}
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                fullWidth
                                type="password"
                                value={password}
                                error={!!passwordError}
                                helperText={passwordError}
                                onChange={this.handleChangePassword}
                            />
                            <Toolbar variant="dense">
                                <IconButton>
                                    <Avatar src="/images/social/fb.png" />
                                </IconButton>
                                <IconButton>
                                    <Avatar src="/images/social/gmail.png" />
                                </IconButton>
                                <div className={classes.grow} />
                                <Button
                                    disabled={
                                        !!(
                                            emailError ||
                                            passwordError ||
                                            nameError
                                        )
                                    }
                                    type="submit"
                                    variant="contained"
                                >
                                    Signup
                                </Button>
                            </Toolbar>
                        </form>
                    </Paper>
                </div>
                <Typography className={classes.loginLink} align="center">
                    Already Have an account? Login.
                </Typography>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(styler(SignupForm))