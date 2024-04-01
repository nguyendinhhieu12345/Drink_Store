import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice";
import cartSlice from "@/features/cart/cartSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ["cart"],
};

export default configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice
    },
});
// auth: authReducer
const rootReducer = combineReducers({
    authSlice,
    cartSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// export const storePublic = createStore({ auth: authReducer });
