import * as React from 'react';

import Grid from '@material-ui/core/Grid';

import MainLayout from "../Layout/MainLayout";

class ProfilePage extends React.Component {
    public render(){
        return (
            <MainLayout >
                <Grid container>
                    <Grid item md={2}>
                        jnjnj
                    </Grid>
                    <Grid item md={8}>
                        knjknjk
                    </Grid>
                    <Grid item md={2}>
                        jknkjnk
                    </Grid>
                </Grid>
            </MainLayout>
        );
    }
}

export default ProfilePage;