import {
    CompleteChildInformations,
    CompleteDonorInformations,
    CompleteUserInformations
} from "../mainTypes";

export const PROFILE_LOAD_INFO = "PROFILE_LOAD_INFO";
export const PROFILE_EDIT_INFO = "PROFILE_EDIT_INFO";
export const PROFILE_CHANGE_USER = "PROFILE_CHANGE_USER";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_SAVED = "PROFILE_SAVED";
export const PROFILE_ERRORS = "PROFILE_ERRORS";

export type ProfileInformation =
    | CompleteChildInformations
    | CompleteDonorInformations
    | CompleteUserInformations;

export interface ProfilePageState {
    userId?: number;
    profileValues?: ProfileInformation;
    loading: boolean;
    changed: boolean;
    errors: {
        [x: string]: string;
    };
}

export interface ChangeProfile {
    type: typeof PROFILE_EDIT_INFO;
    profileValues: ProfileInformation;
}

export interface LoadedProfile {
    type: typeof PROFILE_LOAD_INFO;
    profile?: ProfileInformation;
}

export interface ChangeUser {
    type: typeof PROFILE_CHANGE_USER;
    userId: number;
}

export interface LoadingProfile {
    type: typeof PROFILE_LOADING;
    status: boolean;
}

export interface SaveProfile {
    type: typeof PROFILE_SAVED;
}

export interface ErrorProfile {
    type: typeof PROFILE_ERRORS;
    errors: {
        [x: string]: string;
    };
}

export type ProfileActions =
    | ChangeProfile
    | LoadedProfile
    | ChangeUser
    | LoadingProfile
    | SaveProfile
    | ErrorProfile;
