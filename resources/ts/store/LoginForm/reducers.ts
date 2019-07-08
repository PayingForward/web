import { LoginFormState, LoginFormActions, LOGIN_FORM_CHANGE_EMAIL, LOGIN_FORM_CHANGE_PASSWORD, LOGIN_FORM_CLEAR_INPUTS } from "./types";

const initialState:LoginFormState ={
    email:"",
    password:""
};

export default (state=initialState,action:LoginFormActions)=>{
    switch (action.type) {
        case LOGIN_FORM_CHANGE_EMAIL:
            return {
                ...state,
                email:action.email
            };
        case LOGIN_FORM_CHANGE_PASSWORD:
            return {
                ...state,
                password:action.password
            };
        case LOGIN_FORM_CLEAR_INPUTS:
            return {
                ...state,
                email:"",
                password:""
            };
        default:
            return state;
    }
}