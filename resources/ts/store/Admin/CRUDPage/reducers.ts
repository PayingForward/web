import {
    CRUDPageState,
    CRUDPageActions,
    CRUD_SELECT_TO_DELETE,
    CRUD_SELECT_TO_UPDATE,
    CRUD_FORM_UPDATE,
    CRUD_SELECT_TO_SEARCH,
    CRUD_FORM_SEARCH,
    CRUD_LOADED_RESULTS,
    CRUD_CHANGE_FORM,
    CRUD_LOADED_INFO,
    CRUD_CHANGE_FORM_VALUE,
    CRUD_SELECT_TO_CREATE,
    CRUD_FORM_CREATE,
    CRUD_TOGGLE_SEARCH_MODE,
    CRUD_CLEAR_FORM,
    CRUD_TABLE_SORT_DESC,
    CRUD_TABLE_SORT,
    CRUD_TABLE_CHANGE_PAGE,
    CRUD_TABLE_CHANGE_PER_PAGE
} from "./types";

const initialState: CRUDPageState = {
    results: [],
    resultsCount: 0,
    values: {},
    title: "",
    inputs: {},
    columns: {},
    structure: [],
    actions: [],
    form: "",
    search:true,
    page:1,
    perPage:25,
    sortedBy:'created_at',
    sortedMode: CRUD_TABLE_SORT_DESC
};

export default (state = initialState, action: CRUDPageActions) => {
    switch (action.type) {
        case CRUD_SELECT_TO_DELETE:
            return {
                ...state,
                updatingId: action.id
            };
        case CRUD_SELECT_TO_UPDATE:
            return {
                ...state,
                updatingId: action.result.id,
                values:{...action.result,id:undefined},
                mode: CRUD_FORM_UPDATE
            };
        case CRUD_SELECT_TO_SEARCH:
            return {
                ...state,
                mode: CRUD_FORM_SEARCH
            };
        case CRUD_SELECT_TO_CREATE:
            return {
                ...state,
                mode: CRUD_FORM_CREATE
            };
        case CRUD_LOADED_RESULTS:
            return {
                ...state,
                results: action.results,
                resultsCount: action.count
            };
        case CRUD_CHANGE_FORM:
            return {
                ...state,
                form: action.form
            };
        case CRUD_LOADED_INFO:
            return {
                ...state,
                title: action.title,
                inputs: action.inputs,
                columns: action.columns,
                structure: action.structure,
                actions: action.actions
            };
        case CRUD_CHANGE_FORM_VALUE:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.name]: action.value
                }
            };
        case CRUD_TOGGLE_SEARCH_MODE:
            return {
                ...state,
                search: !state.search
            };
        case CRUD_CLEAR_FORM:
            return {
                ...state,
                search:false,
                values:{},
                mode:undefined,
                updatingId:undefined
            };
        case CRUD_TABLE_SORT:
            return {
                ...state,
                sortedBy: action.sortBy,
                sortedMode: action.sortMode
            };
        case CRUD_TABLE_CHANGE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case CRUD_TABLE_CHANGE_PER_PAGE:
            return {
                ...state,
                perPage: action.perPage
            };
        default:
            return state;
    }
};
