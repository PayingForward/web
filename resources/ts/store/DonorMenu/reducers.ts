import { DonorMenuState, DonorMenuActions, DONOR_MENU_LOAD_INFO, DONOR_MENU_SELECT_CHILD, DONOR_MENU_CHANGE_VALUE, DONOR_MENU_SELECT_METHOD } from "./types";

const initialState:DonorMenuState  = {
    childs: [],
    schools: [],
    paymentMethods:[],
    value:''
}

export default (state=initialState,action:DonorMenuActions):DonorMenuState=>{
    switch (action.type) {
        case DONOR_MENU_LOAD_INFO:
            return {
                ...state,
                childs:action.childs,
                schools: action.schools,
                paymentMethods: action.paymentMethods
            };
        case DONOR_MENU_SELECT_CHILD:
            return {
                ...state,
                selectedChild: action.child
            };
        case DONOR_MENU_CHANGE_VALUE:
            return {
                ...state,
                value: action.value
            };
        case DONOR_MENU_SELECT_METHOD:
            return {
                ...state,
                selectedMethod: action.method
            };
        default:
            return state;
    }
}