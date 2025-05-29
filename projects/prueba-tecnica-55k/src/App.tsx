import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './type.d';
import UsersList from './components/UsersList';

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const originalUsers = useRef<User[]>([])
  // UseRef -> para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar no vuelva a renderizar el componente

  const toggleColors = () => {
    setShowColor(!showColor)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  }

  const getUsers = () => {
    fetch('https://randomuser.me/api/?results=100')
      .then(res => res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.log(err);
      })
  }

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  // const sortedUsers = sortByCountry ? [...filteredUsers].sort((a, b) => {
  //   return a.location.country.localeCompare(b.location.country)
  // }) : filteredUsers

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    getUsers()
  }, [])

  const sortedUsers = useMemo(() => {

    if (sorting === SortBy.NONE ) return filteredUsers;

    let sortFn = (a: User, b: User) => a.location.country.localeCompare(b.location.country)

    if (sorting === SortBy.NAME ) {
      sortFn = (a: User, b: User) => a.name.first.localeCompare(b.name.first)
    }

    if (sorting === SortBy.LAST ) {
      sortFn = (a: User, b: User) => a.name.last.localeCompare(b.name.last)
    }

    return [...filteredUsers].sort(sortFn);
  }, [filteredUsers, sorting])

  return (
    <>
      <div>
        <h1>PRUEBA TÉCNICA</h1>
        <header>
          <button style={{ marginLeft: '10px' }} onClick={toggleColors}>Colorear filas</button>
          <button style={{ marginLeft: '10px' }} onClick={toggleSortByCountry}>{
            sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'
          }</button>
          <button style={{ marginLeft: '10px' }} onClick={handleReset}>Resetear estado</button>
          <input type='text' placeholder='Filtra por pais' onChange={(e) => {
            setFilterCountry(e.target.value)
          }} />
        </header>
        <main>
          <UsersList handleChangeSort={handleChangeSort} deleteUser={handleDelete} showColor={showColor} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
