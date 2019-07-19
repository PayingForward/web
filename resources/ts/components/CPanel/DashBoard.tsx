import * as React from 'react';
import Layout from './Layout';
import { APP_NAME } from '../../constants/config';

class DashBoard extends React.Component{
    public render(){
        return (
            <Layout>
                <div>{APP_NAME} Dashboard</div>
                
            </Layout>
        )
    }
}

export default DashBoard;