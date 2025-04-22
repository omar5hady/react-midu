import { ITodo, TodoCompleted, TodoId } from '../types';

interface Props extends ITodo {
    onRemoveTodo: ({id}: TodoId) => void
    onToggleCompletedTodo: ({id, completed}: TodoCompleted ) => void
}

const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompletedTodo }) => {

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        onToggleCompletedTodo({id, completed: event.target.checked})
    }
    return (
        <div className="view">
            <input className="toggle" type="checkbox" checked={completed} 
                onChange={ handleChangeCheckbox }
            />
            <label>{title}</label>
            <button className='destroy' onClick={ ()=> onRemoveTodo({id}) }></button>
        </div>
    );
}

export default Todo;
