import { useEffect, useRef, useState } from "react"

export const useSearch = () => {
  const [ search, setSearch ] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
        isFirstInput.current = search === ''
        return
    }

    if(search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if(search.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un número')
    }

    setError(null)
      
  }, [search])

  const updateSearch = (newsearch) => {
    if(newsearch.startsWith(' ')) return
    setSearch(newsearch)
  }

  return { error, search, setSearch, updateSearch }
}