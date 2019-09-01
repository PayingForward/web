import * as React from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/styles/withStyles";

import { ResultObject } from "../../../store/mainTypes";
import Input from "../../CPanel/CRUDPage/Input";

const styler = withStyles(theme => ({
    grow: { 
        flexGrow: 1 
    },
    inactive:{
        opacity:0.4,
        pointerEvents:'none'
    },
    progress:{
        marginRight:theme.spacing(4)
    }
}));

export interface Values {
    town?: ResultObject;
    country?: ResultObject&{code:string};
    school?: ResultObject&{logo:string};
    class?: ResultObject;
    occupation?: ResultObject;
    interestCountry?: ResultObject&{code:string};
    contactEmail?: string;
}

interface Props {
    loading: boolean;
    classes: {
        grow: string;
        progress: string;
        inactive:string;
    };
    values: Values;
    userType: string;
    onChange:(values:Values)=>void
}

class ProfileInfoForm extends React.Component<Props,Values> {

    constructor(props:Props){
        super(props);

        this.state = props.values;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const {onChange} = this.props;

        onChange(this.state);
    }

    handleChange(name:string) {
        return (value?:ResultObject|string)=>{
            this.setState({[name]:value})
        }
    }

    public renderInputs() {
        const { userType } = this.props;
        const inputTypes = {
            country: {
                link: "country",
                type: "ajax_dropdown",
                label: "Country"
            },
            town: {
                link: "town",
                type: "ajax_dropdown",
                label: "Town"
            },
            school: {
                link: "school",
                type: "ajax_dropdown",
                userType: "orphan",
                label: "School"
            },
            class: {
                link: "schoolClass",
                type: "ajax_dropdown",
                userType: "orphan",
                label: "Class That You Studieng"
            },
            occupation: {
                link: "occupation",
                type: "ajax_dropdown",
                userType: "donor",
                label: "Occupation"
            },
            interestCountry: {
                link: "country",
                type: "ajax_dropdown",
                userType: "donor",
                label: "Country that you interested about."
            },
            contactEmail: {
                type: "text",
                userType: "donor",
                label: "Contact Email"
            }
        };

        return Object.keys(inputTypes).map((inputName, key) => {
            const inputDetails = inputTypes[inputName];

            let inputUserType = inputDetails.userType;

            if (
                inputUserType &&
                inputUserType.toLowerCase() != userType.toLocaleLowerCase()
            ) {
                return null;
            }

            return (
                <Input
                    key={key}
                    type={inputDetails.type as string}
                    validation="required"
                    label={inputDetails.label as string}
                    link={inputDetails.link}
                    name={inputName}
                    onChange={this.handleChange(inputName)}
                    attributes={inputDetails.link ? [
                        {
                            value:inputDetails.link,
                            name:'link'
                        }
                    ] : []}
                    searchable={false}
                    value={this.state[inputName]}
                />
            );
        });
    }

    public render() {
        const { classes, loading } = this.props;

        return (
            <form onSubmit={this.handleSubmit}  className={loading?classes.inactive:undefined} key={1}>
                <Typography align="center" variant="h6" color="textSecondary">
                    Complete Your Profile
                </Typography>
                <Divider />
                {this.renderInputs()}

                <Toolbar variant="dense">
                    <div className={classes.grow} />
                    {loading ? (
                        <CircularProgress
                            size={32}
                            className={classes.progress}
                        />
                    ) : null}
                    <Button variant="contained" color="primary" type="submit">
                        Continue
                    </Button>
                </Toolbar>
            </form>
        );
    }
}

export default styler(ProfileInfoForm);
