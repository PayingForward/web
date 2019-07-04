import {
    APP_CLOSE_SNACK,
    APP_CONFIRM_SNACK,
    APP_ERROR_SNACK,
    APP_INFO_SNACK,
    APP_SUCCESS_SNACK,
    APP_WARNING_SNACK,
    SnackState,
    SnackActionTypes,
    BaseSnackAction
} from "./types";

const initialState: SnackState = {
    nextSnackIndex: 0,
    snacks: []
};

const generateSnackState = (
    state: SnackState,
    action: BaseSnackAction,
    type: "error" | "success" | "warning" | "info" | "confirm"
): SnackState => ({
    ...state,
    nextSnackIndex: state.nextSnackIndex + 1,
    snacks: [
        ...state.snacks,
        {
            index: state.nextSnackIndex,
            message: action.message,
            open: true,
            time: new Date().getTime(),
            timeout: action.timeout,
            type
        }
    ]
});

export default (state = initialState, action: SnackActionTypes): SnackState => {
    switch (action.type) {
        case APP_SUCCESS_SNACK:
            return generateSnackState(state, action, "success");
        case APP_ERROR_SNACK:
            return generateSnackState(state, action, "error");
        case APP_WARNING_SNACK:
            return generateSnackState(state, action, "warning");
        case APP_INFO_SNACK:
            return generateSnackState(state, action, "info");
        case APP_CONFIRM_SNACK:
            return {
                ...state,
                nextSnackIndex: state.nextSnackIndex + 1,
                snacks: [
                    ...state.snacks,
                    {
                        index: state.nextSnackIndex,
                        message: action.message,
                        onCancel: action.onCancel,
                        onConfirm: action.onConfirm,
                        open: true,
                        time: new Date().getTime(),
                        timeout: action.timeout,
                        type: "confirm"
                    }
                ]
            };
        case APP_CLOSE_SNACK:
            return {
                ...state,
                snacks: state.snacks.map(snack => ({
                    ...snack,
                    open:
                        snack.index === action.snack.index ? false : snack.open
                }))
            };
        default:
            return state;
    }
};
