import { CompleteUserInformations, School, PaymentMethod } from "../mainTypes";

export const DONOR_MENU_LOAD_INFO = "DONOR_MENU_LOAD_INFO";
export const DONOR_MENU_SELECT_CHILD = "DONOR_MENU_SELECT_CHILD";
export const DONOR_MENU_SELECT_METHOD = "DONOR_MENU_SELECT_METHOD";
export const DONOR_MENU_CHANGE_VALUE = "DONOR_MENU_CHANGE_VALUE";

export interface DonorMenuState {
    childs: CompleteUserInformations[];
    schools: School[];
    paymentMethods: PaymentMethod[];
    selectedChild?: CompleteUserInformations;
    value: string | number;
    selectedMethod?: PaymentMethod;
}

export interface LoadInformation {
    type: typeof DONOR_MENU_LOAD_INFO;
    schools: School[];
    childs: CompleteUserInformations[];
    paymentMethods: PaymentMethod[];
}

export interface SelectChild {
    type: typeof DONOR_MENU_SELECT_CHILD;
    child: CompleteUserInformations;
}

export interface SelectMethod {
    type: typeof DONOR_MENU_SELECT_METHOD;
    method: PaymentMethod;
}

export interface ChangeValue {
    type: typeof DONOR_MENU_CHANGE_VALUE;
    value: number|string;
}

export type DonorMenuActions =
    | LoadInformation
    | SelectChild
    | SelectMethod
    | ChangeValue;
