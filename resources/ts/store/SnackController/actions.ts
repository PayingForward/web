import {
    APP_ERROR_SNACK,
    ErrorSnackAction,
    APP_SUCCESS_SNACK,
    SuccessSnackAction,
    WarningSnackAction,
    APP_WARNING_SNACK,
    InfoSnackAction,
    APP_INFO_SNACK,
    ConfirmSnackAction,
    APP_CONFIRM_SNACK,
    Snack,
    CloseSnackAction,
    APP_CLOSE_SNACK
} from "./types";

export const errorSnack = (
    message: string,
    timeout = undefined
): ErrorSnackAction => ({
    message,
    timeout,
    type: APP_ERROR_SNACK
});

export const successSnack = (
    message: string,
    timeout = undefined
): SuccessSnackAction => ({
    message,
    timeout,
    type: APP_SUCCESS_SNACK
});

export const warningSnack = (
    message: string,
    timeout = undefined
): WarningSnackAction => ({
    message,
    timeout,
    type: APP_WARNING_SNACK
});

export const infoSnack = (
    message: string,
    timeout = undefined
): InfoSnackAction => ({
    message,
    timeout,
    type: APP_INFO_SNACK
});

export const confirmSnack = (
    message: string,
    onCancel: () => void,
    onConfirm: () => void,
    timeout = undefined
): ConfirmSnackAction => ({
    message,
    onCancel,
    onConfirm,
    timeout,
    type: APP_CONFIRM_SNACK
});

export const closeSnack = (snack: Snack): CloseSnackAction => ({
    snack,
    type: APP_CLOSE_SNACK
});
