import {
    ChangeEmail,
    ChangeName,
    SIGNUP_PAGE_NAME_CHANGE,
    SIGNUP_PAGE_EMAIL_CHANGE,
    ChangePassword,
    SIGNUP_PAGE_PASSWORD_CHANGE,
    ErrorName,
    SIGNUP_PAGE_NAME_ERROR,
    ErrorEmail,
    SIGNUP_PAGE_EMAIL_ERROR,
    ErrorPassword,
    SIGNUP_PAGE_PASSWORD_ERROR
} from "./types";

import { AnyAction } from "redux";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { showLoading } from "react-redux-loading-bar";

import agent from "../../agent";
import { successSnack, errorSnack } from "../SnackController/actions";
import { APP_URL } from "../../constants/config";

export const changeName = (name: string): ChangeName => ({
    type: SIGNUP_PAGE_NAME_CHANGE,
    name
});

export const changeEmail = (email: string): ChangeEmail => ({
    type: SIGNUP_PAGE_EMAIL_CHANGE,
    email
});

export const changePassword = (password: string): ChangePassword => ({
    type: SIGNUP_PAGE_PASSWORD_CHANGE,
    password
});

export const errorName = (error?: string): ErrorName => ({
    type: SIGNUP_PAGE_NAME_ERROR,
    error
});

export const errorEmail = (error?: string): ErrorEmail => ({
    type: SIGNUP_PAGE_EMAIL_ERROR,
    error
});

export const errorPassword = (error?: string): ErrorPassword => ({
    type: SIGNUP_PAGE_PASSWORD_ERROR,
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

export const submit = (
    name: string,
    email: string,
    password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());

    agent.Auth.signup(name, email, password, password).then(
        ({ success, message }) => {
            if (message) {
                if (success) {
                    dispatch(successSnack(message));
                    window.setTimeout(() => {
                        if (APP_URL) window.location.href = APP_URL;
                        else window.location.reload();
                    }, 1000);
                } else {
                    dispatch(errorSnack(message));
                }
            }
        }
    );
};
