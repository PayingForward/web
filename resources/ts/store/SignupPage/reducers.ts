import { SignupPageState, SignupPageActions, SIGNUP_PAGE_CHANGE_EMAIL, SIGNUP_PAGE_CHANGE_PASSWORD, SIGNUP_PAGE_CHANGE_STATUS, SIGNUP_PAGE_ERROR_EMAIL, SIGNUP_PAGE_ERROR_PASSWORD, SIGNUP_PAGE_CHANGE_NAME, SIGNUP_PAGE_ERROR_NAME } from "./types";

const initialState:SignupPageState = {
    email:"",
    password:"",
    name:""
}

export default (state=initialState,action:SignupPageActions):SignupPageState=>{
    switch (action.type) {
        case SIGNUP_PAGE_CHANGE_EMAIL:
            return {
                ...state,
                email:action.email
            };
        case SIGNUP_PAGE_CHANGE_PASSWORD:
            return {
                ...state,
                password: action.password,
            };
        case SIGNUP_PAGE_CHANGE_NAME:
            return {
                ...state,
                name: action.name,
            };
        case SIGNUP_PAGE_CHANGE_STATUS:
            return {
                ...state,
                status:action.status,
            }
        case SIGNUP_PAGE_ERROR_EMAIL:
            return {
                ...state,
                emailError: action.error
            };
        case SIGNUP_PAGE_ERROR_PASSWORD:
            return {
                ...state,
                passwordError: action.error
            };
        case SIGNUP_PAGE_ERROR_NAME:
            return {
                ...state,
                nameError: action.error,
            }
        default:
            return state;
    }
}