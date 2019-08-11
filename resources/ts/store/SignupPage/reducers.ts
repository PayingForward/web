import { SignupPageState, SignupPageActions, SIGNUP_PAGE_EMAIL_CHANGE, SIGNUP_PAGE_NAME_CHANGE, SIGNUP_PAGE_PASSWORD_CHANGE, SIGNUP_PAGE_NAME_ERROR, SIGNUP_PAGE_EMAIL_ERROR, SIGNUP_PAGE_PASSWORD_ERROR } from "./types";

const initialState:SignupPageState = {
    name:'',
    email:'',
    password:''
}

export default (state=initialState,action:SignupPageActions):SignupPageState=>{
    switch (action.type) {
        case SIGNUP_PAGE_EMAIL_CHANGE:
            return {
                ...state,
                email:action.email
            };
        case SIGNUP_PAGE_NAME_CHANGE:
            return {
                ...state,
                name:action.name
            };
        case SIGNUP_PAGE_PASSWORD_CHANGE:
            return {
                ...state,
                password: action.password
            };
        case SIGNUP_PAGE_NAME_ERROR:
            return {
                ...state,
                nameError: action.error
            };
        case SIGNUP_PAGE_EMAIL_ERROR:
            return {
                ...state,
                emailError: action.error
            };
        case SIGNUP_PAGE_PASSWORD_ERROR:
            return {
                ...state,
                passwordError: action.error
            }
        default:
            return state;
    }
}