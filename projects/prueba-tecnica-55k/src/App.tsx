import { useEffect, useState } from 'react'
import './App.css'
import { type User } from '../../google-translate-clone/src/types/type';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([])

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
        <UsersList users={users}/>
      </div>
    </>
  )
}

export default App
