import * as React from "react";
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField"; 
import withStyles from "@material-ui/core/styles/withStyles"; 
import Button from "@material-ui/core/Button";
import { AppState } from 'resources/ts/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { changeEmail, changePassword, submitLogin } from '../../../../store/LoginForm/actions';

const styler = withStyles((theme) => ({
    textField: {
        width: 200
    },
    margin:{
        margin:theme.spacing(1)
    },
    form:{
        display:'inline-flex'
    }
}));

interface Props {
    classes: {
        textField: string,
        margin: string,
        form: string,
    },
    email:string,
    onChangeEmail:(email:string)=>void,
    password:string,
    onChangePassword:(password:string)=>void,
    onSubmit:(email:string,password:string)=>void
}

const mapStateToProps = (state:AppState)=>({
    ...state.loginForm
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>)=>({
    onChangeEmail:(email:string)=>dispatch(changeEmail(email)),
    onChangePassword:(password:string)=>dispatch(changePassword(password)),
    onSubmit:(email:string,password:string)=>dispatch(submitLogin(email,password))
});

class LoginForm extends React.Component<Props> {

    constructor(props:Props){
        super(props);

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(e:React.ChangeEvent<HTMLInputElement>){
        const {onChangeEmail}= this.props;

        onChangeEmail(e.target.value);
    }

    handlePasswordChange(e:React.ChangeEvent<HTMLInputElement>){
        const {onChangePassword} = this.props;

        onChangePassword(e.target.value);
    }

    handleSubmit(e:React.FormEvent){
        e.preventDefault();
        const {onSubmit,email,password} = this.props;

        onSubmit(email,password);
    }

    public render() {
        const { classes ,email,password} = this.props;

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className={classes.form} >
                    <div className={classes.margin}>
                        <TextField
                            className={classes.textField}
                            margin="dense"
                            variant="outlined"
                            label="Email"
                            onChange={this.handleEmailChange}
                            value={email}
                        />
                    </div>
                    <div className={classes.margin}>
                        <TextField
                            className={classes.textField}
                            margin="dense"
                            type="password"
                            variant="outlined"
                            label="Password"
                            value={password}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <Button type="submit" className={classes.margin} variant="contained" color="secondary" >
                        Login
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (styler(LoginForm));
