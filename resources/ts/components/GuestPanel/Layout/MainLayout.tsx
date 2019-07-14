import * as React from 'react';
import Header from './Header';
import Snacks from './Snacks';
import withStyles from '@material-ui/core/styles/withStyles';

const styler = withStyles(theme=>({
    wrapper:{
        paddingTop:theme.spacing(4)
    }
}))

interface Props {
    children:JSX.Element[] | JSX.Element|string,
    classes:{
        wrapper:string
    }
}

class MainLayout extends React.Component<Props>{
    public render(){
        const {children,classes} = this.props;
        return (
            <div>
                <Header />
                <div className={classes.wrapper} >
                    {children}
                </div>
                <Snacks/>
            </div>
        );
    }
}

export default styler(MainLayout);