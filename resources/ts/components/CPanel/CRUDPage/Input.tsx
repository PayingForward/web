import * as React from 'react';
import {Input as IInput} from '../../../store/Admin/CRUDPage/types';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core';

const styler = withStyles(theme=>({
    inputWrapper:{
        color:theme.palette.common.black,
        margin: theme.spacing(4)
    }
}));

interface Props extends IInput {
    classes:{
        inputWrapper:string
    }
}

class Input extends React.Component <Props> {
    public renderInput(){
        const {type,label} = this.props;

        switch (type) {
            case 'text':
                return (
                    <TextField variant="outlined"  color="inherit" fullWidth label={label} />
                );
            default:
               return (
                    <TextField variant="outlined"  color="inherit" fullWidth type={type} label={label} />
               );
        }
    }

    public render(){
        const {classes} = this.props;

        return (
            <div className={classes.inputWrapper}>
                {this.renderInput()}
            </div>
        )
    }
}

export default styler (Input);