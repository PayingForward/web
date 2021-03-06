export const CRUD_CHANGE_FORM_VALUE = "CRUD_CHANGE_FORM_VALUE";
export const CRUD_LOADED_RESULTS = "CRUD_LOADED_RESULTS";
export const CRUD_SELECT_TO_DELETE = "CRUD_SELECT_TO_DELETE";
export const CRUD_SELECT_TO_UPDATE = "CRUD_SELECT_TO_UPDATE";
export const CRUD_SELECT_TO_SEARCH = "CRUD_SELECT_TO_SEARCH";
export const CRUD_SELECT_TO_CREATE = "CRUD_SELECT_TO_CREATE";
export const CRUD_CHANGE_FORM = "CRUD_CHANGE_FORM";
export const CRUD_LOADED_INFO = "CRUD_LOADED_INFO";
export const CRUD_TOGGLE_SEARCH_MODE = "CRUD_TOGGLE_SEARCH_MODE";
export const CRUD_CLEAR_FORM = "CRUD_CLEAR_FORM";

export const CRUD_TABLE_SORT = "CRUD_TABLE_SORT";
export const CRUD_TABLE_CHANGE_PAGE = "CRUD_TABLE_CHANGE_PAGE";
export const CRUD_TABLE_CHANGE_PER_PAGE = "CRUD_TABLE_CHANGE_PER_PAGE";

export interface Attribute {
    name: string;
    value: any;
}

export interface Input {
    name: string;
    type: string;
    attributes: Attribute[];
    validation: string;
    label: string;
    searchable: boolean;
}

export interface Inputs {
    [x: string]: Input;
}

export interface Columns {
    [x: string]: Column;
}

export interface Column {
    name: string;
    type: string;
    attributes: Attribute[];
    searchable: boolean;
    sortable: boolean;
    label: string;
}

export interface ResultRow {
    id: number;
    [x: string]: any;
}

export const CRUD_FORM_UPDATE = "CRUD_FORM_UPDATE";
export const CRUD_FORM_SEARCH = "CRUD_FORM_SEARCH";
export const CRUD_FORM_CREATE = "CRUD_FORM_CREATE";

export const CRUD_TABLE_SORT_DESC = "CRUD_TABLE_SORT_DESC";
export const CRUD_TABLE_SORT_ASC = "CRUD_TABLE_SORT_ASC";
export type SortModes =
    | typeof CRUD_TABLE_SORT_DESC
    | typeof CRUD_TABLE_SORT_ASC;

export interface CRUDPageState {
    results: ResultRow[];
    updatingId?: number;
    resultsCount: number;
    values: {
        [x: string]: any;
    };
    mode?:
        | typeof CRUD_FORM_SEARCH
        | typeof CRUD_FORM_UPDATE
        | typeof CRUD_FORM_CREATE;
    title: string;
    columns: Columns;
    inputs: Inputs;
    structure: Input[][];
    actions: string[];
    form: string;
    search: boolean;
    page: number;
    perPage: number;
    sortedBy: string;
    sortedMode: SortModes;
}

export interface LoadedResults {
    type: typeof CRUD_LOADED_RESULTS;
    count: number;
    results: ResultRow[];
}

export interface SelectToUpdate {
    type: typeof CRUD_SELECT_TO_UPDATE;
    result: ResultRow;
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

export interface SelectToCreate {
    type: typeof CRUD_SELECT_TO_CREATE;
}

export interface LoadedInfo {
    type: typeof CRUD_LOADED_INFO;
    title: string;
    columns: Columns;
    inputs: Inputs;
    structure: Input[][];
    actions: string[];
}

export interface ChangeValue {
    type: typeof CRUD_CHANGE_FORM_VALUE;
    name: string;
    value: any;
}

export interface ToggleSearchMode {
    type: typeof CRUD_TOGGLE_SEARCH_MODE;
}

export interface ClearForm {
    type: typeof CRUD_CLEAR_FORM;
}

export interface SortResults {
    type: typeof CRUD_TABLE_SORT;
    sortBy: string;
    sortMode: SortModes;
}

export interface ChangePage {
    type: typeof CRUD_TABLE_CHANGE_PAGE;
    page: number;
}

export interface ChangePerPage {
    type: typeof CRUD_TABLE_CHANGE_PER_PAGE;
    perPage: number;
}

export type CRUDPageActions =
    | LoadedResults
    | SelectToDelete
    | SelectToUpdate
    | SelectToSearch
    | ChangeType
    | LoadedInfo
    | ChangeValue
    | SelectToCreate
    | ToggleSearchMode
    | ClearForm
    | SortResults
    | ChangePage
    | ChangePerPage;
