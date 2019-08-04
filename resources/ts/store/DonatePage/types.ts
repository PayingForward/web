import { UserCompleteInfo } from '../SearchPage/types';

export const DONATE_PAGE_LOADED_INFO = "DONATE_PAGE_LOADED_INFO";
export const DONATE_PAGE_CHANGE_AMOUNT = "DONATE_PAGE_CHANGE_AMOUNT";
export const DONATE_PAGE_CHANGE_CHILD = "DONATE_PAGE_CHANGE_CHILD";
export const DONATE_PAGE_SUCCESS = "DONATE_SUCCESS";
export const DONATE_PAGE_CLEAR_CHILD = 'DONATE_PAGE_CLEAR_CHILD';
export const DONATE_PAGE_CHANGE_MODE = 'DONATE_PAGE_CHANGE_MODE';
export const DONATE_PAGE_CHANGE_PRIVACY = 'DONATE_PAGE_CHANGE_PRIVACY';

export interface DonationPageState {
    child?: UserCompleteInfo;
    amount?: number | string;
    loading: boolean;
    success?: boolean;
    mode:number;
    anonymous:boolean
}

export interface LoadedInfo {
    type: typeof DONATE_PAGE_LOADED_INFO;
    child?: UserCompleteInfo;
}

export interface ChangeAmount {
    type: typeof DONATE_PAGE_CHANGE_AMOUNT;
    amount?: number|string;
}

export interface ChangeChild {
    type: typeof DONATE_PAGE_CHANGE_CHILD;
    child: UserCompleteInfo;
}

export interface Success {
    type: typeof DONATE_PAGE_SUCCESS;
}

export interface ClearChild {
    type: typeof DONATE_PAGE_CLEAR_CHILD
}

export interface ChangeMode {
    type: typeof DONATE_PAGE_CHANGE_MODE,
    mode:number
}

export interface ChangePrivacy {
    type: typeof DONATE_PAGE_CHANGE_PRIVACY,
    anonymous:boolean
}

export type DonatePageActions =
    | LoadedInfo
    | ChangeAmount
    | ChangeChild
    | Success
    | ClearChild
    | ChangeMode
    | ChangePrivacy
;
