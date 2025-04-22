import { lazy, Suspense } from "react"
import Page404 from "./pages/404"
import SearchPage from "./pages/SearchPage"

import { Router } from "./Router"
import Route from "./Route"

const AboutPage = lazy(() => import('./pages/About.jsx'))
const HomePage = lazy(() => import('./pages/Home.jsx'))


const appRoutes = [
  {
    path: '/:lang/:about',
    Component: AboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]


function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage}/>
          <Route path='/about' Component={AboutPage}/>
        </Router>
      </Suspense>
    </main>
  )
}

export default App
