import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from '../features/auth'

const appReducer = combineReducers({
    auth: authReducer,
})

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: AnyAction) => {

    return appReducer(state, action);
}


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
