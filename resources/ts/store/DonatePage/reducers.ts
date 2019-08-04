import { DonationPageState, DonatePageActions, DONATE_PAGE_CHANGE_AMOUNT, DONATE_PAGE_CHANGE_CHILD, DONATE_PAGE_LOADED_INFO, DONATE_PAGE_SUCCESS, DONATE_PAGE_CLEAR_CHILD, DONATE_PAGE_CHANGE_MODE, DONATE_PAGE_CHANGE_PRIVACY } from "./types";

const initialState:DonationPageState = {
    loading:true,
    mode:0,
    anonymous:false
};

export default (state=initialState,action:DonatePageActions):DonationPageState=>{
    switch (action.type) {
        case DONATE_PAGE_CHANGE_AMOUNT:
            return {
                ...state,
                amount:action.amount
            };
        case DONATE_PAGE_CHANGE_CHILD:
            return {
                ...state,
                child:action.child,
                mode:0,
                anonymous:false
            };
        case DONATE_PAGE_LOADED_INFO:
            return {
                ...state,
                loading:false,
                child:action.child,
                mode:0,
                anonymous:false
            };
        case DONATE_PAGE_SUCCESS:
            return {
                ...state,
                success:true,
            }
        case DONATE_PAGE_CLEAR_CHILD:
            return {
                ...state,
                child:undefined,
                mode:0,
                anonymous:false
            }
        case DONATE_PAGE_CHANGE_MODE:
            return {
                ...state,
                mode: action.mode
            };
        case DONATE_PAGE_CHANGE_PRIVACY:
            return {
                ...state,
                anonymous:action.anonymous
            }
        default:
            return state;
    }
}