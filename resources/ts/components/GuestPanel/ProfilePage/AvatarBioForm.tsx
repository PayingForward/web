import * as React from "react";
import AvatarUploader from "react-avatar-edit";

import withStyles from "@material-ui/core/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

import { avatar } from "../../../helpers";
import agent from "../../../agent";
import { Menu, MenuItem, ListItemText } from '@material-ui/core';
import { ResultObject } from 'resources/ts/store/mainTypes';

interface Values {
    avatar?: string;
    bio?: string;
    userType?: ResultObject&{name:string},
    type?:string
}

interface State extends Values {
    userTypeElement?: HTMLButtonElement
}

interface Props {
    values: Values;
    onChange: (values: Values) => void;
    classes: {
        card: string;
        avatar: string;
        bioField: string;
        bioWrapper: string;
        grow: string;
        inactive: string;
        progress: string;
        leftButtonIcon: string;
    };
    loading: boolean;
}

const styler = withStyles(theme => ({
    avatar: {
        width: 160,
        height: 160,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        margin: "auto",
        fontSize: ".5em"
    },
    bioField: {
        margin: "auto",
        textAlign: "center"
    },
    bioWrapper: {
        margin: "auto",
        width: 300
    },
    grow: {
        flexGrow: 1
    },
    inactive: {
        opacity: 0.4,
        pointerEvents: "none"
    },
    progress: {
        marginRight: theme.spacing(4)
    },
    leftButtonIcon:{
        marginLeft: theme.spacing(2)
    }
}));

const userTypes:(ResultObject&{name:string})[] = [
    {
        id:3,
        label: "I Like To Donate",
        name:"donor"
    }, 
    {
        id:2,
        label:"I am a Children",
        name: "orphan"
    },
    {
        id:4,
        label: "I am a Teacher",
        name: "teacher"
    },
    {
        id:5,
        label: "I have a School",
        name:"school"
    }
]

class AvatarBioForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            avatar: props.values.avatar
                ? avatar("full", props.values.avatar)
                : undefined,
            bio: props.values.bio ? props.values.bio : "",
            userType: {
                id:3,
                label:"I like to Donate",
                name: "donor"
            }
        };

        this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
        this.handleChangeBio = this.handleChangeBio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
        this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const { onChange } = this.props;
        const { avatar, bio,userType } = this.state;

        agent.Profile.saveAvatar(avatar ? avatar : "").then(
            ({ message, success, name }) => {
                if (success) {
                    onChange({ avatar: name, bio,type:userType?userType.name:"other" });
                } else {
                    console.error(message);
                }
            }
        );
    }

    handleChangeAvatar(avatar: string) {
        this.setState({ avatar });
    }

    handleChangeBio(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ bio: e.target.value });
    }

    handleOpenUserMenu(e:React.MouseEvent<HTMLButtonElement>){
        this.setState({userTypeElement:e.currentTarget})
    }

    handleCloseUserMenu(){
        this.setState({userTypeElement:undefined});
    }

    handleChangeUserType(userType:ResultObject&{name:string}){
        return ()=>{
            this.setState({userType});
            this.handleCloseUserMenu();
        }
    }

    public render() {
        const { classes, loading  } = this.props;

        const { avatar, bio,userTypeElement,userType } = this.state;

        return (
            <form
                onSubmit={this.handleSubmit}
                className={loading ? classes.inactive : undefined}
                key={0}
            >
                <Toolbar variant="dense" >
                    <Typography align="center" variant="h6" color="textSecondary">
                        Complete Your Profile
                    </Typography>
                    <div className={classes.grow}/>
                    <Button onClick={this.handleOpenUserMenu} color="primary" variant="outlined"  >
                        {userType?userType.label:"I like to..."}
                        <ArrowDropDownIcon className={classes.leftButtonIcon} />
                    </Button>
                    <Menu anchorEl={userTypeElement} onClose={this.handleCloseUserMenu} open={!!userTypeElement}>
                        {userTypes.map((userType,key)=>(
                            <MenuItem onClick={this.handleChangeUserType(userType)} key={key} divider button >
                                <ListItemText primary={userType.label} primaryTypographyProps={{color:"textSecondary"}} />
                            </MenuItem>
                        ))}
                    </Menu>
                </Toolbar>
                <Divider />
                <div className={classes.avatar}>
                    <AvatarUploader
                        width={160}
                        height={160}
                        label="Select a photo.."
                        onCrop={this.handleChangeAvatar}
                        src={avatar}
                    />
                </div>
                <div className={classes.bioWrapper}>
                    <TextField
                        placeholder="I am a..."
                        className={classes.bioField}
                        fullWidth
                        multiline={true}
                        rows={2}
                        rowsMax={3}
                        helperText={
                            !bio || bio.length < 60
                                ? "Please enter a bio more than 60 characters"
                                : undefined
                        }
                        error={!bio || bio.length < 60}
                        onChange={this.handleChangeBio}
                        value={bio}
                    />
                </div>
                <Divider />
                <Toolbar variant="dense">
                    <div className={classes.grow} />
                    {loading ? (
                        <CircularProgress
                            size={32}
                            className={classes.progress}
                        />
                    ) : null}
                    <Button variant="contained" color="primary" type="submit">
                        Continue
                    </Button>
                </Toolbar>
            </form>
        );
    }
}

export default styler(AvatarBioForm);
