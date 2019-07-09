import * as React from "react";
import {
    Modal,
    Typography,
    Divider,
    Grid,
    Paper,
    Toolbar,
    Button,
    Switch
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { CRUD_FORM_CREATE, Input as IInput, CRUD_FORM_UPDATE } from "../../../store/Admin/CRUDPage/types";
import Input from "./Input";

const styler = withStyles(theme => ({
    paper: {
        zIndex: 2050,
        position: "absolute",
        top: "15vh",
        left: "25vw",
        width: "50vw",
        color: theme.palette.common.black,
        padding:theme.spacing(4)
    },
    grow: {
        flexGrow: 1
    },
    green: {
        background: green[400],
        color: theme.palette.common.white
    },
    red: {
        background: red[400],
        color: theme.palette.common.white,
        marginLeft:theme.spacing(4)
    }
}));

interface Props {
    open: boolean;
    classes: {
        paper: string;
        grow: string;
        green: string;
        red: string;
    };
    values: {
        [x: string]: any;
    };
    title: string;
    onClose?: () => void;
    onSearchModeToggle: ()=>void;
    mode?: string;
    search: boolean;
    structure: IInput[][];
}

class Form extends React.Component<Props> {
    public renderActionButton() {
        const { mode, classes } = this.props;

        switch (mode) {
            case CRUD_FORM_CREATE:
                return (
                    <Button className={classes.green} variant="contained">
                        Create
                    </Button>
                );
            case CRUD_FORM_UPDATE:
                return (
                    <Button color="secondary" variant="contained">
                        Update
                    </Button>
                )
            default:
                return null;
        }
    }

    public renderInputRows(){
        const {structure} = this.props;

        return structure.map((row,key)=>(
            <Grid key={key} container>
                {this.renderRow(row)}
            </Grid>
        ))
    }

    public renderRow(row:IInput[]){
        let length: 12|6|4|3|2;

        switch (12/row.length) {
            case 12:
                    length=12;
                break;
            case 6:
                    length=6;
                break;
            case 4:
                    length=4;
                break;
            case 3:
                    length=3;
                break;
            default:
                    length=2;
                break;
        }

        return row.map((input,key)=>(
            <Grid key={key} item md={length}>
                <Input {...input}/>
            </Grid>
        ))
    }

    public renderMode(){
        const {mode} = this.props;

        switch (mode) {
            case CRUD_FORM_CREATE:
                return "Create";
            case CRUD_FORM_UPDATE:
                return "Update";
            default:
                return "Search";
        }
    }

    public render() {
        const { open, title, onClose, classes,search,onSearchModeToggle } = this.props;

        return (
            <Modal open={open} onClose={onClose}>
                <Paper className={classes.paper}>
                    <form>
                        <Typography color="inherit" variant="h6" align="center">
                            {this.renderMode()} {title}
                        </Typography>
                        <Divider />
                            {this.renderInputRows()}
                        <Divider />
                        <Grid container>
                            <Grid item xs={12}>
                                <Toolbar variant="dense">
                                    <Switch onChange={onSearchModeToggle} checked={search} />
                                    <Typography variant="caption">
                                        Search
                                    </Typography>
                                    <div className={classes.grow} />
                                    {this.renderActionButton()}
                                    <Button
                                        className={classes.red}
                                        variant="contained"
                                        onClick={onClose}
                                    >
                                        Cancel
                                    </Button>
                                </Toolbar>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Modal>
        );
    }
}

export default styler(Form);
