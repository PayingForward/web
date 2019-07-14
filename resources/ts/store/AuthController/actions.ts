import {
    UserInformations,
    LoggedUserLoaded,
    LOGGED_USER_LOADED,
    LoggedUserClear,
    CLEAR_LOGGED_USER
} from "./types";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import agent from "../../agent";
import { USER_TOKEN_KEY } from "../../constants/config";

export const loadLoggedUser = (user?: UserInformations): LoggedUserLoaded => ({
    type: LOGGED_USER_LOADED,
    user
});

export const clearLoggedUser = (): LoggedUserClear => ({
    type: CLEAR_LOGGED_USER
});

export const fetchLoggedUser = (): ThunkAction<
    Promise<void>,
    {},
    {},
    AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(showLoading());

    agent.Auth.getUser().then(({ success, type, name, id,avatar }) => {
        dispatch(hideLoading());
        if (success) {
            dispatch(loadLoggedUser({ name, type, id,avatar }));
        } else {
            localStorage.removeItem(USER_TOKEN_KEY);
            dispatch(clearLoggedUser());
            dispatch(loadLoggedUser())
        }
    });
};
