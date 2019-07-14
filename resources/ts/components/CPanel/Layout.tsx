import * as React from "react";
import withStyles from "@material-ui/styles/withStyles";
import MainLayout from '../GuestPanel/Layout/MainLayout';
import SideBar from './Layout/SideBar';
import { SIDEBAR_WIDTH } from '../../constants/config';

const styler = withStyles(() => ({
    wrapper: {
        paddingLeft:SIDEBAR_WIDTH
    }
}));

interface Props {
    classes: {
        wrapper: string;
    };
    children: JSX.Element | JSX.Element[] | string;
}

class Layout extends React.Component<Props> {
    public render() {
        const { classes, children } = this.props;

        return (
            <MainLayout>
                <SideBar />
                <div className={classes.wrapper}>{children}</div>
            </MainLayout>
        );
    }
}

export default styler(Layout);
