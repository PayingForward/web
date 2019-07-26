import * as React from "react";
import classNames from "classnames";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/styles/withStyles";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";

const styler = withStyles(theme => ({
    textInput: {
        color: theme.palette.text.primary
    },
    margin: {
        margin: theme.spacing(4)
    }
}));

interface Option {
    label: string;
    id: string | number;
}

interface Props {
    title: string;
    options: Option[];
    classes: {
        textInput: string;
        margin: string;
    };
    onSearch?: (keyword: string) => void;
    selected?:(string | number)[];
    onChange?:(id:string|number)=>void
}

interface States {
    keyword:string
}

class SidebarSection extends React.Component<Props,States> {
    constructor(props:Props){
        super(props);

        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.state={
            keyword:""
        };
    }

    handleChangeKeyword(e:React.ChangeEvent<HTMLInputElement>){
        const {onSearch} = this.props;
        
        this.setState({keyword:e.target.value})

        if(typeof onSearch !== 'undefined'){
            onSearch(e.target.value);
        }
    }

    handleCheckOption(opt:Option){
        const {onChange} = this.props;

        if(onChange){
            return (e:React.ChangeEvent<HTMLElement>)=>{
                
                onChange(opt.id);
            }
        }

        return undefined;
    }

    renderOptions() {
        const { options,selected } = this.props;

        if (!options.length) {
            return (
                <ListItem dense divider>
                    <ListItemText secondary="No results found.." />
                </ListItem>
            );
        }

        return options.map((option: Option,key:number) => (
            <ListItem key={key} dense divider>
                <ListItemText
                    primary={option.label}
                    primaryTypographyProps={{ color: "textPrimary" }}
                />
                <ListItemSecondaryAction>
                    <Checkbox checked={selected?selected.includes(option.id):undefined} onChange={this.handleCheckOption(option)} />
                </ListItemSecondaryAction>
            </ListItem>
        ));
    }

    public render() {
        const { title, classes } = this.props;
        const {keyword} = this.state;

        return (
            <React.Fragment>
                <FormControl
                    className={classNames(classes.margin, classes.textInput)}
                >
                    <InputLabel className={classes.textInput}>
                        {title}
                    </InputLabel>
                    <Input
                        onChange={this.handleChangeKeyword}
                        className={classes.textInput}
                        inputProps={{className:classes.textInput}}
                        value={keyword}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label={"Search by " + title}>
                                    <SearchIcon className={classes.textInput} />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <List dense>{this.renderOptions()}</List>
                <Divider />
            </React.Fragment>
        );
    }
}

export default styler(SidebarSection);
