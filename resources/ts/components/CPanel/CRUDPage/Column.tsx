import * as React from 'react';
import {Column as IColumn} from '../../../store/Admin/CRUDPage/types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from './Columns/Avatar';

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
    public renderColumn(){
        const {value,type} = this.props;

        if(!value)
            return null;

        switch (type) {
            case "ajax_dropdown":
                return value.label;
            case "avatar":
                return <Avatar {...this.props} classes={undefined} value={value} />
            default:
                return value;
        }
    }

    public render(){
        const {classes} = this.props;

        return (
            <div className={classes.columnWrapper}>
                {this.renderColumn()}
            </div>
        )
    }
}

export default styler (Column);