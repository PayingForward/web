import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import MainLayout from "../Layout/MainLayout";
import { AppState } from '../../../rootReducer';
import { ProfilePageState } from '../../../store/ProfilePage/types';
import { fetchProfile } from '../../../store/ProfilePage/actions';
import { avatar } from '../../../helpers';

const mapStateToProps = (state:AppState):ProfilePageState=>({
    ...state.profilePage
});

const mapDispatchToProps = (dispatch:ThunkDispatch<{},{},any>)=>({
    onChangeProfile:(userId?:number)=>dispatch(fetchProfile(userId))
})

const styler = withStyles((theme)=>({
    avatar: {
        width:160,
        height:160,
        margin:'auto',
        marginBottom:theme.spacing(2)
    },
    leftBar:{
        background: theme.palette.grey[300],
        padding: theme.spacing(4),
        minHeight: 'calc(100vh - '+56+'px)'
    }
}))

interface Props extends ProfilePageState{
    match:{
        params:{
            id?:string,
            name?:string
        }
    },
    classes:{
        avatar:string,
        leftBar:string
    },
    onChangeProfile:(userId?:number)=>void
}

class ProfilePage extends React.Component<Props&RouteComponentProps> {

    constructor(props:Props&RouteComponentProps){
        super(props);
    }

    componentDidMount(){
        const {match,onChangeProfile} = this.props;

        if(match.params.id){
            onChangeProfile(parseInt(match.params.id))
        } else {
            onChangeProfile()
        }
    }

    componentDidUpdate(prevProps:Props&RouteComponentProps){
        const {match,onChangeProfile} = this.props;

        if(match.params.id!==prevProps.match.params.id){
            if(match.params.id){
                onChangeProfile(parseInt(match.params.id))
            } else{
                onChangeProfile()
            }
        }
    }

    public render(){
        const {profileValues,classes} = this.props;

        if(!profileValues) return null;

        return (
            <MainLayout >
                <Grid container>
                    <Grid className={classes.leftBar} item md={2}>
                        <Avatar className={classes.avatar} src={avatar(200,profileValues.avatar)}  />
                        <Typography variant="h6" align="center">{profileValues.name}</Typography>
                        {
                            profileValues.town?
                            <Typography variant="body1" align="center">{profileValues.town.label}</Typography>:null
                        }
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

export default connect(mapStateToProps,mapDispatchToProps) ( styler( withRouter (ProfilePage)));