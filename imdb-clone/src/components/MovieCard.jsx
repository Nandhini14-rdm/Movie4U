import React from "react";

function MovieCard({ movie, movieObj, handleAddToWatchList, handleRemoveFromWatchList, watchList }) {
  function doesContain(movieObj) {
    return watchList.some((m) => m.imdbID === movieObj.imdbID);
  }

  return (
    <div
      className="h-[50vh] w-[200px] bg-center bg-cover rounded-xl hover:scale-110 duration-300 hover:cursor-pointer flex flex-col justify-between items-end py-1 px-1 mb-8"
      style={{ backgroundImage: `url(${movie.Poster})` }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-center bg-cover bg-gray-800"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddToWatchList(movieObj)}
          className="m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-center bg-cover bg-gray-800"
        >
          &#10084;
        </div>
      )}

      <div className="text-white text-sm p-2 w-full bg-black bg-opacity-60 text-center">
        <h2 className="text-lg font-bold">{movie.Title}</h2>
        <p>⭐ {movie.imdbRating} | ❤️ {movie.imdbVotes}</p>
        <p className="italic">{movie.Genre}</p>
      </div>
    </div>
  );
}

export default MovieCard;
