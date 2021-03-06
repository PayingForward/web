import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";

import MainLayout from "../Layout/MainLayout";
import ChangeProfile from "./ChangeProfile";
import { AppState } from "../../../rootReducer";
import {
    ProfilePageState,
    ProfileInformation
} from "../../../store/ProfilePage/types";
import {
    fetchProfile,
    saveProfile,
    changeMode
} from "../../../store/ProfilePage/actions";
import { avatar } from "../../../helpers";
import ProfileInfo from "./ProfileInfo";
import { AuthControllerState } from '../../../store/AuthController/types';

const mapStateToProps = (state: AppState): ProfilePageState&AuthControllerState => ({
    ...state.profilePage,
    ...state.authController
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onChangeProfile: (userId?: number) => dispatch(fetchProfile(userId)),
    onEditProfile: (profileValues: ProfileInformation, mode: number) =>
        dispatch(saveProfile(profileValues, mode)),
    onChangeMode: (mode: number) => dispatch(changeMode(mode))
});

const styler = withStyles(theme => ({
    avatar: {
        width: 160,
        height: 160,
        margin: "auto",
        marginBottom: theme.spacing(2)
    },
    leftBar: {
        background: theme.palette.grey[300],
        padding: theme.spacing(4),
        minHeight: "calc(100vh - " + 56 + "px)"
    },
    content: {
        padding: theme.spacing(4)
    },
    card: {
        padding: theme.spacing(4),
        margin: theme.spacing(2)
    }
}));

interface Props extends ProfilePageState {
    match: {
        params: {
            id?: string;
            name?: string;
        };
    };
    classes: {
        avatar: string;
        leftBar: string;
        content: string;
        card: string;
    };
    onChangeProfile: (userId?: number) => void;
    onEditProfile: (profileValues: ProfileInformation, mode: number) => void;
    onChangeMode: (mode: number) => void;
}

class ProfilePage extends React.Component<Props & RouteComponentProps & AuthControllerState> {
    constructor(props: Props & RouteComponentProps) {
        super(props);

        this.handleChangeModeToEdit = this.handleChangeModeToEdit.bind(this);
    }

    componentDidMount() {
        const { match, onChangeProfile } = this.props;

        if (match.params.id) {
            onChangeProfile(parseInt(match.params.id));
        } else {
            onChangeProfile();
        }
    }

    handleChangeModeToEdit() {
        this.props.onChangeMode(1);
    }

    componentDidUpdate(prevProps: Props & RouteComponentProps) {
        const { match, onChangeProfile } = this.props;

        if (match.params.id !== prevProps.match.params.id) {
            if (match.params.id) {
                onChangeProfile(parseInt(match.params.id));
            } else {
                onChangeProfile();
            }
        }
    }

    public render() {
        const {
            profileValues,
            loading,
            classes,
            onEditProfile,
            updateMode
        } = this.props;

        if (!profileValues) return null;

        return (
            <MainLayout>
                <Grid container>
                    <Grid className={classes.leftBar} item md={2}>
                        <Avatar
                            className={classes.avatar}
                            src={avatar(200, profileValues.avatar)}
                        />
                        <Typography variant="h6" align="center">
                            {profileValues.name}
                        </Typography>
                        <Divider />
                        {profileValues.bio
                            ? [
                                  <Typography
                                      variant="body2"
                                      key={0}
                                      align="center"
                                  >
                                      {profileValues.bio}
                                  </Typography>,
                                  <Divider key={1} />
                              ]
                            : null}
                        {profileValues.town ? (
                            <Typography variant="subtitle1" align="center">
                                @{profileValues.town.label}
                            </Typography>
                        ) : null}
                    </Grid>
                    <Grid className={classes.content} item md={8}>
                        <Typography variant="h4">Profile</Typography>
                        <Divider />
                        {!profileValues.avatar ||
                        !profileValues.bio ||
                        !profileValues.town ||
                        !profileValues.country ||
                        updateMode > 0 ? (
                            <ChangeProfile
                                loading={loading}
                                onChange={onEditProfile}
                                profile={profileValues}
                                mode={updateMode}
                            />
                        ) : (
                            <ProfileInfo
                                onEdit={this.handleChangeModeToEdit}
                                profile={profileValues}
                            />
                        )}
                    </Grid>
                    <Grid item md={2}>
                        <Card className={classes.card}>
                            <Typography color="textSecondary" variant="h6">
                                History
                            </Typography>
                            <Divider />
                            <Typography color="textSecondary" align="center" variant="caption">You haven't any activities.</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </MainLayout>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(withRouter(ProfilePage)));
