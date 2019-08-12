import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from '@material-ui/core/Button';

import MainLayout from "../Layout/MainLayout";
import { AppState } from "../../../rootReducer";
import { AuthControllerState } from "../../../store/AuthController/types";
import AsyncComponent from '../../App/AsyncComponent';
// import AsyncComponent from "../../App/AsyncComponent";

const styler = withStyles(theme => ({
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

type Props = {
    classes: {
        blackGround: string;
        scrollMe: string;
        media: string;
        card: string;
        whiteTriangle: string;
    };
    
} & AuthControllerState;

const mapStateToProps = (state: AppState) => ({
    ...state.authController
});

const SignupForm = () => (
    <AsyncComponent
        Component={React.lazy(() =>
            import(/* webpackChunkName: "home-page-signup-form" */ "./SignupForm")
        )}
    />
);

// const DonorMenu = () => (
//     <AsyncComponent
//         Component={React.lazy(() =>
//             import(/* webpackChunkName: "home-page-donor-menu" */ "./DonorMenu")
//         )}
//     />
// );

// const ChildMenu = () => (
//     <AsyncComponent
//         Component={React.lazy(() =>
//             import(/* webpackChunkName: "home-page-child-menu" */ "./ChildMenu")
//         )}
//     />
// );

// const TeacherMenu = () => (
//     <AsyncComponent
//         Component={React.lazy(() =>
//             import(
//                 /* webpackChunkName: "home-page-teacher-menu" */ "./TeacherMenu"
//             )
//         )}
//     />
// );

class HomePage extends React.Component<Props> {

    public renderSignupForm(){
        const {user} = this.props;

        if(user)
            return null;

        return (
            <SignupForm />
        )
    }

    public render() {
        const { classes } = this.props;

        return (
            <MainLayout>
                <Grid container>
                    <Grid className={classes.blackGround} item md={6}>
                        <div className={classes.whiteTriangle} />
                        {this.renderSignupForm()}
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
    mapStateToProps
)(styler(HomePage));
