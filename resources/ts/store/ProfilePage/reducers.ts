import { ProfilePageState, ProfileActions, PROFILE_CHANGE_USER, PROFILE_EDIT_INFO, PROFILE_LOADING, PROFILE_LOAD_INFO, PROFILE_CHANGE_UPDATE_MODE } from './types';

const initialState:ProfilePageState = {
    loading:true,
    changed:false,
    errors:{},
    updateMode:0
}

export default (state=initialState,action:ProfileActions):ProfilePageState=>{
    switch (action.type) {
        case PROFILE_CHANGE_USER:
            return {
                ...state,
                userId: action.userId
            };
        case PROFILE_EDIT_INFO:
            return {
                ...state,
                profileValues: action.profileValues,
                changed:true
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading:action.status
            };
        case PROFILE_LOAD_INFO:
            return {
                ...state,
                profileValues:action.profile,
                loading:false,
                changed:false
            };
        case PROFILE_CHANGE_UPDATE_MODE:
            return {
                ...state,
                updateMode:action.mode
            }
        default:
            return state;
    }
}