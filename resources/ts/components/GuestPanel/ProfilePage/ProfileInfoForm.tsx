import * as React from "react";

import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/styles/withStyles";

import {ResultObject} from "../../../store/mainTypes";
import Input from "../../CPanel/CRUDPage/Input";

const styler = withStyles((theme)=>({

}))

interface Props {
    loading: boolean;
    classes: {
        grow : string;
        progress : string;
    };
    values:{
        town?: ResultObject;
        country?: ResultObject;
        school?:ResultObject;
        class?:ResultObject;
        occupation?:ResultObject;
        interestCountry?:ResultObject;
        contactEmail?:string;
    }
}

class ProfileInfoForm extends React.Component<Props> {
    handleSubmit() {}

    public renderInputs(){
        const {values} = this.props;

        const inputTypes = {
            town: {
                link: 'town',
                type: 'ajax_dropdown'
            },
            country:{
                link: 'country',
                type: 'ajax_dropdown'
            },
            school: {
                link: 'school',
                type: 'ajax_dropdown',
            },
            class: {
                link: 'schoolClass',
                type: 'ajax_dropdown'
            },
            occupation: {
                link: 'occupation',
                type: 'ajax_dropdown'
            },
            interestCountry: {
                link: 'country',
                type: 'ajax_dropdown'
            },
            contactEmail :{
                type: 'text'
            }
        }

        return null;

        // return Object.keys(inputTypes).map((inputName)=>{
        //     const inputDetails = inputTypes[inputName];

        //     return (
        //         <Input
        //     )
        // })

    }

    public render() {

        const {classes,loading,values} = this.props;


        return (
            <form onSubmit={this.handleSubmit}>
                <Typography align="center" variant="h6" color="textSecondary">
                    Complete Your Profile
                </Typography>
                <Divider />

                <Toolbar variant="dense">
                    <div className={classes.grow} />
                    {loading ? (
                        <CircularProgress
                            size={32}
                            className={classes.progress}
                        />
                    ) : null}
                    {this.renderInputs()}
                    <Button variant="contained" color="primary" type="submit">
                        Continue
                    </Button>
                </Toolbar>
            </form>
        );
    }
}

export default styler (ProfileInfoForm);
