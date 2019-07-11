import * as React from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import withStyles from "@material-ui/styles/withStyles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import { CRUD_FORM_CREATE, Input as IInput, CRUD_FORM_UPDATE, CRUD_FORM_SEARCH } from "../../../store/Admin/CRUDPage/types";
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
    onChangeInput:(name:string,value:any)=>void;
    mode?: string;
    search: boolean;
    structure: IInput[][];
    onSubmit?:()=>void;
}

class Form extends React.Component<Props> {

    constructor(props:Props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e:React.FormEvent){
        const {onSubmit} = this.props;

        e.preventDefault();

        if(onSubmit){
            onSubmit();
        }
    }

    public renderActionButton() {
        const { mode, classes } = this.props;

        switch (mode) {
            case CRUD_FORM_CREATE:
                return (
                    <Button type="submit" className={classes.green} variant="contained">
                        Create
                    </Button>
                );
            case CRUD_FORM_UPDATE:
                return (
                    <Button type="submit" color="secondary" variant="contained">
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
        const {values,onChangeInput,mode} = this.props;
        let length: 12|6|4|3|2;

        const filteredRow = row.filter((input:IInput)=>{
            if(mode==CRUD_FORM_SEARCH){
                return input.searchable;
            }
            return true;
        });

        switch (12/filteredRow.length) {
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

        return filteredRow.map((input,key)=>(
            <Grid key={key} item md={length}>
                <Input onChange={value=>onChangeInput(input.name,value)} value={values[input.name]} {...input}/>
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
                    <form onSubmit={this.handleSubmit}>
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
