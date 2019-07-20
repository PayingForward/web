import {
    ChangeValue,
    HOMEPAGE_CHANGE_VALUE,
    SelectChild,
    HOMEPAGE_SELECT_CHILD,
    LoadChilds,
    HOMEPAGE_LOAD_CHILDS
} from "./types";
import { UserInformations } from "../AuthController/types";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import agent from '../../agent';
import { errorSnack } from '../SnackController/actions';

export const changeValue = (value?: string | number): ChangeValue => ({
    type: HOMEPAGE_CHANGE_VALUE,
    value
});

export const selectChild = (child: UserInformations): SelectChild => ({
    type: HOMEPAGE_SELECT_CHILD,
    child
});

export const loadedChilds = (childs: UserInformations[]): LoadChilds => ({
    type: HOMEPAGE_LOAD_CHILDS,
    childs
});

export const fetchRandomChilds = (
    count?: number,
    except?: number[],
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());
    agent.HomePage.randomChilds(count,except).then(({success,message,childs})=>{
        dispatch(hideLoading());

        if(success){
            dispatch(loadedChilds(childs));
        } else if(message) {
            dispatch(errorSnack(message));
        }
    })
};
