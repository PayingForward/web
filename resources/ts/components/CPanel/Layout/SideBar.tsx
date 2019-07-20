import * as React from "react";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { Link, LinkProps } from "react-router-dom";

import {
    fetchSidebar,
    expandedItem,
    collapsedItem
} from "../../../store/Admin/Sidebar/actions";
import { SidebarItem, SidebarState } from "../../../store/Admin/Sidebar/types";
import { SIDEBAR_WIDTH } from '../../../constants/config';
import { AppState } from "../../../rootReducer";


import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDownIcon from "@material-ui/icons/ArrowDropDown";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/styles/withStyles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import MapIcon from "@material-ui/icons/Map";
import PersonIcon from "@material-ui/icons/Person";
import SchoolIcon from "@material-ui/icons/School";

const styler = withStyles(({ spacing,palette }) => ({
    drawer: {
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        paddingBottom:spacing(10)
    },
    paper: {
        background: palette.primary.main,
        paddingTop: spacing(10),
        width: SIDEBAR_WIDTH
    },
    list:{
        paddingBottom:spacing(15)
    }
}));

interface Props extends SidebarState {
    classes: {
        drawer: string;
        paper: string;
        list: string;
    };
    onLoad: () => void;
    onExpand: (id:string)=>void;
    onCollapse:(id:String)=>void;
}

const mapStateToProps = (state: AppState) => ({
    ...state.sidebar
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    onLoad: () => dispatch(fetchSidebar()),
    onExpand: (id: string) => dispatch(expandedItem(id)),
    onCollapse: (id: string) => dispatch(collapsedItem(id))
});

const icons: { [x: string]: React.ComponentType<SvgIconProps> } = {
    country:MapIcon,
    user:PersonIcon,
    school:SchoolIcon,
};

class SideBar extends React.Component<Props> {
    componentDidMount() {
        this.props.onLoad();
    }

    renderLink(link?:string){

        if(link){
            return React.forwardRef((props:LinkProps|any,ref)=>  (
                <Link to={link ? link : "/"} {...props} innerRef={ref} />
            ) )
        } else {
            return React.forwardRef((props:LinkProps|any,ref)=>  (
                <div {...props} ref={ref} />
            ))
        }
    }

    public renderItems(items: SidebarItem[]) {
        return items.map(({ link, title, items, id }, key) => (
            <React.Fragment key={key}>
                <ListItem
                    button={true}
                    divider={true}
                    component={this.renderLink(link)}
                >
                    {this.renderIcon(id)}
                    <ListItemText >{title}</ListItemText>
                    {this.renderItemButton(id,!!items)}
                </ListItem>
                {this.renderChildrens(id, items)}
            </React.Fragment>
        ));
    }

    renderItemButton(id:string,hasChild:boolean){
        const {expanded,onCollapse,onExpand} = this.props;
        if(!hasChild){
            return null;
        }

        if(expanded.includes(id)){
            return (
                <IconButton onClick={e=>onCollapse(id)} >
                    <ArrowUpIcon color="secondary" />
                </IconButton>
            )
        } else {
            return (
                <IconButton onClick={e=>onExpand(id)} >
                    <ArrowDownIcon color="secondary"/>
                </IconButton>
            )
        }
    }

    renderIcon(id: string) {
        if (!icons[id]) {
            return null;
        }

        const IconComp = icons[id];

        return (
            <ListItemIcon>
                <IconComp color="secondary" />
            </ListItemIcon>
        );
    }

    public renderChildrens(id: string, childrens?: SidebarItem[]) {
        const { expanded } = this.props;

        if (!childrens) {
            return null;
        }

        return (
            <Collapse
                in={expanded.includes(id)}
                timeout="auto"
                unmountOnExit={true}
            >
                <List>{this.renderItems(childrens)}</List>
            </Collapse>
        );
    }

    public render() {
        const { classes, items } = this.props;

        return (
            <Drawer
                anchor="left"
                classes={{ paper: classes.paper }}
                className={classes.drawer}
                variant="permanent"
            >
                <List className={classes.list} >{this.renderItems(items)}</List>
            </Drawer>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(styler(SideBar));
