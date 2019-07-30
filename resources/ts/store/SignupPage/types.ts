export const SIGNUP_PAGE_CHANGE_EMAIL = "SIGNUP_PAGE_CHANGE_EMAIL";
export const SIGNUP_PAGE_CHANGE_PASSWORD = "SIGNUP_PAGE_CHANGE_PASSWORD";
export const SIGNUP_PAGE_CHANGE_NAME = "SIGNUP_PAGE_CHANGE_NAME";
export const SIGNUP_PAGE_ERROR_EMAIL = "SIGNUP_PAGE_ERROR_EMAIL";
export const SIGNUP_PAGE_ERROR_PASSWORD = "SIGNUP_PAGE_ERROR_PASSWORD";
export const SIGNUP_PAGE_ERROR_NAME = "SIGNUP_PAGE_ERROR_NAME";
export const SIGNUP_PAGE_CHANGE_STATUS = "SIGNUP_PAGE_CHANGE_STATUS";

export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_LOADING = "SIGNUP_LOADING";

export type SignupPageStatus =
    | typeof SIGNUP_ERROR
    | typeof SIGNUP_SUCCESS
    | typeof SIGNUP_LOADING;

export interface SignupPageState {
    status?: SignupPageStatus;
    emailError?: string;
    passwordError?: string;
    email: string;
    password: string;
    name:string;
    nameError?:string
}

export interface ChangeEmail {
    type: typeof SIGNUP_PAGE_CHANGE_EMAIL;
    email: string;
}

export interface ChangePassword {
    type: typeof SIGNUP_PAGE_CHANGE_PASSWORD;
    password: string;
}

export interface ChangeStatus {
    type: typeof SIGNUP_PAGE_CHANGE_STATUS;
    status?: SignupPageStatus;
}

export interface ErrorEmail {
    type: typeof SIGNUP_PAGE_ERROR_EMAIL;
    error?: string;
}

export interface ErrorPassword {
    type: typeof SIGNUP_PAGE_ERROR_PASSWORD;
    error?: string;
}

export interface ChangeName {
    type: typeof SIGNUP_PAGE_CHANGE_NAME,
    name:string
}

export interface ErrorName {
    type: typeof SIGNUP_PAGE_ERROR_NAME,
    error:string
}

export type SignupPageActions =
    | ChangeEmail
    | ChangePassword
    | ChangeStatus
    | ErrorEmail
    | ErrorPassword
    | ChangeName
    | ErrorName;
