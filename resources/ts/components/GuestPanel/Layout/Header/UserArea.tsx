import * as React from 'react';
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import {AppState} from '../../../../rootReducer';
import { AuthControllerState } from '../../../../store/AuthController/types';
import {avatar} from '../../../../helpers';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/MenuList';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import ArrowDownIcon from "@material-ui/icons/ArrowDropDown";
import Typography from '@material-ui/core/Typography';
import { USER_TOKEN_KEY, APP_URL } from '../../../../constants/config';

const mapStateToProps = (state:AppState)=>({
    ...state.authController
});

interface States {
    menuRef?:null | HTMLElement
}

interface Props extends AuthControllerState {
    classes:{
        menu:string
    }
}

const styler = withStyles(({spacing})=>({
    menu:{
        marginTop:spacing(9)
    }
}))

class UserArea extends React.Component<Props,States> {

    constructor(props:Props) {
        super(props)
        this.state ={};

        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
    }

    handleOpenMenu(e:React.MouseEvent<HTMLButtonElement>){
        this.setState({
            menuRef:e.currentTarget
        })
    }

    handleCloseMenu(){
        this.setState({
            menuRef:undefined
        });
    }
    
    handleLogOutClick(){
        localStorage.removeItem(USER_TOKEN_KEY);

        if(typeof APP_URL !=='undefined'){
            window.location.href = APP_URL;
        }
    }

    public render(){
        const {user,classes} = this.props;
        const {menuRef} = this.state;

        if(!user) return null;

        return (
            <React.Fragment>
                <Avatar >
                    <img src={avatar(32,user.avatar)} alt={user.name+" Profile Picture"}/>
                </Avatar>
                <IconButton onClick={this.handleOpenMenu} color="inherit">
                    <ArrowDownIcon color="inherit"/>
                </IconButton>
                <Menu variant="selectedMenu" classes={{paper:classes.menu}} onClose={this.handleCloseMenu} anchorEl={menuRef} open={!!menuRef}>
                    {/* <MenuList>
                        <ListItem button divider>
                            <Typography color="textSecondary">Profile</Typography>
                        </ListItem>
                    </MenuList>
                    <MenuList>
                        <ListItem button divider>
                            <Typography color="textSecondary">Settings</Typography>
                        </ListItem>
                    </MenuList>
                    <MenuList>
                        <ListItem button divider>
                            <Typography color="textSecondary">Dashboard</Typography>
                        </ListItem>
                    </MenuList> */}
                    <MenuList>
                        <ListItem onClick={this.handleLogOutClick} button divider>
                            <Typography color="textSecondary">Log Out</Typography>
                        </ListItem>
                    </MenuList>
                </Menu>
            </React.Fragment>
        );
    }
}

export default styler( connect(mapStateToProps)(UserArea));