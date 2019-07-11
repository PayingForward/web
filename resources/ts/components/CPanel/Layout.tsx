import * as React from "react";
import withStyles from "@material-ui/styles/withStyles";
import MainLayout from '../GuestPanel/Layout/MainLayout';
import SideBar from './Layout/SideBar';

const styler = withStyles(() => ({
    wrapper: {
        paddingLeft:150
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
