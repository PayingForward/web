import * as React from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import  Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { AppState } from "../../../../rootReducer";
import { ThunkDispatch } from "redux-thunk";
import {
    changeEmail,
    changePassword,
    submitLogin
} from "../../../../store/LoginForm/actions";
import { APP_URL } from '../../../../constants/config';

const styler = withStyles(theme => ({
    textField: {
        width: 200
    },
    margin: {
        margin: theme.spacing(1)
    },
    form: {
        display: "inline-flex"
    },
    white: {
        color: theme.palette.text.primary
    }
}));

interface Props {
    classes: {
        textField: string;
        margin: string;
        form: string;
        white: string;
    };
    email: string;
    onChangeEmail: (email: string) => void;
    password: string;
    onChangePassword: (password: string) => void;
    onSubmit: (email: string, password: string) => void;
}

const mapStateToProps = (state: AppState) => ({
    ...state.loginForm
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeEmail: (email: string) => dispatch(changeEmail(email)),
    onChangePassword: (password: string) => dispatch(changePassword(password)),
    onSubmit: (email: string, password: string) =>
        dispatch(submitLogin(email, password))
});

class LoginForm extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { onChangeEmail } = this.props;

        onChangeEmail(e.target.value);
    }

    handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { onChangePassword } = this.props;

        onChangePassword(e.target.value);
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { onSubmit, email, password } = this.props;

        onSubmit(email, password);
    }

    public render() {
        const { classes, email, password } = this.props;

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                    <div className={classes.margin}>
                        <TextField
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            label="Email"
                            onChange={this.handleEmailChange}
                            value={email}
                            inputProps={{ className: classes.white }}
                            InputLabelProps={{ className: classes.white }}
                        />
                    </div>
                    <div className={classes.margin}>
                        <TextField
                            className={classes.textField}
                            margin="dense"
                            type="password"
                            variant="outlined"
                            label="Password"
                            value={password}
                            onChange={this.handlePasswordChange}
                            inputProps={{ className: classes.white }}
                            InputLabelProps={{ className: classes.white }}
                        />
                    </div>
                    <Button
                        type="submit"
                        className={classes.margin}
                        variant="contained"
                        color="secondary"
                    >
                        Login
                    </Button>
                </form>

                <IconButton href={APP_URL + "user/social/facebook/login"}>
                    <Avatar src="/images/social/fb.png" alt="Facebook Logo" />
                </IconButton>
                <IconButton href={APP_URL + "user/social/google/login"}>
                    <Avatar
                        src="/images/social/gmail.png"
                        alt="Gmail Logo Background Brown"
                    />
                </IconButton>
            </React.Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(LoginForm));
