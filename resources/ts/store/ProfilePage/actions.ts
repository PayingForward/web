import { ProfileInformation, LoadedProfile, PROFILE_LOAD_INFO, ChangeProfile, PROFILE_EDIT_INFO, ChangeUser, PROFILE_CHANGE_USER, LoadingProfile, PROFILE_LOADING } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import agent from '../../agent';
import { errorSnack, successSnack } from '../SnackController/actions';
import { APP_URL } from '../../constants/config';
import { showLoading } from 'react-redux-loading-bar';

export const loadedProfile = (profile?:ProfileInformation):LoadedProfile=>({
    type: PROFILE_LOAD_INFO,
    profile
});

export const changeProfile = (profileValues:ProfileInformation):ChangeProfile=>({
    type: PROFILE_EDIT_INFO,
    profileValues
});

export const changeUser = (userId?:number):ChangeUser=>({
    type: PROFILE_CHANGE_USER,
    userId
});

export const loadingProfile = (loading:boolean):LoadingProfile=>({
    type: PROFILE_LOADING,
    status:loading
});

export const fetchProfile = (
    userId?:number
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {

    dispatch(changeUser(userId))

    agent.Profile.fetchProfileInfo(userId).then(({success,message,profile})=>{
        if(success){
            dispatch(loadedProfile(profile));
        } else if(message){
            dispatch(errorSnack(message));
            window.location.href=APP_URL+'error/404';
        }
    })
}

export const saveProfile = (
    profile:ProfileInformation
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {

    dispatch(showLoading());

    agent.Profile.save(profile).then(({success,message})=>{
        if(success){
            dispatch(fetchProfile());
            if(message){
                dispatch(successSnack(message));
            }
        } else if(message){
            dispatch(errorSnack(message))
        }
    })
}


