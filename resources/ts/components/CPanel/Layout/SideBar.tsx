import * as React from "react";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styler = withStyles(({spacing}) => ({
    drawer: {
        width: 140,
        flexShrink:0
    },
    paper: {
        background: "#404040",
        paddingTop:spacing(10),
        width:140
    }
}));

interface Props {
    classes: {
        drawer: string;
        paper: string;
    };
}

class SideBar extends React.Component<Props> {
    public render() {
        const { classes } = this.props;

        return (
            <Drawer
                anchor="left"
                classes={{paper:classes.paper}}
                className={classes.drawer}
                variant="permanent"
            >
                <List>
                    <ListItem button={true} divider={true}>
                        <ListItemText>Menu Item 1</ListItemText>
                    </ListItem>
                    <ListItem button={true} divider={true}>
                        <ListItemText>Menu Item 1</ListItemText>
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default styler(SideBar);
