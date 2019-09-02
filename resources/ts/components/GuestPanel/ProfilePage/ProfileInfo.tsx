import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import {
    ProfileInformation
} from "../../../store/ProfilePage/types";

interface Props {
    profile:ProfileInformation
}

class ProfileInfo extends React.Component <Props> {
    public render(){
        const {profile} = this.props;

        return (
            <div>
                <Grid container>
                    <Grid item md={4}>
                        <Typography variant="body2" >Name</Typography>
                    </Grid>
                    <Grid item md={8}>
                        <Typography align="center" variant="body1">{profile.name}</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ProfileInfo;