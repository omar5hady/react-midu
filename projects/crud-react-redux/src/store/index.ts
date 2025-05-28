import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser, type UserWithId } from './users/slice'
import { toast } from "sonner";

const persistanceLocalStorageMiddleware: Middleware = ( store ) => ( next ) => ( action ) => {
    next(action)
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
}

const syncWithDatabase: Middleware = ( store ) => ( next: (arg0: any) => void ) => (action: any) => {
    const { type, payload } = action
    const previousState = store.getState()
    
    next(action)
    if( type === 'users/deleteUserById') {
        const userIdToRemove = payload
        const userToRemove = previousState.users.find( (user: UserWithId) => user.id === userIdToRemove)
        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
            method: 'DELETE'
        })
        .then( res => {
            if(res.ok){
                toast.success(`Usuario ${payload} Eliminado correctamente`)
            }
            throw new Error("Error al eliminar el usuario")
        })
        .catch(() => {
            toast.error(`Error al eliminar al usuario ${userIdToRemove}`)
            if(userToRemove) store.dispatch(rollbackUser(userToRemove))
            console.log("Error");
        })
    }
    
}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabase)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch