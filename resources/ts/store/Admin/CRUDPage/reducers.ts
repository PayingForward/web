import { CRUDPageState , CRUDPageActions, CRUD_SELECT_TO_DELETE, CRUD_SELECT_TO_UPDATE, CRUD_FORM_UPDATE, CRUD_SELECT_TO_SEARCH, CRUD_FORM_SEARCH, CRUD_LOADED_RESULTS, CRUD_CHANGE_FORM, CRUD_LOADED_INFO, CRUD_CHANGE_FORM_VALUE} from "./types";

const initialState:CRUDPageState = {
    results:[],
    resultsCount:0,
    values:{},
    title:"",
    inputs:[],
    columns:[],
    structure:[],
    actions:[],
    form:""
};

export default (state=initialState,action:CRUDPageActions)=>{
    switch (action.type) {
        case CRUD_SELECT_TO_DELETE:
            return {
                ...state,
                updatingId:action.id
            };
        case CRUD_SELECT_TO_UPDATE:
            return {
                ...state,
                updatingId:action.id,
                mode:CRUD_FORM_UPDATE
            };
        case CRUD_SELECT_TO_SEARCH:
            return {
                ...state,
                mode:CRUD_FORM_SEARCH
            };
        case CRUD_LOADED_RESULTS:
            return {
                ...state,
                results:action.results,
                resultsCount:action.count
            };
        case CRUD_CHANGE_FORM:
            return {
                ...state,
                form:action.form
            };
        case CRUD_LOADED_INFO:
            return {
                ...state,
                title:action.title,
                inputs:action.inputs,
                columns:action.columns,
                structure:action.structure,
                actions:action.actions
            };
        case CRUD_CHANGE_FORM_VALUE:
            return {
                ...state,
                values:{
                    ...state.values,
                    [action.name]:action.value
                }
            };
        default:
            return state;
    }
}