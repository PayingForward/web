import {
    ChangeEmail,
    LOGIN_FORM_CHANGE_EMAIL,
    ChangePassword,
    LOGIN_FORM_CHANGE_PASSWORD,
    ClearInputs,
    LOGIN_FORM_CLEAR_INPUTS
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import agent from "../../agent";
import { errorSnack, successSnack } from "../SnackController/actions";
import { USER_TOKEN_KEY, APP_URL } from "../../constants/config";

export const changeEmail = (email: string): ChangeEmail => ({
    type: LOGIN_FORM_CHANGE_EMAIL,
    email
});

export const changePassword = (password: string): ChangePassword => ({
    type: LOGIN_FORM_CHANGE_PASSWORD,
    password
});

export const clearInputs = (): ClearInputs => ({
    type: LOGIN_FORM_CLEAR_INPUTS
});

export const submitLogin = (
    email: string,
    password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());

    agent.Auth.login(email, password).then(({ success, message, token,type }) => {
        dispatch(hideLoading());

        if (success) {
            if(message){
                dispatch(successSnack(message));
            }
            dispatch(clearInputs());
            localStorage.setItem(USER_TOKEN_KEY, token);
            window.location.href=APP_URL?APP_URL:"/";
        } else {
            if(message){
                dispatch(errorSnack(message));
            }
        }
    });
};
