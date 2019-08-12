import * as React from "react";
import clsx from "clsx";
import AsyncSelect from "react-select/async";
import { emphasize, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import { ValueContainerProps } from "react-select/src/components/containers";
import { ControlProps } from "react-select/src/components/Control";
import { MenuProps, NoticeProps } from "react-select/src/components/Menu";
import { MultiValueProps } from "react-select/src/components/MultiValue";
import { OptionProps } from "react-select/src/components/Option";
import { PlaceholderProps } from "react-select/src/components/Placeholder";
import { SingleValueProps } from "react-select/src/components/SingleValue";
import { Input } from "../../../../store/Admin/CRUDPage/types";
import {ResultObject} from '../../../../store/mainTypes';
import agent from "../../../../agent";

const styler = withStyles((theme: Theme) => ({
    input: {
        display: "flex",
        height: "auto"
    },
    valueContainer: {
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        alignItems: "center",
        overflow: "hidden"
    },
    chip: {
        margin: theme.spacing(0.5, 0.25)
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === "light"
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2)
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: "absolute",
        left: 2,
        bottom: 6,
        fontSize: 16
    },
    paper: {
        position: "absolute",
        zIndex: 1000,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing(2)
    }
}));

function NoOptionsMessage(props: NoticeProps<ResultObject>) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

type InputComponentProps = Pick<BaseTextFieldProps, "inputRef"> &
    React.HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
    return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<ResultObject>) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps }
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps
                }
            }}
            {...TextFieldProps}
            variant="outlined"
        />
    );
}

function Option(props: OptionProps<ResultObject>) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props: PlaceholderProps<ResultObject>) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props: SingleValueProps<ResultObject>) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function ValueContainer(props: ValueContainerProps<ResultObject>) {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    );
}


function MultiValue(props: MultiValueProps<ResultObject>) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={clsx(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props: MenuProps<ResultObject>) {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

interface Props extends Input {
    value?: ResultObject;
    onChange?: (opt: ResultObject) => void;
    where?: { [x: string]: any };
    link?: string;
    classes?: {
        root: string;
        input: string;
        valueContainer: string;
        chip: string;
        chipFocused: string;
        noOptionsMessage: string;
        singleValue: string;
        placeholder: string;
        paper: string;
        divider: string;
    };
}

class AjaxDropdown extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.loadOptions = this.loadOptions.bind(this);
    }

    loadOptions(
        inputValue: string,
        callback: (options: readonly ResultObject[]) => void
    ) {
        const { attributes, where } = this.props;

        const linkAttribute = attributes
            .filter(attr => attr.name == "link")
            .shift();

        if (linkAttribute) {
            agent.CRUD.dropdown(linkAttribute.value, inputValue, where).then(
                ({ items, success, message }) => {
                    if (success) {
                        callback(items);
                    } else {
                        console.error(message);
                    }
                }
            );
        } else {
            console.error("Link is not supplied to ajax dropdown.");
            callback([]);
        }
    }

    public render() {
        const { value, onChange, classes,label } = this.props;

        if (!classes) {
            return null;
        }

        const selectStyles = {
            input: (base: React.CSSProperties) => ({
                ...base,
                color: "#000",
                "& input": {
                    font: "inherit"
                }
            })
        };

        return (
            <AsyncSelect
                components={components}
                styles={selectStyles}
                classes={classes}
                value={value}
                onChange={onChange}
                loadOptions={this.loadOptions}
                defaultOptions={true}
                placeholder={label}
                isClearable={true}
            />
        );
    }
}

export default styler(AjaxDropdown);
