import * as React from "react";

import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

import { UserCompleteInfo } from "../../../store/SearchPage/types";
import { avatar as avatarGenerator, nameToURL } from "../../../helpers";
import { Button } from '@material-ui/core';
import { withRouter, RouteComponentProps } from 'react-router';

const styler = withStyles(theme => ({
    paper: {
        textAlign: "center",
        padding: theme.spacing(2),
        margin: theme.spacing(4)
    },
    avatar: {
        margin: "auto",
        width: 120,
        height: 120
    },
    marginTop: {
        marginTop: theme.spacing(2)
    },
    secondaryText:{
        color:theme.palette.grey[700],
        paddingRight:8
    }
}));

type Props =  UserCompleteInfo & {
    classes?: {
        paper: string;
        avatar: string;
        marginTop: string;
        secondaryText:string;
    };
} & RouteComponentProps<{}>;

class UserCard extends React.Component<Props> {

    constructor(props:Props){
        super(props);

        this.handleDonateClick = this.handleDonateClick.bind(this);
    }

    handleDonateClick(){
        const {id,name,history} = this.props;

        history.push('/donate/'+id+'/'+nameToURL(name));
    }

    render() {
        const { classes, avatar, name, school,schoolClass,town } = this.props;

        if (!classes) return null;

        return (
            <Paper className={classes.paper}>
                <Avatar
                    className={classes.avatar}
                    src={avatarGenerator(200, avatar)}
                />
                <Typography
                    className={classes.marginTop}
                    color="textSecondary"
                    variant="h5"
                >
                    {name}
                </Typography>
                <div>
                    <Typography className={classes.secondaryText} display="inline" variant="body2">
                        Studieng at:-
                    </Typography>
                    <Typography color="textSecondary" display="inline">{school.label}</Typography>
                </div>
                <div>
                    <Typography className={classes.secondaryText} display="inline" variant="body2">
                        Class:-
                    </Typography>
                    <Typography color="textSecondary" display="inline">{schoolClass.label}</Typography>
                </div>
                <div>
                    <Typography className={classes.secondaryText} display="inline" variant="body2">
                        Living in:-
                    </Typography>
                    <Typography color="textSecondary" display="inline">{town.label}</Typography>
                </div>
                <Divider/>
                <Button onClick={this.handleDonateClick} className={classes.marginTop} color="primary" variant="outlined" >
                    Donate
                </Button>
            </Paper>
        );
    }
}

export default withRouter(styler(UserCard));
