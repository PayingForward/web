import {
    Success,
    DONATE_PAGE_SUCCESS,
    LoadedInfo,
    DONATE_PAGE_LOADED_INFO,
    ChangeChild,
    DONATE_PAGE_CHANGE_CHILD,
    ChangeAmount,
    DONATE_PAGE_CHANGE_AMOUNT,
    ClearChild,
    DONATE_PAGE_CLEAR_CHILD,
    DONATE_PAGE_CHANGE_MODE,
    ChangeMode,
    ChangePrivacy,
    DONATE_PAGE_CHANGE_PRIVACY
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import agent from "../../agent";
import { errorSnack } from "../SnackController/actions";
import { UserCompleteInfo } from "../SearchPage/types";

export const success = (): Success => ({
    type: DONATE_PAGE_SUCCESS
});

export const loadedInfo = (donationId:string,child?: UserCompleteInfo): LoadedInfo => ({
    type: DONATE_PAGE_LOADED_INFO,
    child,
    donationId
});

export const changeChild = (child: UserCompleteInfo): ChangeChild => ({
    type: DONATE_PAGE_CHANGE_CHILD,
    child
});

export const clearChild = (): ClearChild => ({
    type: DONATE_PAGE_CLEAR_CHILD
});

export const changeAmount = (amount?: number | string): ChangeAmount => ({
    type: DONATE_PAGE_CHANGE_AMOUNT,
    amount
});

export const fetchInfo = (
    childId?: number | string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());

    agent.DonationPage.fetchInfo(childId).then(
        ({ success, message, children,donationId }) => {
            dispatch(hideLoading());

            if (success) {
                dispatch(loadedInfo(donationId,children?children:undefined));
            } else if (message) {
                dispatch(errorSnack(message));
            }
        }
    );
};

export const changeMode = (mode: number): ChangeMode => ({
    type: DONATE_PAGE_CHANGE_MODE,
    mode
});

export const changePrivacy = (anonymous: boolean): ChangePrivacy => ({
    type: DONATE_PAGE_CHANGE_PRIVACY,
    anonymous
});
