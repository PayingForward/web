import { ProfileInformation, LoadedProfile, PROFILE_LOAD_INFO, ChangeProfile, PROFILE_EDIT_INFO, ChangeUser, PROFILE_CHANGE_USER, LoadingProfile, PROFILE_LOADING, PROFILE_SAVED, PROFILE_ERRORS, ErrorProfile } from './types';

export const loadedProfile = (profile:ProfileInformation):LoadedProfile=>({
    type: PROFILE_LOAD_INFO,
    profile
});

export const changeProfile = (profileValues:ProfileInformation):ChangeProfile=>({
    type: PROFILE_EDIT_INFO,
    profileValues
});

export const changeUser = (userId:number):ChangeUser=>({
    type: PROFILE_CHANGE_USER,
    userId
});

export const loadingProfile = (loading:boolean):LoadingProfile=>({
    type: PROFILE_LOADING,
    status:loading
});

export const saveProfile = ()=>({
    type: PROFILE_SAVED
})

export const errorProfile = (errors:{[x:string]:string}):ErrorProfile=>({
    type: PROFILE_ERRORS,
    errors
})