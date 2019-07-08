import * as React from "react";
import classNames from "classnames";
import Layout from "./Layout";
import { Typography, Divider, Toolbar, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import SearchIcon from "@material-ui/icons/Search";
import PlusIcon from "@material-ui/icons/Create";
import Form from './CRUDPage/Form';

const styler = withStyles(theme => ({
    grow: {
        flexGrow: 1
    },
    green:{
        background:green[400]
    },
    margin:{
        margin:theme.spacing(2)
    }
}));

interface Props {
    classes: {
        grow: string;
        green: string;
        margin: string;
    };
}

class CRUDPage extends React.Component<Props> {
    public render() {
        const { classes } = this.props;

        return (
            <Layout>
                <Toolbar variant="dense">
                    <Typography variant="h5">Users</Typography>
                    <div className={classes.grow} />
                    <Button className={classes.margin} variant="contained" color="primary">
                        <SearchIcon/>
                        Search
                    </Button>
                    <Button className={ classNames( classes.green,classes.margin)} variant="contained" color="primary">
                        <PlusIcon/>
                        Create
                    </Button>
                </Toolbar>
                <Divider />
                <Form/>
            </Layout>
        );
    }
}

export default styler(CRUDPage);
