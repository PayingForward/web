import { UserInformations } from "../AuthController/types";

export const HOMEPAGE_LOAD_CHILDS = "HOMEPAGE_LOAD_CHILDS";
export const HOMEPAGE_SELECT_CHILD = "HOMEPAGE_SELECT_CHILD";
export const HOMEPAGE_CHANGE_VALUE = "HOMEPAGE_CHANGE_VALUE";

export interface HomePageStates {
    sliderChilds: UserInformations[];
    selectedChild?: UserInformations;
    value?: number | string;
}

export interface ChangeValue {
    type: typeof HOMEPAGE_CHANGE_VALUE;
    value?: string|number;
}

export interface SelectChild {
    type: typeof HOMEPAGE_SELECT_CHILD;
    child: UserInformations;
}

export interface LoadChilds {
    type: typeof HOMEPAGE_LOAD_CHILDS;
    childs: UserInformations[];
}

export type HomePageActions = ChangeValue | SelectChild | LoadChilds;
