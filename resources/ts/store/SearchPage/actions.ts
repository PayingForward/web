import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { AnyAction } from "redux";
import {
    LoadedResults,
    UserCompleteInfo,
    SEARCH_PAGE_LOADED_RESULTS,
    SEARCH_PAGE_KEYWORD_CHANGE,
    ChangeKeyword,
    ChangeOption,
    SEARCH_PAGE_CHANGE_OPTION,
    OptionKeywordChange,
    SEARCH_PAGE_OPTION_KEYWORD_CHANGE,
    Option,
    LoadedOptions,
    SEARCH_PAGE_LOADED_OPTIONS,
    Loaded,
    SEARCH_PAGE_LOADED
} from "./types";
import agent from "../../agent";
import { errorSnack } from "../SnackController/actions";

export const loadedResults = (
    results: UserCompleteInfo[],
    resultsCount: number | string
): LoadedResults => ({
    type: SEARCH_PAGE_LOADED_RESULTS,
    results,
    resultsCount
});

export const changeKeyword = (keyword: string): ChangeKeyword => ({
    type: SEARCH_PAGE_KEYWORD_CHANGE,
    keyword
});

export const changeOption = (
    optionId: string,
    id: string | number
): ChangeOption => ({
    type: SEARCH_PAGE_CHANGE_OPTION,
    optionId,
    id
});

export const changeOptionKeyword = (
    optionId: string,
    keyword: string
): OptionKeywordChange => ({
    type: SEARCH_PAGE_OPTION_KEYWORD_CHANGE,
    optionId,
    keyword
});

export const loadedOptions = (
    optionId: string,
    options: Option[]
): LoadedOptions => ({
    type: SEARCH_PAGE_LOADED_OPTIONS,
    optionId,
    options
});

export const loaded = (): Loaded => ({
    type: SEARCH_PAGE_LOADED
});

export const fetchResults = (
    keyword: string,
    options: {
        [x: string]: (string | number)[];
    }
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    agent.SearchPage.searchResults(keyword, options).then(
        ({ success, message, results, count }) => {
            dispatch(loaded());

            if (success) {
                dispatch(loadedResults(results, count));
            } else if (message) {
                dispatch(errorSnack(message));
            }
        }
    );
};

export const fetchOptions = (
    keyword: string,
    optionId: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());
    agent.SearchPage.searchOptions(keyword, optionId).then(
        ({ success, message, options }) => {
            dispatch(hideLoading());

            if (success) {
                dispatch(loadedOptions(optionId, options));
            } else if (message) {
                dispatch(errorSnack(message));
            }
        }
    );
};
