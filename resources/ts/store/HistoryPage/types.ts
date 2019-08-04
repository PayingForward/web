import { UserInformations } from '../AuthController/types';

export const HISTORY_PAGE_CHANGE_KEYWORD = "HISTORY_PAGE_CHANGE_KEYWORD";
export const HISTORY_PAGE_CHANGE_SORT = "HISTORY_PAGE_CHANGE_SORT";
export const HISTORY_PAGE_CHANGE_PAGE = "HISTORY_PAGE_CHANGE_PAGE";
export const HISTORY_PAGE_CHANGE_PER_PAGE = "HISTORY_PAGE_CHANGE_PER_PAGE";
export const HISTORY_PAGE_LOADED_RESULTS = 'HISTORY_PAGE_LOADED_RESULTS';

export interface Record {
    mode:number,
    dateTime:string,
    user:UserInformations,
    child:UserInformations,
    amount:number|string
}

export interface HistoryPageState {
    keyword: string;
    sortBy: string;
    sortMode: string;
    page: string | number;
    perPage: string | number;
    results: Record[],
    count:number|string
}

export interface ChangeKeyword {
    type: typeof HISTORY_PAGE_CHANGE_KEYWORD;
    keyword: string;
}

export interface ChangeSort {
    type: typeof HISTORY_PAGE_CHANGE_SORT;
    sortBy: string;
    sortMode: string;
}

export interface ChangePage {
    type: typeof HISTORY_PAGE_CHANGE_PAGE;
    page: string | number;
}

export interface ChangePerPage {
    type: typeof HISTORY_PAGE_CHANGE_PER_PAGE;
    perPage: string | number;
}

export interface LoadedResults {
    type: typeof HISTORY_PAGE_LOADED_RESULTS,
    results: Record[],
    count:number|string
}

export type HistoryPageActions =
    | ChangeKeyword
    | ChangeSort
    | ChangePage
    | ChangePerPage
    | LoadedResults;
