import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './users/slice'

const persistanceLocalStorageMiddleware = ( store: { getState: () => any; } ) => ( next: (arg0: any) => void ) => ( action: any ) => {
    next(action)
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch