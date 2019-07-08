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
    Input,
    Column,
    LoadedInfo,
    CRUD_LOADED_INFO,
    ChangeValue,
    CRUD_CHANGE_FORM_VALUE
} from "./types";

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

export const loadedInfo = (
    title: string,
    inputs: Input[],
    columns: Column[],
    structure: string[][],
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
