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
                    <MenuList>
                        <ListItem button divider>
                            Profile
                        </ListItem>
                    </MenuList>
                    <MenuList>
                        <ListItem button divider>
                            Settings
                        </ListItem>
                    </MenuList>
                    <MenuList>
                        <ListItem button divider>
                            Dashboard
                        </ListItem>
                    </MenuList>
                    <MenuList>
                        <ListItem button divider>
                            Log out
                        </ListItem>
                    </MenuList>
                </Menu>
            </React.Fragment>
        );
    }
}

export default styler( connect(mapStateToProps)(UserArea));