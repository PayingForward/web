import * as React from 'react';
import MuiAvatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';
import {Column} from '../../../../store/Admin/CRUDPage/types';
import { APP_URL } from '../../../../constants/config';

interface Props extends Column{
    value:string,
    classes?:{
        root:string
    }
}

const styler = withStyles(()=>({
    root:{
        width:32,
        height:32
    }
}))

class Avatar extends React.Component<Props>{
    public render(){
        const {classes,value} = this.props;
        if(!classes){
            return null;
        }
        
        return (
            <MuiAvatar src={APP_URL+'storage/images/uploads/32/'+value+'.jpg'} className={classes.root} />
        )
    }
}

export default styler(Avatar);