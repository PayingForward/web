export const LOGIN_FORM_CHANGE_EMAIL = "LOGIN_FORM_CHANGE_EMAIL";
export const LOGIN_FORM_CHANGE_PASSWORD = "LOGIN_FORM_CHANGE_PASSWORD";
export const LOGIN_FORM_CLEAR_INPUTS = "LOGIN_FORM_CLEAR_INPUTS";

export interface LoginFormState {
    email: string;
    password: string;
}

export interface ChangeEmail {
    type: typeof LOGIN_FORM_CHANGE_EMAIL;
    email: string;
}

export interface ChangePassword {
    type: typeof LOGIN_FORM_CHANGE_PASSWORD;
    password: string;
}

export interface ClearInputs {
    type: typeof LOGIN_FORM_CLEAR_INPUTS;
}

export type LoginFormActions = ChangeEmail | ChangePassword | ClearInputs;
