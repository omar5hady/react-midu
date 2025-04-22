import { TODO_FILTERS } from "./consts";

export interface ITodo {
    id: string;
    title: string;
    completed: boolean;
}

export type TodoId = Pick<ITodo, 'id'>
export type TodoTitle = Pick<ITodo, 'title'>
export type TodoCompleted = Pick<ITodo, 'id' | 'completed'>

export type ListOfTodos = ITodo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]