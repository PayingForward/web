import * as React from "react";
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

const styler = withStyles(theme => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400
    },
    input: {
        marginLeft: 8,
        flex: 1
    },
    iconButton: {
        padding: 10
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4
    }
}));

interface Props {
    classes: {
        root: string;
        input: string;
        iconButton: string;
        divider: string;
    };
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    label: string;
    value?: string | null | number;
    onChange?: (text?: string | number) => void;
    type?: string;
    className?: string;
    onSubmit?: () => void;
    onClickLeftIcon?: (e?:React.MouseEvent<HTMLButtonElement>)=>void;
}

class IconTextField extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { onChange } = this.props;

        if (typeof onChange != "undefined") {
            onChange(e.target.value);
        }
    }

    public render() {
        const {
            classes,
            label,
            leftIcon,
            rightIcon,
            value,
            type,
            className,
            onSubmit,
            onClickLeftIcon
        } = this.props;

        return (
            <form onSubmit={onSubmit}>
                <Paper className={classNames(classes.root, className)}>
                    <IconButton onClick={onClickLeftIcon} className={classes.iconButton}>
                        {leftIcon}
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder={label}
                        inputProps={{ "aria-label": label }}
                        value={value}
                        onChange={this.handleChange}
                        type={type}
                    />
                    <Divider className={classes.divider} />
                    <IconButton
                        color="primary"
                        className={classes.iconButton}
                        type="submit"
                    >
                        {rightIcon}
                    </IconButton>
                </Paper>
            </form>
        );
    }
}

export default styler(IconTextField);
