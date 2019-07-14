import {
    AuthControllerState,
    AuthControllerActionTypes,
    LOGGED_USER_LOADED,
    CLEAR_LOGGED_USER
} from "./types";

const initialState: AuthControllerState = {
    loading: true
};

export default (
    state = initialState,
    action: AuthControllerActionTypes
): AuthControllerState => {
    switch (action.type) {
        case LOGGED_USER_LOADED:
            return {
                ...state,
                user: action.user,
                loading:false
            };
        case CLEAR_LOGGED_USER:
            return {
                ...state,
                user:undefined
            };
        default:
            return state;
    }
};
