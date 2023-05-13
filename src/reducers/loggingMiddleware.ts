// loggingMiddleware.ts
import {Middleware} from '@reduxjs/toolkit';
import {RootState} from "../store";

export const loggingMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    console.log("logging middleware ", action)
    if (action.type === 'food/foodAdded') {
        console.log('Action dispatched:', action.type);
        console.log('Action payload:', action.payload);
    }

    return next(action);
};
