import { CompleteChildInformations, School, PaymentMethod } from '../mainTypes';
import { LoadInformation, DONOR_MENU_LOAD_INFO, SelectChild, DONOR_MENU_SELECT_CHILD, DONOR_MENU_SELECT_METHOD, SelectMethod, DONOR_MENU_CHANGE_VALUE, ChangeValue } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import agent from 'resources/ts/agent';
import { errorSnack } from '../SnackController/actions';

export const loadedInformations = (childs:CompleteChildInformations[],schools:School[],methods:PaymentMethod[]):LoadInformation=>({
    type: DONOR_MENU_LOAD_INFO,
    childs,
    schools,
    paymentMethods:methods
});

export const selectChild = (child:CompleteChildInformations):SelectChild=>({
    type: DONOR_MENU_SELECT_CHILD,
    child
});

export const selectMethod = (method:PaymentMethod):SelectMethod=>({
    type: DONOR_MENU_SELECT_METHOD,
    method
});

export const changeValue = (value:string|number):ChangeValue=>({
    type: DONOR_MENU_CHANGE_VALUE,
    value
});

export const fetchInformations = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());

    agent.HomePage.fetchDonorInfo().then(({message,success,childs,schools,methods})=>{
        dispatch(hideLoading());

        if(success){
            dispatch(loadedInformations(childs,schools,methods))
        } else if(message){
            dispatch(errorSnack(message));
        }
    })
}