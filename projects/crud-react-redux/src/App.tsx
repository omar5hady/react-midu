import CreateNewUser from './components/CreateNewUser'
import { ListOfUsers } from './components/ListOfUsers'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <h1>Nuestro Proyecto con Redux</h1>
      <ListOfUsers/>
      <CreateNewUser/>
      <Toaster richColors/>
    </>
  )
}

export default App
