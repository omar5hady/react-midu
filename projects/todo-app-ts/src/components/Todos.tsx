import {TodoId, TodoCompleted, type ListOfTodos } from '../types';
import Todo from './Todo';

interface IProps {
    todos: ListOfTodos
    onRemoveTodo: ({id}: TodoId) => void
    onToggleCompletedTodo: ({id, completed}: TodoCompleted ) => void
}

const Todos: React.FC<IProps> = ({ todos, onRemoveTodo, onToggleCompletedTodo }) => {
    return (
        <ul className='todo-list'>
            { todos.map( (todo) => (
                <li key={todo.id} className={`${todo.completed ? 'completed' : ''} `}>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onRemoveTodo={onRemoveTodo}
                        onToggleCompletedTodo={onToggleCompletedTodo}
                    ></Todo>
                </li>
            ))}
        </ul>
    );
}

export default Todos;
