import { SidebarItem, SidebarItemsLoaded, SIDEBAR_LOADED, SidebarExpanded, SIDEBAR_EXPANDED, SidebarCollapsed, SIDEBAR_COLLAPSED } from './types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { showLoading } from 'react-redux-loading-bar';
import agent from '../../../agent';
import { errorSnack } from '../../SnackController/actions';

export const loadedSidebar = (items:SidebarItem[]):SidebarItemsLoaded=>({
    type: SIDEBAR_LOADED,
    items
});

export const expandedItem = (id:string):SidebarExpanded=>({
    type: SIDEBAR_EXPANDED,
    id
});

export const collapsedItem = (id:string):SidebarCollapsed=>({
    type:SIDEBAR_COLLAPSED,
    id
});

export const fetchSidebar = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => { 
    dispatch(showLoading());

    agent.Permissions.permitedItems().then(({success,message,items})=>{
        if(success){
            dispatch(loadedSidebar(items));
        } else {
            if(message){
                dispatch(errorSnack(message));
            }
        }
    })
};