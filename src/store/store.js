import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/setUserObj'], // Ignore specific action types
                ignoredPaths: ['auth.userObj'], // Ignore specific state paths
            },
        }),
});

export default store;
