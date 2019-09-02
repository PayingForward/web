import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import withStyles from "@material-ui/styles/withStyles";

import { ProfileInformation } from "../../../store/ProfilePage/types";
import {
    CompleteDonorInformations,
    CompleteChildInformations
} from "resources/ts/store/mainTypes";
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import EditIcon from "@material-ui/icons/Edit";

interface Props {
    profile: ProfileInformation;
    classes: {
        divider: string;
        grow: string;
        buttonIcon:string
    };
    onEdit:()=>void
}

const styler = withStyles(theme => ({
    divider: {
        marginTop: theme.spacing(4)
    },
    grow:{
        flexGrow:1
    },
    buttonIcon:{
        marginRight:theme.spacing(2)
    }
}));

class ProfileInfo extends React.Component<Props> {
    public render() {
        const { profile, classes, onEdit } = this.props;

        const donorProfile = profile as CompleteDonorInformations;
        const childProfile = profile as CompleteChildInformations;

        return (
            <div>
                <Typography variant="h6">Personal Informations</Typography>
                <Divider className={classes.divider}/>
                <Grid container>
                    <Grid item md={4}>
                        <Typography variant="body2">Name</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <Typography align="center" variant="body1">
                            {profile.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container>
                    <Grid item md={4}>
                        <Typography variant="body2">Country</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <Typography align="center" variant="body1">
                            {profile.country
                                ? profile.country.label
                                : "Not supplied"}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container>
                    <Grid item md={4}>
                        <Typography variant="body2">Town</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <Typography align="center" variant="body1">
                            {profile.town ? profile.town.label : "Not supplied"}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}/>
                {profile.type == "donor"
                    ? [
                          <Grid key={0} container>
                              <Grid item md={4}>
                                  <Typography variant="body1">
                                      Occupation
                                  </Typography>
                              </Grid>
                              <Grid item md={8}>
                                  <Typography align="center" variant="body2">
                                      {donorProfile.occupation
                                          ? donorProfile.occupation.label
                                          : "Not Supplied"}
                                  </Typography>
                              </Grid>
                          </Grid>,
                          <Divider className={classes.divider} key={1} />,
                          <Grid key={2} container>
                              <Grid item md={4}>
                                  <Typography variant="body1">
                                      Interested Country
                                  </Typography>
                              </Grid>
                              <Grid item md={8}>
                                  <Typography align="center" variant="body2">
                                      {donorProfile.interestCountry
                                          ? donorProfile.interestCountry.label
                                          : "Not Supplied"}
                                  </Typography>
                              </Grid>
                          </Grid>,
                          <Divider className={classes.divider} key={3} />,
                          <Grid container key={4}>
                              <Grid item md={4}>
                                  <Typography variant="body1">
                                      Contact Email
                                  </Typography>
                              </Grid>
                              <Grid item md={8}>
                                  <Typography align="center" variant="body2">
                                      {donorProfile.contactEmail
                                          ? donorProfile.contactEmail
                                          : "Not Supplied"}
                                  </Typography>
                              </Grid>
                          </Grid>
                      ]
                    : null}
                {profile.type == "orphan"
                    ? [
                          <Grid key={0} container>
                              <Grid item md={4}>
                                  <Typography variant="body1">
                                      School
                                  </Typography>
                              </Grid>
                              <Grid item md={8}>
                                  <Typography align="center" variant="body2">
                                      {childProfile.school
                                          ? childProfile.school.label
                                          : "Not Supplied"}
                                  </Typography>
                              </Grid>
                          </Grid>,
                          <Divider className={classes.divider} key={1} />,
                          <Grid key={2} container>
                              <Grid item md={4}>
                                  <Typography variant="body1">Class</Typography>
                              </Grid>
                              <Grid item md={8}>
                                  <Typography align="center" variant="body2">
                                      {childProfile.class
                                          ? childProfile.class.label
                                          : "Not Supplied"}
                                  </Typography>
                              </Grid>
                          </Grid>
                      ]
                    : null}
                <Toolbar variant="dense">
                    <div className={classes.grow}/>
                    <Button onClick={onEdit} variant="outlined" color="primary" >
                        <EditIcon className={classes.buttonIcon} />
                        Edit
                    </Button>
                </Toolbar>
            </div>
        );
    }
}

export default styler(ProfileInfo);
