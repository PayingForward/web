import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import {parse} from 'query-string';

import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import MainLayout from '../Layout/MainLayout';
import { AppState } from '../../../rootReducer';
import { fetchInfo, clearChild, changeAmount, changeMode, changePrivacy } from '../../../store/DonatePage/actions';
import { DonationPageState } from '../../../store/DonatePage/types';
import { avatar } from '../../../helpers';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, Toolbar, Button, TextField, FormControlLabel } from '@material-ui/core';
import { errorSnack } from '../../../store/SnackController/actions';

const styler = withStyles(theme=>({
    paper:{
        margin:theme.spacing(4),
        padding: theme.spacing(4)
    },
    avatar:{
        width:64,
        height:64,
        margin:'auto',
        marginBottom: theme.spacing(4)
    },
    divider:{
        marginTop:theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    grow:{
        flexGrow:1
    },
    textSecondary:{
        color:theme.palette.text.secondary
    }
}));

const mapStateToProps = (state:AppState)=>({
    ...state.donatePage
});

const mapDispatchToProps = (dispatch:ThunkDispatch<{},{},any>)=>({
    onChangeChild:(childId:number|string)=>dispatch(fetchInfo(childId)),
    onClearChild:()=>dispatch(clearChild()),
    onChangeAmount:(amount?:number|string)=>dispatch(changeAmount(amount)),
    onError:(message:string)=>dispatch(errorSnack(message)),
    onChangeMode:(mode:number)=>dispatch(changeMode(mode)),
    onChangePrivacy:(anonymous:boolean)=>dispatch(changePrivacy(anonymous))
});

interface Props extends DonationPageState {
    classes:{
        paper:string,
        avatar:string,
        divider:string,
        grow:string,
        textSecondary:string
    },
    match:{
        params:{
            id?:string|number
        }
    },
    onChangeChild:(childId:number|string)=>void,
    onClearChild:()=>void,
    onChangeAmount:(amount?:number|string)=>void,
    onChangeMode:(mode:number)=>void,
    onChangePrivacy:(anonymous:boolean)=>void,
    onError:(message:string)=>void
}

class DonatePage extends React.Component<Props&RouteComponentProps> {

    constructor(props:Props&RouteComponentProps){
        super(props);

        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangePrivacy = this.handleChangePrivacy.bind(this);
    }

    componentDidMount(){
        const {match,onChangeChild,location,onChangeAmount} = this.props;

        if(match.params.id){
            onChangeChild(match.params.id);
        }

        const parameters:{amount?:number|string} = parse(location.search);

        onChangeAmount(parameters.amount)
    }

    componentDidUpdate(prevProps:Props&RouteComponentProps){
        const currentChild = this.props.match.params.id;
        const prevChild = prevProps.match.params.id;
        if(currentChild!=prevChild){
            if(currentChild){
                this.props.onChangeChild(currentChild);
            } else {
                this.props.onClearChild();
            }
        }
    }

    handleChangeAmount(e:React.ChangeEvent<HTMLInputElement>){
        this.props.onChangeAmount(e.target.value);
    }

    handleSubmit(e:React.FormEvent<HTMLFormElement>){
        const {amount,onError} = this.props;

        e.preventDefault();

        if(!amount) {
            onError("Please enter an amount to donate.");
            return;
        }

        e.currentTarget.submit();
    }

    handleChangeMode(mode:number){
        const {onChangeMode} = this.props;

        return ()=>{
            onChangeMode(mode);
        }
    }

    handleChangePrivacy(e:React.ChangeEvent<HTMLInputElement>,checked:boolean){
        this.props.onChangePrivacy(checked);
    }

    renderChildDescription(){
        const {child,classes} = this.props;

        if(!child){
            return null;
        }

        const description = child.name + " is studieng hard and .. he is live in "+child.town.label+" and he is studieng in "+child.school.label+" at grade "+child.schoolClass.label+". Put your description.";

        return (
            <React.Fragment>
                <Avatar className={classes.avatar}  src={avatar(64,child.avatar)} />
                <Typography color="textSecondary" >{description}</Typography>
                <input type="hidden" name="mode" value={0}/>
                <input type="hidden" name="child" value={child.id}/>
                <Typography color="textSecondary" variant="h6">Do you like to help {child.name}? </Typography>
            </React.Fragment>
        )
    }

    renderOtherDetails(){
        const {child,mode} = this.props;

        if(child){
            return null;
        }

        return (
            <React.Fragment>
                <Typography color="textSecondary" >
                    We are maintaining our servers ... Description about our work.
                </Typography>
                <List dense>
                    <ListItem dense divider>
                        <ListItemText primaryTypographyProps={{color:"textSecondary"}} primary="Donate for server maintainces" />
                        <ListItemSecondaryAction>
                            <Checkbox name="mode[1]" checked={mode==1} onChange={this.handleChangeMode(1)} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem dense divider>
                        <ListItemText primaryTypographyProps={{color:"textSecondary"}} primary="Donate for staff members" />
                        <ListItemSecondaryAction>
                            <Checkbox name="mode[2]" checked={mode==2} onChange={this.handleChangeMode(2)} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem dense divider>
                        <ListItemText primaryTypographyProps={{color:"textSecondary"}} primary="Donate for childrens" />
                        <ListItemSecondaryAction>
                            <Checkbox name="mode[3]" checked={mode==3} onChange={this.handleChangeMode(3)} />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </React.Fragment>
        )
    }



    render(){
        const {classes,amount,anonymous} = this.props;

        return (
            <MainLayout >
                <Grid justify="center" container>
                    <Grid item md={8}>
                        <form onSubmit={this.handleSubmit} action="/donate/box" >
                            <Paper className={classes.paper} >
                                <Typography color="textSecondary" align="center" variant="h6">Donate</Typography>
                                <Divider className={classes.divider} />
                                <Grid justify="center" container>
                                    <Grid item md={8}>
                                        {this.renderChildDescription()}
                                        {this.renderOtherDetails()}
                                        <Typography color="textSecondary">
                                            How we are using your money.. Description
                                        </Typography>
                                        <TextField
                                            label="Amount"
                                            value={amount}
                                            onChange={this.handleChangeAmount}
                                            type="number"
                                            name="amount"
                                            fullWidth
                                        />
                                        <Divider/>
                                        <FormControlLabel
                                            control={
                                                <Checkbox onChange={this.handleChangePrivacy} checked={anonymous} name="annonymous" />
                                            }
                                            label="Make my donation annonymously"
                                            classes={{
                                                label:classes.textSecondary
                                            }}
                                        />
                                        <Toolbar variant="dense" >
                                            <div className={classes.grow} />
                                            <Button type="submit" variant="contained" color="primary" >
                                                Confirm
                                            </Button>
                                        </Toolbar>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </form>
                    </Grid>
                </Grid>
            </MainLayout>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)( styler (withRouter( DonatePage)));