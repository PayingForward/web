import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import authController from "./store/AuthController/reducers";
import snackController from "./store/SnackController/reducers";
import CRUDPage from "./store/Admin/CRUDPage/reducers";
import sidebar from "./store/Admin/Sidebar/reducers";
import loginForm from './store/LoginForm/reducers';
import signupPage from './store/SignupPage/reducers';
import donorMenu from './store/DonorMenu/reducers';
import profilePage from './store/ProfilePage/reducers';
import donatePage from './store/DonatePage/reducers';
import searchPage from './store/SearchPage/reducers';

const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    authController,
    snackController,
    CRUDPage,
    sidebar,
    loginForm,
    signupPage,
    donorMenu,
    profilePage,
    donatePage,
    searchPage
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
