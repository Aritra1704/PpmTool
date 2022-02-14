import React from 'react';
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createBrowserHistory } from 'history';

const initialState = {}
const middleware = [thunk];

let store;

export const history = createBrowserHistory();
console.log(history);
const reactRduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&  
window.__REDUX_DEVTOOLS_EXTENSION__()

if (window.navigator.userAgent.includes("Chrome") && reactRduxDevTools) {
    store = createStore(rootReducer, // combine all reducers
        initialState, // initial state of data
        compose(
            applyMiddleware(...middleware), 
            // Chrome extensions for redux developer mode
            reactRduxDevTools
        )
    );
} else {
    store = createStore(
        rootReducer, 
        initialState, 
        compose(applyMiddleware(...middleware))
    );
}

export default store;