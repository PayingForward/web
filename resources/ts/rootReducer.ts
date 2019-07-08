import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import authController from "./store/AuthController/reducers";
import snackController from "./store/SnackController/reducers";
import loginForm from "./store/LoginForm/reducers";

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    authController,
    snackController,
    loginForm
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
