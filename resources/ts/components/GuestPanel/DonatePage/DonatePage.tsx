import * as React from 'react';
import MainLayout from '../Layout/MainLayout';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';

const styler = withStyles(theme=>({

}));

class DonatePage extends React.Component {

    render(){
        return (
            <MainLayout >
                <Typography variant="h6" >
                    Donate
                </Typography>
            </MainLayout>
        );
    }
}

export default styler (DonatePage);