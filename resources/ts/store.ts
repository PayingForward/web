import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { applyMiddleware,createStore, Middleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { APP_LOGGER_ON } from './constants/config';
import rootReducer from "./rootReducer";

let middleware: Middleware[] = [thunk,loadingBarMiddleware()];

if(APP_LOGGER_ON){
	middleware = [...middleware,createLogger()];
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);


export default createStoreWithMiddleware(rootReducer);