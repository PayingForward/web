import { DonationPageState, DonatePageActions, DONATE_PAGE_CHANGE_AMOUNT, DONATE_PAGE_CHANGE_CHILD, DONATE_PAGE_LOADED_INFO, DONATE_PAGE_SUCCESS } from "./types";

const initialState:DonationPageState = {
    loading:true
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
                child:action.child
            };
        case DONATE_PAGE_LOADED_INFO:
            return {
                ...state,
                loading:false,
                child:action.child
            };
        case DONATE_PAGE_SUCCESS:
            return {
                ...state,
                success:true,
            }
        default:
            return state;
    }
}