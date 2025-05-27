import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: UserId;
}

const DEFAULT_STATE = [
    { id: '1', name: "Omar Ramos", email: "omar.ramosvzq@gmail.com", github: 'omar5hady' },
    { id: '2', name: "Miguel Malaquias", email: "malaks69@gmail.com", github: 'pegchan' },
    { id: '3', name: "Jose Juan", email: "pelu@gmail.com", github: 'ElPelu' },
]

const initialState: UserWithId[] = ( () => {
    const persistedState = localStorage.getItem("__redux__state__");
    if (persistedState) return JSON.parse(persistedState).users;
    return DEFAULT_STATE;
})()

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter((user) => user.id !== id);
        },
        addNewUser: ( state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            return [...state, {
                id, ...action.payload
            }]
        }
    }
})

export default userSlice.reducer;

export const { deleteUserById } = userSlice.actions
export const { addNewUser } = userSlice.actions