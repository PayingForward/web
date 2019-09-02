import {
    DonatePageState,
    DonatePageActions,
    DONATE_PAGE_CHANGE_AMOUNT,
    DONATE_PAGE_CHANGE_METHOD,
    DONATE_PAGE_CHANGE_MODE,
    DONATE_PAGE_CHANGE_PRIVACY,
    DONATE_PAGE_LOAD_INFORMATIONS,
    DONATE_PAGE_LOAD_PRICES
} from "./types";
import { PAYMENT_METHODS } from "../../constants/config";

const initialState: DonatePageState = {
    mode: "school",
    modeId: 0,
    amount: 0.0,
    method: PAYMENT_METHODS.paypal,
    hideMe: false,
    loading: true,
    prices: {}
};

export default (
    state = initialState,
    action: DonatePageActions
): DonatePageState => {
    switch (action.type) {
        case DONATE_PAGE_CHANGE_AMOUNT:
            return {
                ...state,
                amount: action.amount
            };
        case DONATE_PAGE_CHANGE_METHOD:
            return {
                ...state,
                method: action.method
            };
        case DONATE_PAGE_CHANGE_MODE:
            return {
                ...state,
                mode: action.mode,
                modeId: action.modeId,
                loading: true
            };
        case DONATE_PAGE_CHANGE_PRIVACY:
            return {
                ...state,
                hideMe: action.hideMe
            };
        case DONATE_PAGE_LOAD_INFORMATIONS:
            return {
                ...state,
                informations: action.informations,
                loading: false
            };
        case DONATE_PAGE_LOAD_PRICES:
            return {
                ...state,
                prices: action.prices
            }
        default:
            return state;
    }
};
