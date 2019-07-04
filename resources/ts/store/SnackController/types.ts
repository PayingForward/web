// Snack types
export const APP_WARNING_SNACK = "APP_WARNING_SNACK";
export const APP_SUCCESS_SNACK = "APP_SUCCESS_SNACK";
export const APP_ERROR_SNACK = "APP_ERROR_SNACK";
export const APP_CONFIRM_SNACK = "APP_CONFIRM_SNACK";
export const APP_INFO_SNACK = "APP_INFO_SNACK";
export const APP_CLOSE_SNACK = "APP_CLOSE_SNACK";

export interface Snack {
    index: number;
    message: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    open: boolean;
    time: number;
    timeout?: number;
    type: "error" | "success" | "info" | "confirm" | "warning";
}

export interface BaseSnackAction {
    message: string;
    timeout?: number;
}

export interface InfoSnackAction extends BaseSnackAction {
    type: typeof APP_INFO_SNACK;
}

export interface ErrorSnackAction extends BaseSnackAction {
    type: typeof APP_ERROR_SNACK;
}

export interface SuccessSnackAction extends BaseSnackAction {
    type: typeof APP_SUCCESS_SNACK;
}

export interface WarningSnackAction extends BaseSnackAction {
    type: typeof APP_WARNING_SNACK;
}

export interface ConfirmSnackAction extends BaseSnackAction {
    onCancel: () => void;
    onConfirm: () => void;
    type: typeof APP_CONFIRM_SNACK;
}

export interface CloseSnackAction {
    snack: Snack;
    type: typeof APP_CLOSE_SNACK;
}

export interface SnackState {
    nextSnackIndex: number;
    snacks: Snack[];
}

export type SnackActionTypes =
    | InfoSnackAction
    | ErrorSnackAction
    | SuccessSnackAction
    | WarningSnackAction
    | ConfirmSnackAction
    | CloseSnackAction;
