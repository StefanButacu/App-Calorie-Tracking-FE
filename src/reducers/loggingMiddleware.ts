// loggingMiddleware.ts
import {Middleware} from '@reduxjs/toolkit';

export const loggingMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    console.log("logging middleware ", action)
    return next(action);
};
