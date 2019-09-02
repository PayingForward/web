import * as React from "react";
import Slider, { Settings } from "react-slick";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import {
    withGoogleMap,
    Marker,
    GoogleMap,
    withScriptjs,
    InfoWindow
} from "react-google-maps";

import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

import { avatar, nameToURL } from "../../../helpers";
import {
    CompleteChildInformations,
    UserInformations,
    School
} from "../../../store/mainTypes";
import { DonorMenuState } from "../../../store/DonorMenu/types";
import { AuthControllerState } from "../../../store/AuthController/types";
import { AppState } from "../../../rootReducer";
import { fetchInformations } from "../../../store/DonorMenu/actions";
import { GMAP_KEY } from "../../../constants/config";
import { withRouter, RouteComponentProps } from "react-router";

const styler = withStyles(theme => ({
    slide: {
        textAlign: "center",
        margin: "auto",
        position: "relative"
    },
    slideAvatar: {
        width: 50,
        height: 50,
        margin: "auto"
    },
    marginTop: {
        marginTop: 30
    },
    countryFlag: {
        position: "absolute",
        top: 2,
        left: 0,
        paddingLeft: "50%",
        marginLeft: -25
    },
    donateButton: {
        color: "#fff",
        border: "solid 2px #fff",
        fontSize: ".5em"
    },
    title: {
        paddingTop: 24
    }
}));

const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2
            }
        }
    ],
    arrows:false
};

const mapStateToProps = (state: AppState) => ({
    ...state.donorMenu,
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad: () => dispatch(fetchInformations())
});

type Props = DonorMenuState &
    AuthControllerState & {
        classes: {
            slide: string;
            slideAvatar: string;
            marginTop: string;
            countryFlag: string;
            donateButton: string;
            title: string;
        };
        onLoad: () => void;
        user: UserInformations;
    };

const loadingElement = <div />;
const containerElement = <div style={{ height: "260px" }} />;
const mapElement = <div style={{ height: "260px" }} />;

interface MarkerProps {
    school: School;
    onClick: (school: School) => void;
}

class CustomMarker extends React.Component<MarkerProps, { infoOpen: boolean }> {
    constructor(props: MarkerProps) {
        super(props);

        this.state = { infoOpen: false };

        this.handleCloseInfoWindow = this.handleCloseInfoWindow.bind(this);
        this.handleOpenInfoWindow = this.handleOpenInfoWindow.bind(this);
    }

    handleOpenInfoWindow() {
        this.setState({ infoOpen: true });
    }

    handleCloseInfoWindow() {
        window.setTimeout(()=>{
            this.setState({ infoOpen: false });
        },700)
    }

    public render() {
        const { school, onClick } = this.props;
        const { infoOpen } = this.state;

        return (
            <React.Fragment>
                <Marker
                    position={{
                        lat: school.latitude,
                        lng: school.longitude
                    }}
                    icon={{
                        url:
                            "http://maps.google.com/mapfiles/ms/icons/" +
                            (school.priority == "high"
                                ? "red"
                                : school.priority == "medium"
                                ? "yellow"
                                : "green") +
                            "-dot.png"
                    }}
                    onClick={() => onClick(school)}
                    onMouseOver={this.handleOpenInfoWindow}
                    onMouseOut={this.handleCloseInfoWindow}
                >
                {infoOpen && (
                    <InfoWindow
                        onCloseClick={this.handleCloseInfoWindow}
                    >
                        <div
                            onMouseOver={this.handleOpenInfoWindow}
                            onMouseOut={this.handleCloseInfoWindow}
                        >
                            <Avatar style={{margin:"auto"}} src={avatar(64,school.logo)} />
                            <Divider/>
                            <Typography variant="h6" align="center" >{school.label}</Typography>
                        </div>
                    </InfoWindow>
                )}
                </Marker>
            </React.Fragment>
        );
    }
}

const GMap = withScriptjs(
    withGoogleMap(
        (props: {
            [x: string]: any;
            schools: School[];
            onClickMarker: (s: School) => void;
        }) => (
            <GoogleMap
                defaultZoom={1}
                defaultCenter={{ lat: 6.927079, lng: 79.861244 }}
            >
                {props.schools.map((school, key) => (
                    <CustomMarker
                        key={key}
                        school={school}
                        onClick={props.onClickMarker}
                    />
                ))}
            </GoogleMap>
        )
    )
);

class DonorMenu extends React.Component<Props & RouteComponentProps> {
    constructor(props: Props & RouteComponentProps) {
        super(props);

        props.onLoad();

        this.handleClickSchool = this.handleClickSchool.bind(this);
    }

    handleChildDonateClick(child: CompleteChildInformations) {
        const { history } = this.props;
        return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            history.push(
                "/donate/child/" + child.id + "/" + nameToURL(child.name)
            );
        };
    }

    handleClickSchool(scl: School) {
        const { history } = this.props;
        history.push("/donate/school/" + scl.id + "/" + nameToURL(scl.label));
    }

    public renderSliderItems() {
        const { childs, classes } = this.props;

        return childs.map((child, key) => (
            <div className={classes.slide} key={key}>
                <Avatar
                    src={avatar(200, child.avatar)}
                    className={classes.slideAvatar}
                />
                <Divider />
                <Typography color="textPrimary" align="center" variant="body1">
                    {child.name}
                </Typography>
                <span className={classes.countryFlag}>
                    <img
                        width="24px"
                        src={
                            "https://www.countryflags.io/" +
                            (child.country
                                ? child.country.code.toLowerCase()
                                : "us") +
                            "/shiny/64.png"
                        }
                    />
                </span>
                <Button
                    variant="outlined"
                    className={classes.donateButton}
                    onClick={this.handleChildDonateClick(child)}
                >
                    Donate
                </Button>
            </div>
        ));
    }

    public render() {
        const { classes, user, schools } = this.props;

        return (
            <div>
                <Typography align="center" color="textPrimary" variant="h5">
                    Hy! Welcome {user.name}!
                </Typography>
                <Typography
                    color="textPrimary"
                    className={classes.title}
                    variant="h6"
                >
                    These childs want your help...
                </Typography>
                <Divider className={classes.marginTop} />
                <Slider {...sliderSettings}>{this.renderSliderItems()}</Slider>
                <Divider />
                <Typography
                    color="textPrimary"
                    className={classes.title}
                    variant="h6"
                >
                    We can not conduct these classes without your help..
                </Typography>
                <Divider />
                <GMap
                    schools={schools}
                    loadingElement={loadingElement}
                    containerElement={containerElement}
                    mapElement={mapElement}
                    googleMapURL={
                        "https://maps.googleapis.com/maps/api/js?key=" +
                        (GMAP_KEY ? GMAP_KEY : "undefined") +
                        "&v=3.exp&libraries=geometry,drawing,places"
                    }
                    onClickMarker={this.handleClickSchool}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(styler(DonorMenu)));
