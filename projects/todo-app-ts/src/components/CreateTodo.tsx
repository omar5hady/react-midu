import { useState } from "react";
import { TodoTitle } from "../types";

interface Props {
    saveTodo: ( {title}: TodoTitle ) => void
}

const CreateTodo: React.FC<Props> = ({saveTodo}) => {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        saveTodo({title: inputValue})
        setInputValue('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                className="new-todo" 
                value={inputValue} 
                onChange={(evt) => {setInputValue(evt.target.value)}}
                placeholder="¿Qué quieres hacer?"
                autoFocus
            />
        </form>
            
    );
}

export default CreateTodo;
