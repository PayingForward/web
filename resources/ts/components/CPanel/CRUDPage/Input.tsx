import * as React from "react";
import { Input as IInput } from "../../../store/Admin/CRUDPage/types";
import AjaxDropdown from "./Inputs/AjaxDropdown";
import Avatar from "./Inputs/Avatar";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const styler = withStyles(theme => ({
    inputWrapper: {
        color: theme.palette.common.black,
        margin: theme.spacing(4)
    }
}));

interface Props extends IInput {
    classes: {
        inputWrapper: string;
    };
    value?: any;
    onChange?: (e: any) => void;
    link?: string;
}

class Input extends React.Component<Props> {
    public renderInput() {
        const { type, value, onChange, link } = this.props;

        let formatedValue = value ? value : "";

        const props:any = { ...this.props,classes:undefined,value:formatedValue};

        switch (type) {
            case "ajax_dropdown":
                return (
                    <AjaxDropdown
                        {...props}
                        link={link}
                    />
                );
            case "avatar":
                return (
                    <Avatar
                        {...props}
                    />

                )
            case "text":
                props.searchable = undefined;
                return (
                    <TextField
                        {...props}
                        onChange={
                            onChange ? e => onChange(e.target.value) : undefined
                        }
                        variant="outlined"
                        color="inherit"
                        fullWidth
                    />
                );
            default:
                props.searchable = undefined;
                return (
                    <TextField
                        {...props}
                        onChange={
                            onChange ? e => onChange(e.target.value) : undefined
                        }
                        variant="outlined"
                        color="inherit"
                        fullWidth
                    />
                );
        }
    }

    public render() {
        const { classes } = this.props;

        return <div className={classes.inputWrapper}>{this.renderInput()}</div>;
    }
}

export default styler(Input);
