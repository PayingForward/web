import {
    ChangeKeyword,
    HISTORY_PAGE_CHANGE_KEYWORD,
    ChangeSort,
    HISTORY_PAGE_CHANGE_SORT,
    ChangePage,
    HISTORY_PAGE_CHANGE_PAGE,
    ChangePerPage,
    HISTORY_PAGE_CHANGE_PER_PAGE,
    LoadedResults,
    HISTORY_PAGE_LOADED_RESULTS,
    Record
} from "./types";
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import agent from '../../agent';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { errorSnack } from '../SnackController/actions';

export const changeKeyword = (keyword: string): ChangeKeyword => ({
    type: HISTORY_PAGE_CHANGE_KEYWORD,
    keyword
});

export const changeSort = (sortBy: string, sortMode: string): ChangeSort => ({
    type: HISTORY_PAGE_CHANGE_SORT,
    sortBy,
    sortMode
});

export const changePage = (page: number | string): ChangePage => ({
    type: HISTORY_PAGE_CHANGE_PAGE,
    page
});

export const changePerPage = (perPage: number | string): ChangePerPage => ({
    type: HISTORY_PAGE_CHANGE_PER_PAGE,
    perPage
});

export const loadedResults = (results:Record[],count:string|number):LoadedResults=>({
    type:HISTORY_PAGE_LOADED_RESULTS,
    results,
    count
});

export const fetchResults = (keyword:string,sortBy:string,sortMode:string,page:string|number,perPage:string|number): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading())
    agent.DonationPage.search(keyword,sortBy,sortMode,page,perPage).then(({message,success,donations,count})=>{
        dispatch(hideLoading());

        if(success){
            dispatch(loadedResults(donations,count));
        } else if(message) {
            dispatch(errorSnack(message))
        }
    })
}