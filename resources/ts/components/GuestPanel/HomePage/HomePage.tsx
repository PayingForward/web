import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import TextField from "@material-ui/core/TextField";

import {
    fetchRandomChilds,
    selectChild,
    changeValue
} from "../../../store/HomePage/actions";
import { HomePageStates } from "../../../store/HomePage/types";
import { avatar, nameToURL } from "../../../helpers";
import MainLayout from "../Layout/MainLayout";
import IconTextField from "../Layout/IconTextField";
import { AppState } from "../../../rootReducer";
import { APP_URL } from "../../../constants/config";
import { UserInformations } from "../../../store/AuthController/types";

const mapStateToProps = (state: AppState) => ({
    ...state.homePage
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad: (count?: number, except?: number[]) =>
        dispatch(fetchRandomChilds(count, except)),
    onSelectChild: (child: UserInformations) => dispatch(selectChild(child)),
    onChangeValue: (value:number)=>dispatch(changeValue(value))
});

const styler = withStyles(theme => ({
    sectionOne: {
        background:
            "linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)),url(" +
            APP_URL +
            "images/wall.jpg)",
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
        textShadow: "0 0 1px " + theme.palette.text.secondary,
        animationName: "bounce",
        animationTimingFunction: "ease",
        animationIterationCount: "infinite",
        transformOrigin: "bottom",
        color: theme.palette.text.primary
    },
    textBoxSquare: {
        background: "rgba(0,0,0,0.5)",
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
        background: theme.palette.primary.light,
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        padding: theme.spacing(4),
        textAlign: "left"
    },
    amountInput: {
        margin: "auto",
        marginTop: theme.spacing(4)
    },
    button: {
        color: theme.palette.primary.main
    },
    slide: {
        textAlign: "center",
        margin: "auto"
    },
    slideAvatar: {
        width: 100,
        height: 100,
        margin: "auto"
    },
    sliderBlock: {
        marginTop: theme.spacing(20),
        paddingBottom: theme.spacing(10)
    },
    footer: {
        background: theme.palette.primary.main
    }
}));

const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true
};

type Props =  HomePageStates & {
    classes: {
        sectionOne: string;
        childishFont: string;
        textBoxSquare: string;
        chip: string;
        grow: string;
        expressDonate: string;
        expressBlock: string;
        amountInput: string;
        button: string;
        slide: string;
        slideAvatar: string;
        sliderBlock: string;
        footer: string;
    };
    onLoad: (count?: number, except?: number[]) => void;
    onSelectChild: (child: UserInformations) => void;
    onChangeValue: (value:number)=>void;
}& RouteComponentProps<{}>

class HomePage extends React.Component<Props> {
    constructor(props:Props){
        super(props);

        this.handleDonateClick = this.handleDonateClick.bind(this);
    }

    componentDidMount() {
        this.props.onLoad(7, []);
    }

    handleChildDonateClick(child: UserInformations) {
        const { onSelectChild } = this.props;

        return () => {
            onSelectChild(child);
        };
    }

    handleDonateClick(){
        const {value,selectedChild,history} = this.props;

        let link = "/donate/";

        if(selectedChild){
            link+= selectedChild.id+'/'+nameToURL(selectedChild.name);
        }

        if(value){
            link+= '?amount='+value;
        }

        history.push(link);
    }

    public renderHelp(chars: string[]) {
        const { classes } = this.props,
            sizes: ("h2" | "h3" | "h4")[] = ["h2", "h3", "h4"],
            durations = ["5s", "6s", "7s", "8s", "9s"],
            delays = ["3s", "4s", "5s", "6s", "7s"];

        return chars.map((char, key: number) => {
            const size = sizes[Math.floor(Math.random() * sizes.length)],
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
                    className={classes.childishFont}
                    variant={size}
                >
                    {char}
                </Typography>
            );
        });
    }

    public renderSliderItems() {
        const { sliderChilds, classes } = this.props;

        return sliderChilds.map((child, key) => (
            <div className={classes.slide} key={key}>
                <Avatar
                    src={avatar(200, child.avatar)}
                    className={classes.slideAvatar}
                />
                <Divider />
                <Typography color="textPrimary" align="center" variant="h6">
                    {child.name}
                </Typography>

                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={this.handleChildDonateClick(child)}
                >
                    Donate
                </Button>
            </div>
        ));
    }

    public renderSelectedChild() {
        const { selectedChild, classes } = this.props;

        if (!selectedChild) return null;

        return (
            <div className={classes.slide}>
                <Avatar
                    src={avatar(200, selectedChild.avatar)}
                    className={classes.slideAvatar}
                />
                <Divider />
                <Typography color="textPrimary" align="center" variant="h6">
                    {selectedChild.name}
                </Typography>
            </div>
        );
    }

    public render() {
        const { classes, selectedChild,value,onChangeValue } = this.props;

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
                        <Grid item md={7} xs={12}>
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
                                        variant="outlined"
                                        className={classes.button}
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
                                <Typography
                                    variant="h4"
                                    align="center"
                                    color="textSecondary"
                                >
                                    Do you want to help{" "}
                                    {selectedChild
                                        ? selectedChild.name
                                        : "them"}
                                    ?
                                </Typography>
                                <Divider />
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
                                <br />
                                <IconTextField
                                    leftIcon={
                                        <img
                                            height="16"
                                            src="/icons/bitcoin.svg"
                                        />
                                    }
                                    rightIcon={<SendIcon />}
                                    label="USD"
                                    type="number"
                                    className={classes.amountInput}
                                    onChange={onChangeValue}
                                    value={value?value:""}
                                    onSubmit={this.handleDonateClick}
                                />
                            </div>
                        </Grid>
                        {this.renderSelectedChild()}
                    </Grid>
                    <Grid container className={classes.sliderBlock}>
                        <Grid item md={12}>
                            <Slider {...sliderSettings}>
                                {this.renderSliderItems()}
                            </Slider>
                        </Grid>
                    </Grid>
                </div>
                <Grid className={classes.footer} container>
                    <Grid md={4} item>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    <Typography color="textPrimary">
                                        What we do
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography color="textPrimary">
                                        Search and Donate
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography color="textPrimary">
                                        About
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography color="textPrimary">
                                        Help and support
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid md={4} item>
                        <List>
                            <ListItem>
                                <ListItemText>
                                    <Typography
                                        variant="h6"
                                        color="textPrimary"
                                    >
                                        Contact Us
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography color="textPrimary">
                                        Facebook
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography color="textPrimary">
                                        Twitter
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    <Typography color="textPrimary">
                                        Linkedin
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </MainLayout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)( withRouter(styler(HomePage)));
