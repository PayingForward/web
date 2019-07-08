import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import authController from "./store/AuthController/reducers";
import snackController from "./store/SnackController/reducers";
import loginForm from "./store/LoginForm/reducers";
import CRUDPage from "./store/Admin/CRUDPage/reducers";

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    authController,
    snackController,
    loginForm,
    CRUDPage
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
