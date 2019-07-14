import * as React from 'react';
import AvatarUploader from 'react-avatar-edit';
import { Input } from '../../../../store/Admin/CRUDPage/types';
import withStyles from '@material-ui/core/styles/withStyles';
import { avatar } from '../../../../helpers';

const styler = withStyles(()=>({
    root:{
        fontSize:'.7em!important',
        margin:'auto',
        width:120
    }
}))

interface Props extends Input{
    classes?:{
        root:string
    },
    onChange?:(x:string)=>void,
    value:string
}

interface States {
    value?:string
}

class Avatar extends React.Component<Props,States>{

    constructor(props:Props){
        super(props);

        this.state = {
            value:avatar('full',props.value)
        };
    }

    public render(){
        const {label,classes,onChange} = this.props;
        const {value} = this.state;

        if(!classes) return null;
        
        return (
            <div className={classes.root}>
                <AvatarUploader
                    width={120}
                    height={120}
                    label={label}
                    onCrop={onChange}
                    src={value?value:undefined}
                />
            </div>
        )
    }
}

export default styler (Avatar);

