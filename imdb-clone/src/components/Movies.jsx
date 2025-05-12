import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ handleAddToWatchList, handleRemoveFromWatchList, watchList }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("avengers"); 
  const [query, setQuery] = useState("avengers"); 

  const fetchMovies = async (term, pageNum) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?s=${term}&page=${pageNum}&apikey=ba7eaf01`
      );
      if (res.data.Response === "True") {
        const searchResults = res.data.Search;
        const detailedMovies = await Promise.all(
          searchResults.map(async (movie) => {
            const detailRes = await axios.get(
              `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=ba7eaf01`
            );
            return detailRes.data;
          })
        );
        setMovies(detailedMovies);
        setTotalResults(parseInt(res.data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm, page);
  }, [searchTerm, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    setPage(1); 
  };

  return (
    <div className="p-5">
      <form className="text-center mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="px-4 py-2 w-[250px] border rounded-l-md"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="text-2xl m-5 font-bold text-center">
        Results for "{searchTerm}"
      </div>

      <div className="flex flex-row flex-wrap justify-around m-4">
        {movies.length > 0 ? (
          movies.map((movieObj) => (
            <MovieCard
              key={movieObj.imdbID}
              movie={movieObj}
              movieObj={movieObj}
              handleAddToWatchList={handleAddToWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchList={watchList}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>

      {totalResults > 10 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(totalResults / 10)}
        />
      )}
    </div>
  );
}

export default Movies;
