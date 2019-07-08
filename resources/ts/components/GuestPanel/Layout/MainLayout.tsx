import * as React from 'react';
import Header from './Header';

interface Props {
    children:JSX.Element[] | JSX.Element|string
}

export default class MainLayout extends React.Component<Props>{
    public render(){
        const {children} = this.props;
        return (
            <div>
                <Header />
                {children}
            </div>
        );
    }
}