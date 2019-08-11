import * as React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Header from './Header';
import Snacks from './Snacks';

const styler = withStyles(theme=>({
    wrapper:{
        paddingTop:24
    }
}))

interface Props {
    children:JSX.Element[] | JSX.Element|string,
    classes:{
        wrapper:string
    },
    className?:string
}

class MainLayout extends React.Component<Props>{
    public render(){
        const {children,classes,className} = this.props;
        return (
            <div className={classNames(classes.wrapper,className)}>
                <Header />
                <Snacks/>
                {children}
            </div>
        );
    }
}

export default styler(MainLayout);