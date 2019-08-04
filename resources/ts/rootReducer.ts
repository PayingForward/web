import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import authController from "./store/AuthController/reducers";
import snackController from "./store/SnackController/reducers";
import loginForm from "./store/LoginForm/reducers";
import CRUDPage from "./store/Admin/CRUDPage/reducers";
import sidebar from "./store/Admin/Sidebar/reducers";
import homePage from "./store/HomePage/reducers";
import searchPage from './store/SearchPage/reducers';
import signupPage from './store/SignupPage/reducers';
import donatePage from './store/DonatePage/reducers';
import historyPage from './store/HistoryPage/reducers';

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    authController,
    snackController,
    loginForm,
    CRUDPage,
    sidebar,
    homePage,
    searchPage,
    signupPage,
    donatePage,
    historyPage
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
