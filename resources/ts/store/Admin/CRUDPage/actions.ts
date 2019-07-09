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
    CRUD_CLEAR_FORM
} from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { showLoading } from "react-redux-loading-bar";
import agent from "../../../agent";
import { errorSnack } from "../../SnackController/actions";

export const loadedResults = (
    results: ResultRow[],
    count: number
): LoadedResults => ({
    type: CRUD_LOADED_RESULTS,
    results,
    count
});

export const selectToUpdate = (id: number): SelectToUpdate => ({
    type: CRUD_SELECT_TO_UPDATE,
    id
});

export const selectToDelete = (id: number): SelectToDelete => ({
    type: CRUD_SELECT_TO_DELETE,
    id
});

export const selectToSearch = (): SelectToSearch => ({
    type: CRUD_SELECT_TO_SEARCH
});

export const selectToCreate = ():SelectToCreate =>({
    type:CRUD_SELECT_TO_CREATE
});

export const toggleSearchMode = ():ToggleSearchMode =>({
    type:CRUD_TOGGLE_SEARCH_MODE
});

export const clearForm = ():ClearForm=>({
    type:CRUD_CLEAR_FORM
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

export const fetchInfo = (
    form: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(showLoading());

    agent.CRUD.info(form).then(
        ({ success, message, title, inputs, columns, structure, actions }) => {
            if (success) {
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
