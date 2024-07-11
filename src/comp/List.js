import { useEffect, useState } from "react";
import axios from "axios";
function List() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios(`https://www.omdbapi.com/?s=${query}&apikey=c3bc9fae`)
      .then((response) => {
        if (response.data.Search && response.data) {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      })
      .catch((e) => console.log(e));
  }, [query]);
  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };
  return (
    <div>
      <h1>Movie Master</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {movies.map((movie) => (
        <div key={movie.imdbID}>{movie.Title}</div>
      ))}
    </div>
  );
}

export default List;
