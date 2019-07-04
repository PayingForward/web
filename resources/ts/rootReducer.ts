import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import authController from "./store/AuthController/reducers";
import snackController from "./store/SnackController/reducers";

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    authController,
    snackController
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
