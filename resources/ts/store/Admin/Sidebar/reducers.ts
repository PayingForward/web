import { SidebarState, SidebarActions, SIDEBAR_LOADED, SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED } from "./types";

const initialState:SidebarState ={
    items:[],
    expanded:[]
};

export default (state=initialState,action:SidebarActions):SidebarState=>{
    switch (action.type) {
        case SIDEBAR_LOADED:
            return {
                ...state,
                items:action.items
            };
        case SIDEBAR_COLLAPSED:
            return {
                ...state,
                expanded:state.expanded.filter(id=>id!=action.id)
            };
        case SIDEBAR_EXPANDED:
            return {
                ...state,
                expanded:[...state.expanded,action.id]
            };
        default:
            return state;
    }
}