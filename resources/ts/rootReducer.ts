import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import authController from "./store/AuthController/reducers";
import snackController from "./store/SnackController/reducers";
import CRUDPage from "./store/Admin/CRUDPage/reducers";
import sidebar from "./store/Admin/Sidebar/reducers";
import loginForm from './store/LoginForm/reducers';

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    authController,
    snackController,
    CRUDPage,
    sidebar,
    loginForm
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
