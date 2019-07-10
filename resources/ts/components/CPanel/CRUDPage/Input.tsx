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
    },
    value?:any,
    onChange?:(e:any)=>void
}

class Input extends React.Component <Props> {
    public renderInput(){
        const {type,label,value,onChange} = this.props;

        let formatedValue = value?value:"";

        const props = {type,label,value:formatedValue,onChange};

        switch (type) {
            case 'text':
                return (
                    <TextField {...props} onChange={onChange?e=>onChange(e.target.value):undefined} variant="outlined"  color="inherit" fullWidth />
                );
            default:
               return (
                    <TextField {...props} onChange={onChange?e=>onChange(e.target.value):undefined} variant="outlined"  color="inherit" fullWidth />
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