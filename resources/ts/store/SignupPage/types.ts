export const SIGNUP_PAGE_NAME_CHANGE = 'SIGNUP_PAGE_NAME_CHANGE';
export const SIGNUP_PAGE_EMAIL_CHANGE = 'SIGNUP_PAGE_EMAIL_CHANGE';
export const SIGNUP_PAGE_PASSWORD_CHANGE = 'SIGNUP_PAGE_PASSWORD_CHANGE';

export const SIGNUP_PAGE_NAME_ERROR = 'SIGNUP_PAGE_NAME_ERROR';
export const SIGNUP_PAGE_EMAIL_ERROR = 'SIGNUP_PAGE_EMAIL_ERROR';
export const SIGNUP_PAGE_PASSWORD_ERROR = 'SIGNUP_PAGE_PASSWORD_ERROR';

export interface SignupPageState {
    name:string,
    email:string,
    password:string,

    nameError?:string,
    emailError?:string,
    passwordError?:string
}

export interface ChangeName {
    type: typeof SIGNUP_PAGE_NAME_CHANGE,
    name:string
}

export interface ChangeEmail {
    type: typeof SIGNUP_PAGE_EMAIL_CHANGE,
    email:string
}

export interface ChangePassword {
    type: typeof SIGNUP_PAGE_PASSWORD_CHANGE;
    password: string
}

export interface ErrorName {
    type: typeof SIGNUP_PAGE_NAME_ERROR,
    error?:string
}

export interface ErrorEmail {
    type: typeof SIGNUP_PAGE_EMAIL_ERROR,
    error?:string
}

export interface ErrorPassword {
    type: typeof SIGNUP_PAGE_PASSWORD_ERROR;
    error?: string
}

export type SignupPageActions = 
| ChangeName
| ChangeEmail
| ChangePassword
| ErrorName
| ErrorEmail
| ErrorPassword