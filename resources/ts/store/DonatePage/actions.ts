import { Success, DONATE_PAGE_SUCCESS, LoadedInfo, DONATE_PAGE_LOADED_INFO, ChangeChild, DONATE_PAGE_CHANGE_CHILD, ChangeAmount, DONATE_PAGE_CHANGE_AMOUNT } from './types';
import { UserInformations } from '../AuthController/types';

export const success = ():Success=>({
    type:DONATE_PAGE_SUCCESS
});

export const loadedInfo =(child:UserInformations):LoadedInfo=>({
    type: DONATE_PAGE_LOADED_INFO,
    child
});

export const changeChild = (child:UserInformations):ChangeChild=>({
    type:DONATE_PAGE_CHANGE_CHILD,
    child
});

export const changeAmount = (amount:number):ChangeAmount=>({
    type:DONATE_PAGE_CHANGE_AMOUNT,
    amount
});