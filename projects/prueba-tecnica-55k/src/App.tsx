import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './type';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)

  const toggleColors = () => {
    setShowColor(!showColor)
  }

  const getUsers = () => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <div>
        <h1>PRUEBA TÉCNICA</h1>
        <header>
          <button onClick={toggleColors}>Colorear filas</button>
        </header>
        <main>
          <UsersList showColor={showColor} users={users} />
        </main>
      </div>
    </>
  )
}

export default App
