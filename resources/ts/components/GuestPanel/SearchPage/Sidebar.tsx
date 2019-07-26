import * as React from 'react';
import Drawer from '@material-ui/core/Drawer';
import withStyles from '@material-ui/core/styles/withStyles';
import SidebarSection from "./SidebarSection";
import { SIDEBAR_WIDTH } from '../../../constants/config';
import { Option } from '../../../store/SearchPage/types';

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
    },
    options:{
        [x: string]: Option[];
    },
    selected:{
        [x: string]: (string | number)[]
    },
    onSearch:{
        [x:string]:(keyword:string)=>void
    },
    onChange:{
        [x:string]:(id:string|number)=>void
    }
}

class Sidebar extends React.Component<Props> {
    public render(){
        const {classes,options,onSearch,onChange} = this.props;

        return (
            <Drawer classes={{paper:classes.paper}} className={classes.drawer} anchor="left" variant="permanent" open={true}>
                <SidebarSection
                    title="Age Range"
                    options={options.age_range?options.age_range:[]}
                    onSearch={onSearch.age_range}
                    onChange={onChange.age_range}
                />
                <SidebarSection
                    title="School"
                    options={options.school?options.school:[]}
                    onSearch={onSearch.school}
                    onChange={onChange.school}
                />
                <SidebarSection
                    title="Town"
                    options={options.town?options.town:[]}
                    onSearch={onSearch.town}
                    onChange={onChange.town}
                />
            </Drawer>
        );
    }
}

export default styler(Sidebar);