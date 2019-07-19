import * as React from "react";
import classNames from "classnames";
import MainLayout from "../Layout/MainLayout";
import { AppState } from "../../../rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { AuthControllerState } from "../../../store/AuthController/types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import { APP_URL } from "../../../constants/config";
import {
    Divider,
    Chip,
    Avatar,
    Toolbar,
    Button,
    TextField
} from "@material-ui/core";
import { Link } from "react-router-dom";

const mapStateToProps = (state: AppState) => ({
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({});

const styler = withStyles(theme => ({
    sectionOne: {
        background:
            "linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),url(" +
            APP_URL +
            "images/wall.jpg)",
        height: 900,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textAlign: "center",
        paddingTop: 40
    },
    childishFont: {
        fontFamily: "'Tommys First Alphabet', arial",
        fontSize: "6em",
        fontWeight: 600,
        display: "inline-block",
        textShadow: "0 0 1px #fff",
        animationName: "bounce",
        animationTimingFunction: "ease",
        animationIterationCount: "infinite",
        transformOrigin: "bottom"
    },
    pinkFont: {
        color: "#f3d1dc"
    },
    blueFont: {
        color: "#5396ae"
    },
    greenFont: {
        color: "#c1cd97"
    },
    brownFont: {
        color: "#b16e4b"
    },
    textBoxSquare: {
        background: "rgba(0,0,0,0.3)",
        textAlign: "left",
        color: "#fff",
        padding: theme.spacing(10),
        textShadow: "1px 1px 2px #000"
    },
    chip: {
        margin: theme.spacing(2)
    },
    grow: {
        flexGrow: 1
    },
    expressDonate: {
        marginTop: theme.spacing(30)
    },
    expressBlock: {
        background: '#393C6D',
        color: "#fff",
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        padding: theme.spacing(4),
        textAlign: "left"
    },
    amountInput:{
        color:"#fff"
    }
}));

interface Props extends AuthControllerState {
    classes: {
        sectionOne: string;
        childishFont: string;
        pinkFont: string;
        blueFont: string;
        greenFont: string;
        brownFont: string;
        textBoxSquare: string;
        chip: string;
        grow: string;
        expressDonate: string;
        expressBlock: string;
        amountInput:string
    };
}

class HomePage extends React.Component<Props> {
    renderUserArea() {
        const { user } = this.props;

        if (user) {
            return null;
        } else {
            return (
                <Grid container>
                    <Grid item md={6}>
                        <Typography variant="h5" align="center">
                            Thousand of childs waiting for your help.
                        </Typography>
                        <Typography variant="caption">
                            We are here to help them. But we want your support
                            too.
                        </Typography>
                    </Grid>
                    <Grid item md={6} />
                </Grid>
            );
        }
    }

    public renderHelp(chars: string[]) {
        const { classes } = this.props,
            sizes: ("h2" | "h3" | "h4")[] = ["h2", "h3", "h4"],
            colors = ["pink", "blue", "green", "brown"],
            durations = ["5s", "6s", "7s", "8s", "9s"],
            delays = ["3s", "4s", "5s", "6s", "7s"];

        return chars.map((char, key: number) => {
            const size = sizes[Math.floor(Math.random() * sizes.length)],
                color = colors[Math.floor(Math.random() * colors.length)],
                duration =
                    durations[Math.floor(Math.random() * durations.length)],
                delay = delays[Math.floor(Math.random() * delays.length)];

            return (
                <Typography
                    key={key}
                    style={{
                        animationDuration: duration,
                        animationDelay: delay
                    }}
                    className={classNames(
                        classes.childishFont,
                        classes[color + "Font"]
                    )}
                    variant={size}
                >
                    {char}
                </Typography>
            );
        });
    }

    public render() {
        const { classes } = this.props;

        return (
            <MainLayout>
                <div className={classes.sectionOne}>
                    <Grid justify="center" container>
                        <Grid item md={2}>
                            {this.renderHelp(["W", "e"])}
                        </Grid>
                        <Grid item md={3}>
                            {this.renderHelp(["N", "e", "e", "d"])}
                        </Grid>
                        <Grid item md={3}>
                            {this.renderHelp(["Y", "o", "u", "r"])}
                        </Grid>
                        <Grid item md={4}>
                            {this.renderHelp(["H", "e", "l", "p", "!"])}
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid justify="flex-end" container>
                        <Grid item md={7}>
                            <div className={classes.textBoxSquare}>
                                <Typography
                                    color="inherit"
                                    align="left"
                                    variant="caption"
                                >
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nam feugiat ex vitae dui
                                    semper lacinia. Class aptent taciti sociosqu
                                    ad litora torquent per conubia nostra, per
                                    inceptos himenaeos. Phasellus sit amet velit
                                    varius ipsum congue iaculis vitae id odio.
                                    Morbi semper lorem malesuada velit
                                    efficitur, eu congue purus volutpat.
                                    Praesent molestie at nulla ac aliquet. Nunc
                                    non viverra quam. Morbi molestie maximus
                                    eros, non condimentum nunc suscipit at.
                                    Maecenas in nulla mauris. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit.
                                    Mauris a congue purus, a facilisis sapien.
                                    Pellentesque vulputate erat a est tincidunt,
                                    eget ultrices neque sollicitudin.
                                </Typography>
                                <Divider />
                                <Toolbar variant="dense">
                                    <Button
                                        component={Link}
                                        to="/search"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Getting Started
                                    </Button>
                                    <div className={classes.grow} />
                                    <Chip
                                        avatar={
                                            <Avatar
                                                src="/images/social/fb.png"
                                                alt="Facebook Logo"
                                            />
                                        }
                                        label="Like Us"
                                        className={classes.chip}
                                        component="a"
                                        href="//facebook.com"
                                        clickable
                                    />
                                    <Chip
                                        avatar={
                                            <Avatar
                                                src="/images/social/twitter.png"
                                                alt="Twitter Logo"
                                            />
                                        }
                                        label="Follow Us"
                                        className={classes.chip}
                                        component="a"
                                        href="//twitter.com"
                                        clickable
                                    />
                                    <Chip
                                        avatar={
                                            <Avatar
                                                src="/images/social/yt.png"
                                                alt="Twitter Logo"
                                            />
                                        }
                                        label="Subscribe"
                                        className={classes.chip}
                                        component="a"
                                        href="//youtube.com"
                                        clickable
                                    />
                                </Toolbar>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.expressDonate}>
                        <Grid item md={9}>
                            <div className={classes.expressBlock}>
                                <Typography variant="caption" color="inherit">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nam feugiat ex vitae dui
                                    semper lacinia. Class aptent taciti sociosqu
                                    ad litora torquent per conubia nostra, per
                                    inceptos himenaeos. Phasellus sit amet velit
                                    varius ipsum congue iaculis vitae id odio.
                                    Morbi semper lorem malesuada velit
                                    efficitur, eu congue purus volutpat.
                                    Praesent molestie at nulla ac aliquet. Nunc
                                    non viverra quam. Morbi molestie
                                </Typography>

                                <TextField
                                    label="Donate"
                                    fullWidth
                                    type="number"
                                    variant="outlined"
                                    className={classes.amountInput}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div>{this.renderUserArea()}</div>
            </MainLayout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(HomePage));
