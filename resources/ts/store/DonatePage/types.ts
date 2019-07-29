import { UserInformations } from "../AuthController/types";

export const DONATE_PAGE_LOADED_INFO = "DONATE_PAGE_LOADED_INFO";
export const DONATE_PAGE_CHANGE_AMOUNT = "DONATE_PAGE_CHANGE_AMOUNT";
export const DONATE_PAGE_CHANGE_CHILD = "DONATE_PAGE_CHANGE_CHILD";
export const DONATE_PAGE_SUCCESS = "DONATE_SUCCESS";

export interface DonationPageState {
    child?: UserInformations;
    amount?: number | string;
    loading: boolean;
    success?: boolean;
}

export interface LoadedInfo {
    type: typeof DONATE_PAGE_LOADED_INFO;
    child?: UserInformations;
}

export interface ChangeAmount {
    type: typeof DONATE_PAGE_CHANGE_AMOUNT;
    amount: number;
}

export interface ChangeChild {
    type: typeof DONATE_PAGE_CHANGE_CHILD;
    child: UserInformations;
}

export interface Success {
    type: typeof DONATE_PAGE_SUCCESS;
}

export type DonatePageActions =
    | LoadedInfo
    | ChangeAmount
    | ChangeChild
    | Success;
