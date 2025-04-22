import { useState } from "react"
import { FilterValue, TodoCompleted, TodoId, type ListOfTodos, TodoTitle } from './types';
import Todos from "./components/Todos"
import { TODO_FILTERS } from "./consts"
import Footer from "./components/Footer"
import Header from "./components/Header"

const mockTodos: ListOfTodos = [
  {
    id: '1',
    title: ' Iniciar proyecto TODO',
    completed: true
  },
  {
    id: '2',
    title: ' Agregar estilos',
    completed: false
  },
  {
    id: '3',
    title: ' Crear funcionalidad',
    completed: false
  }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleRemove = ({id}: TodoId): void => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ( { id, completed }: TodoCompleted ) => {
    const newTodos = todos.map( todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleFilterChange = ( filter: FilterValue ) => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter( todo => !todo.completed)
    setTodos(newTodos)
  }

  const filterTodos = todos.filter( todo => {
    if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}: TodoTitle) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false
    }

    const newTodos = [...todos, newTodo]
    setTodos( newTodos )
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo}/>
      <Todos 
        onToggleCompletedTodo={handleCompleted}
        onRemoveTodo={handleRemove} todos={filterTodos}>
      </Todos>
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      ></Footer>
    </div>
  )
}

export default App
