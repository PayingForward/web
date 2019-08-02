import {
    ChangePassword,
    SIGNUP_PAGE_CHANGE_PASSWORD,
    ChangeEmail,
    SIGNUP_PAGE_CHANGE_EMAIL,
    SignupPageStatus,
    ChangeStatus,
    SIGNUP_PAGE_CHANGE_STATUS,
    ErrorEmail,
    SIGNUP_PAGE_ERROR_EMAIL,
    ErrorPassword,
    SIGNUP_PAGE_ERROR_PASSWORD,
    ChangeName,
    SIGNUP_PAGE_CHANGE_NAME,
    ErrorName,
    SIGNUP_PAGE_ERROR_NAME,
    ChangePasswordConfirmation,
    SIGNUP_PAGE_CHANGE_PASSWORD_CONFIRMATION,
    ErrorPasswordConfirmation,
    SIGNUP_PAGE_ERROR_PASSWORD_CONFIRMATION
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import agent from '../../agent';
import { showLoading } from 'react-redux-loading-bar';
import { successSnack, errorSnack } from '../SnackController/actions';
import { APP_URL } from '../../constants/config';

export const changePassword = (password: string): ChangePassword => ({
    type: SIGNUP_PAGE_CHANGE_PASSWORD,
    password
});

export const changePasswordConfirmation = (
    password: string
): ChangePasswordConfirmation => ({
    type: SIGNUP_PAGE_CHANGE_PASSWORD_CONFIRMATION,
    password
});

export const changeEmail = (email: string): ChangeEmail => ({
    type: SIGNUP_PAGE_CHANGE_EMAIL,
    email
});

export const changeName = (name: string): ChangeName => ({
    type: SIGNUP_PAGE_CHANGE_NAME,
    name
});

export const changeStatus = (status: SignupPageStatus): ChangeStatus => ({
    type: SIGNUP_PAGE_CHANGE_STATUS,
    status
});

export const errorEmail = (error?: string): ErrorEmail => ({
    type: SIGNUP_PAGE_ERROR_EMAIL,
    error
});

export const errorPassword = (error?: string): ErrorPassword => ({
    type: SIGNUP_PAGE_ERROR_PASSWORD,
    error
});

export const errorName = (error?: string): ErrorName => ({
    type: SIGNUP_PAGE_ERROR_NAME,
    error
});

export const errorPasswordConfirmation = (
    error?: string
): ErrorPasswordConfirmation => ({
    type: SIGNUP_PAGE_ERROR_PASSWORD_CONFIRMATION,
    error
});

export const validateEmail = (
    email: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(changeEmail(email));

    if (/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
        dispatch(errorEmail());
    } else {
        dispatch(errorEmail("Invalid email address supplied!"));
    }
};

export const validateName = (
    name: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(changeName(name));

    if (name.length > 4) {
        dispatch(errorName());
    } else {
        dispatch(errorName("Name should be contains 4 or more characters!"));
    }
};

export const validatePassword = (
    password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    let strength: number = 0;

    if (password.length === 0) {
        strength = 0;
    }

    var prog = [/[$@$!%*#?&]/, /[A-Z]/, /[0-9]/, /[a-z]/].reduce(
        (memo, test) => memo + (test.test(password) ? 1 : 0),
        0
    );

    if (prog > 2 && password.length > 7) {
        prog++;
    }

    switch (prog) {
        case 0:
        case 1:
        case 2:
            strength = 25;
            break;
        case 3:
            strength = 50;
            break;
        case 4:
            strength = 75;
            break;
        case 5:
            strength = 100;
            break;
    }

    dispatch(changePassword(password));

    if (strength >= 75) {
        dispatch(errorPassword());
    } else {
        dispatch(
            errorPassword(
                "Your password strength is " +
                    strength +
                    "%. Please enter more secure password."
            )
        );
    }
};

export const validatePasswordConfirmation = (
    passwordConfirmation: string,
    password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(changePasswordConfirmation(passwordConfirmation));

    if (password == passwordConfirmation) {
        dispatch(errorPasswordConfirmation());
    } else {
        dispatch(
            errorPasswordConfirmation(
                "Entered password doesn't match with above password!"
            )
        );
    }
};

export const submit = (
    name:string,
    email:string,
    password:string,
    passwordConfirmation:string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {

    dispatch(showLoading());

    agent.Auth.signup(name,email,password,passwordConfirmation).then(({success,message})=>{
        if(message){
            if(success){
                dispatch(successSnack(message));
                window.setTimeout(()=>{
                    if(APP_URL)
                        window.location.href = APP_URL;
                    else
                        window.location.reload();
                },1000)
            } else {
                dispatch(errorSnack(message));
            }
        }
    })

 }