import {
    HistoryPageState,
    HistoryPageActions,
    HISTORY_PAGE_CHANGE_KEYWORD,
    HISTORY_PAGE_CHANGE_SORT,
    HISTORY_PAGE_CHANGE_PAGE,
    HISTORY_PAGE_CHANGE_PER_PAGE,
    HISTORY_PAGE_LOADED_RESULTS
} from "./types";

const defaultState: HistoryPageState = {
    keyword: "",
    sortBy: "dateTime",
    sortMode: "desc",
    page: 1,
    perPage: 30,
    results:[],
    count:0
};

export default (
    state = defaultState,
    action: HistoryPageActions
): HistoryPageState => {
    switch (action.type) {
        case HISTORY_PAGE_CHANGE_KEYWORD:
            return {
                ...state,
                keyword: action.keyword
            };
        case HISTORY_PAGE_CHANGE_SORT:
            return {
                ...state,
                sortBy: action.sortBy,
                sortMode: action.sortMode
            };
        case HISTORY_PAGE_CHANGE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case HISTORY_PAGE_CHANGE_PER_PAGE:
            return {
                ...state,
                perPage: action.perPage
            };
        case HISTORY_PAGE_LOADED_RESULTS:
            return {
                ...state,
                results: action.results,
                count: action.count
            }
        default:
            return state;
    }
};
