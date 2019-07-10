import {
    ResultRow,
    CRUD_LOADED_RESULTS,
    LoadedResults,
    SelectToUpdate,
    CRUD_SELECT_TO_UPDATE,
    SelectToDelete,
    CRUD_SELECT_TO_DELETE,
    SelectToSearch,
    CRUD_SELECT_TO_SEARCH,
    LoadedInfo,
    CRUD_LOADED_INFO,
    ChangeValue,
    CRUD_CHANGE_FORM_VALUE,
    Inputs,
    Columns,
    SelectToCreate,
    CRUD_SELECT_TO_CREATE,
    ToggleSearchMode,
    CRUD_TOGGLE_SEARCH_MODE,
    Input,
    ClearForm,
    CRUD_CLEAR_FORM,
    ChangeType,
    CRUD_CHANGE_FORM,
    SortModes,
    SortResults,
    CRUD_TABLE_SORT,
    CRUD_TABLE_SORT_ASC,
    CRUD_TABLE_CHANGE_PAGE,
    ChangePage,
    ChangePerPage,
    CRUD_TABLE_CHANGE_PER_PAGE
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import agent from "../../../agent";
import { errorSnack, successSnack } from "../../SnackController/actions";

export const loadedResults = (
    results: ResultRow[],
    count: number
): LoadedResults => ({
    type: CRUD_LOADED_RESULTS,
    results,
    count
});

export const selectToUpdate = (result: ResultRow): SelectToUpdate => ({
    type: CRUD_SELECT_TO_UPDATE,
    result
});

export const selectToDelete = (id: number): SelectToDelete => ({
    type: CRUD_SELECT_TO_DELETE,
    id
});

export const selectToSearch = (): SelectToSearch => ({
    type: CRUD_SELECT_TO_SEARCH
});

export const selectToCreate = (): SelectToCreate => ({
    type: CRUD_SELECT_TO_CREATE
});

export const toggleSearchMode = (): ToggleSearchMode => ({
    type: CRUD_TOGGLE_SEARCH_MODE
});

export const clearForm = (): ClearForm => ({
    type: CRUD_CLEAR_FORM
});

export const loadedInfo = (
    title: string,
    inputs: Inputs,
    columns: Columns,
    structure: Input[][],
    actions: string[]
): LoadedInfo => ({
    type: CRUD_LOADED_INFO,
    title,
    inputs,
    columns,
    structure,
    actions
});

export const changeValue = (name: string, value: any): ChangeValue => ({
    type: CRUD_CHANGE_FORM_VALUE,
    name,
    value
});

export const changeType = (form: string): ChangeType => ({
    type: CRUD_CHANGE_FORM,
    form
});

export const sortResults = (
    sortBy: string,
    sortMode: SortModes
): SortResults => ({
    type: CRUD_TABLE_SORT,
    sortBy,
    sortMode
});

export const changePage = (page: number): ChangePage => ({
    type: CRUD_TABLE_CHANGE_PAGE,
    page
});

export const changePerPage = (perPage: number): ChangePerPage => ({
    type: CRUD_TABLE_CHANGE_PER_PAGE,
    perPage
});

export const fetchInfo = (
    form: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());

    agent.CRUD.info(form).then(
        ({ success, message, title, inputs, columns, structure, actions }) => {
            dispatch(hideLoading());
            if (success) {
                dispatch(changeType(form));
                dispatch(
                    loadedInfo(title, inputs, columns, structure, actions)
                );
            } else {
                if (message) {
                    errorSnack(message);
                }
            }
        }
    );
};

export const createRecord = (
    form: string,
    values: { [x: string]: any },
    page: number,
    perPage: number,
    sortBy: string,
    sortMode: SortModes
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());
    agent.CRUD.create(form, values).then(({ success, message }) => {
        if (success) {
            if (message) {
                dispatch(successSnack(message));
            }
            dispatch(clearForm());
            dispatch(searchRecords(form, {}, page, perPage, sortBy, sortMode));
        } else {
            if (message) {
                dispatch(errorSnack(message));
            }
        }
    });
};

export const updateRecord = (
    form: string,
    values: { [x: string]: any },
    id: number,
    page: number,
    perPage: number,
    sortBy: string,
    sortMode: SortModes
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());
    agent.CRUD.update(form, values, id).then(({ success, message }) => {
        if (success) {
            if (message) {
                dispatch(successSnack(message));
            }
            dispatch(clearForm());
            dispatch(searchRecords(form, {}, page, perPage, sortBy, sortMode));
        } else {
            if (message) {
                dispatch(errorSnack(message));
            }
        }
    });
};

export const deleteRecord = (
    form: string,
    id: number,
    page: number,
    perPage: number,
    sortBy: string,
    sortMode: SortModes
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());
    agent.CRUD.delete(form, id).then(({ success, message }) => {
        if (success) {
            if (message) {
                dispatch(successSnack(message));
            }
            dispatch(clearForm());
            dispatch(searchRecords(form, {}, page, perPage, sortBy, sortMode));
        } else {
            if (message) {
                dispatch(errorSnack(message));
            }
        }
    });
};

export const searchRecords = (
    form: string,
    values: { [x: string]: any },
    page: number,
    perPage: number,
    sortBy: string,
    sortMode: SortModes
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());

    agent.CRUD.search(
        form,
        values,
        page,
        perPage,
        sortBy,
        sortMode == CRUD_TABLE_SORT_ASC ? "asc" : "desc"
    ).then(({ success, message, results, count }) => {
        if (success) {
            dispatch(loadedResults(results, count));
        } else {
            if (message) {
                dispatch(errorSnack(message));
            }
        }
    });
};
