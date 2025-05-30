import { useMemo, useState } from 'react'
import './App.css'
import { SortBy, type User } from './type.d';
import UsersList from './components/UsersList';
import { useUsers } from './hooks/useUsers';
import Results from './components/Results';

function App() {

  // const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  // const [loading, setLoading] = useState(false)
  // const [error, setErrror] = useState(false)
  // const [currentPage, setCurrentPage] = useState(1)
  // const originalUsers = useRef<User[]>([])
  // UseRef -> para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar no vuelva a renderizar el componente

  const { isLoading,
    isError,
    users,
    refetch,
    fetchNextPage,
    hasNextPage
  } = useUsers()

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

  // const getUsers = (page: number) => {
  //   setLoading(true)

  //   fetchUsers(currentPage).then(users => {
  //     setUsers((prevRes) => prevRes.concat(users))
  //     if (page === 1) {
  //       originalUsers.current = users
  //     }
  //   })
  //     .catch(err => {
  //       console.log(err);
  //       setErrror(true)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

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
    // const filteredUsers = users.filter((user) => user.login.uuid !== uuid)
    // setUsers(filteredUsers)
  }

  const handleReset = async () => {
    await refetch()
    // setUsers(originalUsers.current)
  }

  // useEffect(() => {
  //   getUsers(currentPage)
  // }, [currentPage])


  const sortedUsers = useMemo(() => {

    if (sorting === SortBy.NONE) return filteredUsers;

    let sortFn = (a: User, b: User) => a.location.country.localeCompare(b.location.country)

    if (sorting === SortBy.NAME) {
      sortFn = (a: User, b: User) => a.name.first.localeCompare(b.name.first)
    }

    if (sorting === SortBy.LAST) {
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
          {sortedUsers.length > 0 &&
            <>
              <Results></Results>
              <UsersList handleChangeSort={handleChangeSort} deleteUser={handleDelete} showColor={showColor} users={sortedUsers} />
              {
                isLoading ? <p>Cargando ...</p> : hasNextPage ?
                  <button onClick={() => fetchNextPage()}> Cargar mas resultados </button> : null
              }
            </>
          }
          {!isLoading && isError && <p>Ha habido un error</p>}
          {!isLoading && !isError && sortedUsers.length === 0 && <p>No hay usuarios</p>}

        </main>
      </div>
    </>
  )
}

export default App
