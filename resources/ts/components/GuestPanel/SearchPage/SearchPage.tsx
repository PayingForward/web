import * as React from 'react';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/styles/withStyles';
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import Divider from '@material-ui/core/Divider';

import { SIDEBAR_WIDTH } from '../../../constants/config';
import MainLayout from '../Layout/MainLayout';
import Sidebar from './Sidebar';
import IconTextField from '../Layout/IconTextField';

const styler = withStyles((theme)=>({
    wrapper:{
        paddingLeft:SIDEBAR_WIDTH
    },
    center:{
        margin:"auto",
        marginTop:theme.spacing(8),
        marginBottom:theme.spacing(8),
    }
}));

interface Props {
    classes:{
        wrapper:string,
        center:string
    }
}

class SearchPage extends React.Component<Props> {
    public render(){

        const {classes} = this.props;

        return (
            <MainLayout >
                <Sidebar />
                <div className={classes.wrapper}>
                    <Grid container>
                        <Grid md={12} item>
                            <IconTextField
                                label="Search our childrens"
                                leftIcon={
                                    <PersonIcon/>
                                }
                                rightIcon={
                                    <SearchIcon/>
                                }
                                className={classes.center}
                            />
                            <Divider/>
                        </Grid>
                    </Grid>
                </div>
            </MainLayout>
        );
    }
}

export default styler (SearchPage);