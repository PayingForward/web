import {
    CompleteChildInformations,
    CompleteDonorInformations,
    CompleteUserInformations
} from "../mainTypes";

export const PROFILE_LOAD_INFO = "PROFILE_LOAD_INFO";
export const PROFILE_EDIT_INFO = "PROFILE_EDIT_INFO";
export const PROFILE_CHANGE_USER = "PROFILE_CHANGE_USER";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_CHANGE_UPDATE_MODE = "PROFILE_CHANGE_UPDATE_MODE";

export type ProfileInformation =
    ( CompleteChildInformations
    | CompleteDonorInformations
    | CompleteUserInformations)
    & {has?:boolean};

export interface ProfilePageState {
    userId?: number;
    profileValues?: ProfileInformation;
    loading: boolean;
    changed: boolean;
    errors: {
        [x: string]: string;
    };
    updateMode: number;
}

export interface ChangeProfile {
    type: typeof PROFILE_EDIT_INFO;
    profileValues: ProfileInformation;
}

export interface ChangeUpdateMode {
    type: typeof PROFILE_CHANGE_UPDATE_MODE;
    mode: number
}

export interface LoadedProfile {
    type: typeof PROFILE_LOAD_INFO;
    profile?: ProfileInformation;
}

export interface ChangeUser {
    type: typeof PROFILE_CHANGE_USER;
    userId?: number;
}

export interface LoadingProfile {
    type: typeof PROFILE_LOADING;
    status: boolean;
}

export type ProfileActions =
    | ChangeProfile
    | LoadedProfile
    | ChangeUser
    | LoadingProfile
    | ChangeUpdateMode;
