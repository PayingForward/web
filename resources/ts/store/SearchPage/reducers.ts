import { SearchPageState, SearchPageActions, SEARCH_PAGE_KEYWORD_CHANGE, SEARCH_PAGE_LOADED_RESULTS, SEARCH_PAGE_CHANGE_OPTION, SEARCH_PAGE_LOADED_OPTIONS, SEARCH_PAGE_OPTION_KEYWORD_CHANGE, SEARCH_PAGE_LOADED } from "./types";

const initialState:SearchPageState ={
    searchKeyword:"",
    selectedOptions:{},
    loadedOptions:{},
    keywords:{},
    results:[],
    resultsCount:0,
    loading:true,
}

export default (state=initialState,action:SearchPageActions):SearchPageState=>{
    switch (action.type) {
        case SEARCH_PAGE_KEYWORD_CHANGE:
            return {
                ...state,
                searchKeyword:action.keyword,
                loading:true
            };
        case SEARCH_PAGE_LOADED_RESULTS:
            return {
                ...state,
                results:action.results,
                resultsCount:action.resultsCount
            };
        case SEARCH_PAGE_CHANGE_OPTION:
            let filtered = state.selectedOptions[action.optionId].filter(i=>i!=action.id);
            if(filtered.length!=state.selectedOptions[action.optionId].length){
                filtered.push(action.id);
            }
            return {
                ...state,
                selectedOptions:{
                    ...state.selectedOptions,
                    [action.optionId]:filtered
                }
            };
        case SEARCH_PAGE_LOADED_OPTIONS:
            return {
                ...state,
                loadedOptions:{
                    ...state.loadedOptions,
                    [action.optionId]:action.options
                }
            };
        case SEARCH_PAGE_OPTION_KEYWORD_CHANGE:
            return {
                ...state,
                keywords:{
                    ...state.keywords,
                    [action.optionId]:action.keyword
                }
            };
        case SEARCH_PAGE_LOADED:
            return {
                ...state,
                loading:false
            };
        default:
            return state;
    }
}