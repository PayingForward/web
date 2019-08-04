export const LOGGED_USER_LOADED = "LOGGED_USER_LOADED";
export const CLEAR_LOGGED_USER = "CLEAR_LOGGED_USER";

export interface UserInformations {
    name: string;
    type?: string;
    id: number;
    avatar:string;
}

export interface LoggedUserLoaded {
    type: typeof LOGGED_USER_LOADED;
    user?: UserInformations;
}

export interface LoggedUserClear {
    type: typeof CLEAR_LOGGED_USER;
}

export interface AuthControllerState {
    loading: boolean;
    user?: UserInformations;
}

export type AuthControllerActionTypes = LoggedUserLoaded | LoggedUserClear;
