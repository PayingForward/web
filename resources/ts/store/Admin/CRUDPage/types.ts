export const CRUD_CHANGE_FORM_VALUE = "CRUD_CHANGE_FORM_VALUE";
export const CRUD_LOADED_RESULTS = "CRUD_LOADED_RESULTS";
export const CRUD_SELECT_TO_DELETE = "CRUD_SELECT_TO_DELETE";
export const CRUD_SELECT_TO_UPDATE = "CRUD_SELECT_TO_UPDATE";
export const CRUD_SELECT_TO_SEARCH = "CRUD_SELECT_TO_SEARCH";
export const CRUD_CHANGE_FORM = "CRUD_CHANGE_FORM";
export const CRUD_LOADED_INFO = "CRUD_LOADED_INFO";

export interface Attribute {
    name: string;
    value: any;
}

export interface Input {
    name: string;
    type: string;
    attributes: Attribute[];
    validation: string;
}

export interface Column {
    name: string;
    type: string;
    attributes: Attribute[];
    searchable: boolean;
    sortable: boolean;
}

export interface ResultRow {
    id: number;
    [x: string]: any;
}

export const CRUD_FORM_UPDATE = "CRUD_FORM_UPDATE";
export const CRUD_FORM_SEARCH = "CRUD_FORM_SEARCH";

export interface CRUDPageState {
    results: ResultRow[];
    updatingId?: number;
    resultsCount: number;
    values: {
        [x: string]: any;
    };
    mode?: typeof CRUD_FORM_SEARCH | typeof CRUD_FORM_UPDATE;
    title: string;
    columns: Column[];
    inputs: Input[];
    structure: string[][];
    actions: string[];
    form: string;
}

export interface LoadedResults {
    type: typeof CRUD_LOADED_RESULTS;
    count: number;
    results: ResultRow[];
}

export interface SelectToUpdate {
    type: typeof CRUD_SELECT_TO_UPDATE;
    id: number;
}

export interface SelectToDelete {
    type: typeof CRUD_SELECT_TO_DELETE;
    id: number;
}

export interface SelectToSearch {
    type: typeof CRUD_SELECT_TO_SEARCH;
}

export interface ChangeType {
    type: typeof CRUD_CHANGE_FORM;
    form: string;
}

export interface LoadedInfo {
    type: typeof CRUD_LOADED_INFO;
    title: string;
    columns: Column[];
    inputs: Input[];
    structure: string[][];
    actions: string[];
}

export interface ChangeValue {
    type: typeof CRUD_CHANGE_FORM_VALUE;
    name: string;
    value: any;
}

export type CRUDPageActions =
    | LoadedResults
    | SelectToDelete
    | SelectToUpdate
    | SelectToSearch
    | ChangeType
    | LoadedInfo
    | ChangeValue;
