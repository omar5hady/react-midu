import { useCallback, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { error, search, updateSearch } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const handleSubmit = (event) => {
    event.preventDefault();
    // NO controlado
    // const {search} = Object.fromEntries( new window.FormData(event.target) )
    getMovies({ search });
  };

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300)
    , [getMovies]
  );

  const handleChange = (event) => {
    const newsearch = event.target.value;
    updateSearch(newsearch);
    debouncedGetMovies(newsearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            name="search"
            placeholder="Avengers, Star Wars, Transformers..."
          ></input>
          <input type="checkbox" onChange={handleSort} checked={sort}></input>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
