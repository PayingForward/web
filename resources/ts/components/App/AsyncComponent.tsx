import * as React from 'react';
import LoadingPage from './LoadingPage';

interface Props {
    Component:React.ComponentType<any>;
    page?:boolean;
    [x:string]:any
}

interface States {
    Component:React.ComponentType<any>;
}

class AsyncComponent extends React.Component <Props,States> {

    componentWillMount(){
        const {Component} = this.props;

        this.setState({Component})
    }

    render(){
        const {Component} = this.state;

        const {page} = this.props;

        if(!Component) return null;

        return (
            <React.Suspense fallback={page?<LoadingPage/>:<div>Loading...</div>}>
                <Component {...this.props}/>
            </React.Suspense>
        )
    }

}

export default AsyncComponent;