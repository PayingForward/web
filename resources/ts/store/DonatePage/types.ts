import {
    PaymentMethod,
    UserInformations,
    School
} from "../mainTypes";

export const DONATE_PAGE_CHANGE_MODE = "DONATE_PAGE_CHANGE_MODE";
export const DONATE_PAGE_CHANGE_AMOUNT = "DONATE_PAGE_CHANGE_AMOUNT";
export const DONATE_PAGE_CHANGE_METHOD = "DONATE_PAGE_CHANGE_METHOD";
export const DONATE_PAGE_CHANGE_PRIVACY = "DONATE_PAGE_CHANGE_PRIVACY";
export const DONATE_PAGE_LOAD_INFORMATIONS = "DONATE_PAGE_LOAD_INFORMATIONS";
export const DONATE_PAGE_LOAD_PRICES = 'DONATE_PAGE_LOAD_PRICES';

export interface DonatePageInformations {
    school: School;
    teacher: UserInformations;
    childrens: UserInformations[];
    child: UserInformations;
}

export type DonatePageModes = "school" | "child";

export type DonatePagePrices = {[x:string]:number};

export interface DonatePageState {
    mode: DonatePageModes;
    modeId: number;
    amount: number;
    method: PaymentMethod;
    hideMe: boolean;
    informations?: DonatePageInformations;
    loading:boolean;
    prices: DonatePagePrices
}

export interface ChangeMode {
    type: typeof DONATE_PAGE_CHANGE_MODE;
    mode: DonatePageModes;
    modeId: number;
}

export interface ChangeAmount {
    type: typeof DONATE_PAGE_CHANGE_AMOUNT;
    amount: number;
}

export interface ChangeMethod {
    type: typeof DONATE_PAGE_CHANGE_METHOD;
    method: PaymentMethod;
}

export interface ChangePrivacy {
    type: typeof DONATE_PAGE_CHANGE_PRIVACY;
    hideMe: boolean;
}

export interface LoadedInformations {
    type: typeof DONATE_PAGE_LOAD_INFORMATIONS;
    informations: DonatePageInformations;
}

export interface LoadedPrices {
    type: typeof DONATE_PAGE_LOAD_PRICES,
    prices: DonatePagePrices
}

export type DonatePageActions =
    | ChangeMode
    | ChangeAmount
    | ChangeMethod
    | ChangePrivacy
    | LoadedInformations
    | LoadedPrices;