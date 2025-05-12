import React, { useEffect, useState } from 'react';

function WatchList({ watchList, handleRemoveFromWatchList , setWatchList}) {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');  

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterByGenre = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre(''); 
    } else {
      setSelectedGenre(genre);
    }
  };

  const getUniqueGenres = () => {
    let genres = [];
    watchList.forEach((movie) => {
      const movieGenres = movie.Genre.split(', '); 
      movieGenres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });
    return genres;
  };

  const sortInc = () => {
    const sortedInc = [...watchList].sort((movieA, movieB) => movieA.imdbRating - movieB.imdbRating);
    setWatchList(sortedInc);
  };

  const sortDec = () => {
    const sortedDec = [...watchList].sort((movieA, movieB) => movieB.imdbRating - movieA.imdbRating);
    setWatchList(sortedDec);
  };

  const filteredMovies = watchList.filter((movieObj) => {
    const genreMatches = selectedGenre ? movieObj.Genre.toLowerCase().includes(selectedGenre.toLowerCase()) : true;
    const searchMatches = movieObj.Title.toLowerCase().includes(search.toLowerCase());
    return genreMatches && searchMatches;
  });

  return (
    <>

      <div className="flex justify-center flex-wrap m-4">
        {getUniqueGenres().map((genre, index) => (
          <div
            key={index}
            onClick={() => filterByGenre(genre)} 
            className={`flex justify-center items-center h-[3rem] w-[9rem] rounded-xl text-white font-bold m-4 cursor-pointer ${selectedGenre === genre ? 'bg-blue-400' : 'bg-gray-400/50'}`}
          >
            {genre}
          </div>
        ))}
      </div>

      <div className='flex justify-center my-4'>
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search for movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>

      <div className='rounded-lg overflow-hidden border border-gray-200 m-8'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Name</th>
              <th className='flex justify-center'>
                <button onClick={sortInc} className='p-2 bg-gray-900/20'>
                  <i className="fa-solid fa-arrow-up"></i>
                </button>
                <div className='p-2'>Rating</div>
                <button onClick={sortDec} className='p-2 bg-gray-900/20'>
                  <i className="fa-solid fa-arrow-down"></i>
                </button>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movieObj) => (
              <tr key={movieObj.imdbID} className='border-b-2'>
                <td className='flex items-center px-6 py-4'>
                  <img src={movieObj.Poster} alt={movieObj.Title} className='h-[6rem] w-[10rem]' />
                  <div className='mx-10'>{movieObj.Title}</div>
                </td>
                <td>{movieObj.imdbRating}</td>
                <td>{movieObj.imdbVotes}</td>
                <td>
                  {movieObj.Genre?.split(', ').map((genre) => (
                    <span key={genre} className='inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 text-sm m-1'>
                      {genre}
                    </span>
                  ))}
                </td>
                <td
                  className='text-red-800 font-bold cursor-pointer'
                  onClick={() => handleRemoveFromWatchList(movieObj)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
