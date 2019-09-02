import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
    ChangeMode,
    DONATE_PAGE_CHANGE_MODE,
    DonatePageModes,
    ChangeAmount,
    DONATE_PAGE_CHANGE_AMOUNT,
    DONATE_PAGE_CHANGE_METHOD,
    ChangeMethod,
    ChangePrivacy,
    DONATE_PAGE_CHANGE_PRIVACY,
    DonatePageInformations,
    LoadedInformations,
    DONATE_PAGE_LOAD_INFORMATIONS,
    DONATE_PAGE_LOAD_PRICES,
    DonatePagePrices
} from "./types";
import { PaymentMethod } from "../mainTypes";
import agent from '../../agent';
import { errorSnack } from '../SnackController/actions';

export const changeMode = (
    mode: DonatePageModes,
    modeId: number
): ChangeMode => ({
    type: DONATE_PAGE_CHANGE_MODE,
    mode,
    modeId
});

export const changeAmount = (amount: number): ChangeAmount => ({
    type: DONATE_PAGE_CHANGE_AMOUNT,
    amount
});

export const changeMethod = (method: PaymentMethod): ChangeMethod => ({
    type: DONATE_PAGE_CHANGE_METHOD,
    method
});

export const changePrivacy = (hideMe: boolean): ChangePrivacy => ({
    type: DONATE_PAGE_CHANGE_PRIVACY,
    hideMe
});

export const loadedInformations = (
    informations: DonatePageInformations
): LoadedInformations => ({
    type: DONATE_PAGE_LOAD_INFORMATIONS,
    informations
});

export const loadedPrices = (prices: DonatePagePrices) => ({
    type: DONATE_PAGE_LOAD_PRICES,
    prices
});

export const fetchPrices = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());
    agent.DonatePage.latestPrices().then(({success,prices})=>{

        dispatch(hideLoading());

        if(success){
            let modedPrices:DonatePagePrices = {};

            for(const priceName of Object.keys(prices)){
                modedPrices[priceName] = prices[priceName].USD;
            }

            dispatch(loadedPrices(modedPrices))
        }
    })
}

export const fetchInfo = (mode:DonatePageModes,modeId:number): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());
    dispatch(changeMode(mode,modeId));

    agent.DonatePage.info(mode,modeId).then(({success,message,info})=>{
        dispatch(hideLoading());
        if(success){
            dispatch(loadedInformations(info))
        } else if(message){
            dispatch(errorSnack(message))
        }
    })
}