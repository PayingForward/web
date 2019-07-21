import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import withStyles from '@material-ui/core/styles/withStyles';
import SidebarSection from "./SidebarSection";
import { SIDEBAR_WIDTH } from '../../../constants/config';

const styler = withStyles((theme)=>({
    drawer:{
        width:SIDEBAR_WIDTH
    },
    paper:{
        width:SIDEBAR_WIDTH,
        background: theme.palette.primary.main,
        paddingTop:theme.spacing(14)
    }
}));

interface Props {
    classes:{
        drawer:string;
        paper:string;
    }
}

class Sidebar extends React.Component<Props> {
    public render(){
        const {classes} = this.props;
        return (
            <Drawer classes={{paper:classes.paper}} className={classes.drawer} anchor="left" variant="permanent" open={true}>
                <SidebarSection
                    title="Age Range"
                    options={[
                        {
                            label:"4-5 Years",
                            id:1
                        },
                        {
                            label:"5-10 Years",
                            id:2
                        }
                    ]}
                />
                <SidebarSection
                    title="Class"
                    options={[
                        {
                            label:"Grade 3",
                            id:1
                        },
                        {
                            label:"Grade 4",
                            id:2
                        }
                    ]}
                />
                <SidebarSection
                    title="Town"
                    options={[
                        {
                            label:"Colombia",
                            id:1
                        },
                        {
                            label:"New York",
                            id:2
                        }
                    ]}
                />
            </Drawer>
        );
    }
}

export default styler(Sidebar);