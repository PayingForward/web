import { HomePageStates, HomePageActions, HOMEPAGE_CHANGE_VALUE, HOMEPAGE_SELECT_CHILD, HOMEPAGE_LOAD_CHILDS } from "./types";

const initialState:HomePageStates = {
    sliderChilds:[]
}

export default (state=initialState,action:HomePageActions):HomePageStates=>{

    switch (action.type) {
        case HOMEPAGE_CHANGE_VALUE:
            return {
                ...state,
                value:action.value
            };
        case HOMEPAGE_SELECT_CHILD:
            return {
                ...state,
                selectedChild:action.child
            }
        case HOMEPAGE_LOAD_CHILDS:
            return {
                ...state,
                sliderChilds:[...state.sliderChilds.slice(action.childs.length),...action.childs]
            }
        default:
            return state;
    }
}