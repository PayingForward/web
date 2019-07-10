import * as React from 'react';
import {Column as IColumn} from '../../../store/Admin/CRUDPage/types';
import { withStyles } from '@material-ui/core';

const styler = withStyles(theme=>({
    columnWrapper:{
        color:theme.palette.common.black,
        margin: theme.spacing(4)
    }
}));

interface Props extends IColumn {
    classes:{
        columnWrapper:string
    },
    value?:any
}

class Column extends React.Component <Props> {
    public renderInput(){
        const {value} = this.props;

        return value;
    }

    public render(){
        const {classes} = this.props;

        return (
            <div className={classes.columnWrapper}>
                {this.renderInput()}
            </div>
        )
    }
}

export default styler (Column);