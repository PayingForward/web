import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import withStyles from "@material-ui/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";

import { APP_URL } from "../../../constants/config";
import MainLayout from "../Layout/MainLayout";
import { AppState } from "../../../rootReducer";
import {
    validateName,
    validateEmail,
    validatePassword,
    submit
} from "../../../store/SignupPage/actions";
import { SignupPageState } from "../../../store/SignupPage/types";

const styler = withStyles(theme => ({
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
    blackGround: {
        background: theme.palette.common.black,
        height: "calc(100vh - " + 56 + "px)",
        position: "relative",
        [theme.breakpoints.down("md")]: {
            height: "unset",
            paddingBottom: 20
        }
    },
    scrollMe: {
        height: "calc(100vh - " + 56 + "px)",
        overflowY: "auto",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        [theme.breakpoints.down("md")]: {
            height: "unset",
            paddingBottom: 20
        }
    },
    card: {
        maxWidth: 345,
        margin: "auto",
        boxShadow: "1px 1px 4px rgba(0,0,0,0.4)",
        marginTop: 20,
        marginBottom: 20
    },
    media: {
        height: 140
    },
    whiteTriangle: {
        width: 0,
        height: 0,
        borderTop: "60px solid transparent",
        borderBottom: "60px solid transparent",
        borderRight: "60px solid white",
        position: "absolute",
        bottom: 20,
        right: 0
    }
}));

interface Props extends SignupPageState {
    classes: {
        blackGround: string;
        avatar: string;
        wrapper: string;
        paper: string;
        title: string;
        titleAfter: string;
        formWrapper: string;
        grow: string;
        loginLink: string;
        scrollMe: string;
        media: string;
        card: string;
        whiteTriangle: string;
    };
    onChangeName: (name: string) => void;
    onChangeEmail: (email: string) => void;
    onChangePassword: (password: string) => void;
    onSubmit: (name: string, email: string, password: string) => void;
}

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

class HomePage extends React.Component<Props> {


    constructor(props:Props){
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangeName(e.target.value);
    }

    handleChangeEmail(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangeEmail(e.target.value);
    }

    handleChangePassword(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangePassword(e.target.value);
    }

    handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const {email,name,password,emailError,nameError,passwordError} = this.props;

        if(emailError||nameError||passwordError){
            return ;
        }

        this.props.onSubmit(name,email,password);
    }

    public render() {
        const {
            classes,
            email,
            name,
            password,
            nameError,
            emailError,
            passwordError
        } = this.props;

        return (
            <MainLayout>
                <Grid container>
                    <Grid className={classes.blackGround} item md={6}>
                        <div className={classes.whiteTriangle} />
                        <div className={classes.wrapper}>
                            <Avatar
                                className={classes.avatar}
                                src={APP_URL + "images/logo.png"}
                            />
                            <Paper className={classes.paper}>
                                <div className={classes.title}>
                                    <Typography variant="h6">
                                        Registration
                                    </Typography>
                                    <div className={classes.titleAfter} />
                                </div>
                                <form onSubmit={this.handleSubmit} className={classes.formWrapper}>
                                    <TextField label="Name" onChange={this.handleChangeName} value={name} error={!!nameError} helperText={nameError} fullWidth />
                                    <TextField label="Email" onChange={this.handleChangeEmail} value={email} error={!!emailError} helperText={emailError} fullWidth />
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
                                        <Button disabled={!!(emailError||passwordError||nameError)} type="submit" variant="contained">
                                            Signup
                                        </Button>
                                    </Toolbar>
                                </form>
                            </Paper>
                        </div>
                        <Typography
                            className={classes.loginLink}
                            align="center"
                        >
                            Already Have an account? Login.
                        </Typography>
                    </Grid>
                    <Grid item md={6} className={classes.scrollMe}>
                        <Typography variant="h4" align="center">
                            Title
                        </Typography>
                        <Divider />
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Maecenas mollis velit a odio aliquam, eu
                            aliquet nisl consequat. Nunc sed felis nunc.
                            Curabitur quis nisl at dolor suscipit aliquam. Sed
                            in lacinia ante. Maecenas eu condimentum tellus.
                            Vestibulum hendrerit dolor elit, ac finibus velit
                            ornare at. Suspendisse tellus eros, pharetra eget
                            malesuada ut, sodales vel lorem. Donec nec ex nisi.
                            Phasellus a neque est. Curabitur placerat nunc sed
                            erat tempor vulputate. Donec urna enim, bibendum at
                            enim non, congue porttitor risus.
                        </Typography>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="images/wall.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="h2"
                                    >
                                        Lizard
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        Sed ut placerat ex. Nunc ex justo,
                                        malesuada eget felis et, vestibulum
                                        dapibus ipsum. Ut vitae gravida sem.
                                        Fusce malesuada viverra justo, vel
                                        dapibus ante tincidunt in. Nullam
                                        suscipit consequat ultrices. Quisque
                                        porta blandit elit id lobortis.
                                        Phasellus ut diam interdum, feugiat nisi
                                        non, ultrices libero.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                        <Typography>
                            Phasellus ipsum nunc, volutpat ac pharetra quis,
                            consectetur non risus. Nunc rhoncus, augue vitae
                            euismod luctus, massa urna blandit lectus, lacinia
                            convallis sapien nibh in lectus. Sed vestibulum at
                            velit nec tristique. Nullam elit erat, tempus eget
                            diam non, feugiat euismod augue. Pellentesque non
                            luctus elit, sed dictum nisi. In et tellus tellus.
                            Ut risus metus, facilisis vel tellus id, egestas
                            rhoncus est. Maecenas mattis orci sem. Proin tellus
                            metus, scelerisque eu faucibus nec, molestie non
                            tellus. Donec fringilla magna massa, id iaculis
                            lorem auctor non. Ut non bibendum ex.
                        </Typography>
                        <Divider />
                        <Typography>
                            <Link to="/contact">Contact Us</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </MainLayout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(HomePage));
