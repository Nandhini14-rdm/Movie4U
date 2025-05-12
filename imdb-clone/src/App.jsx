import "./App.css"

import Movies from "./components/Movies"
import Navbar from "./components/Navbar"
import WatchList from "./components/WatchList"
import Banner from "./components/Banner"

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useEffect, useState } from "react"

function App() {

  let [watchList, setWatchList] = useState([])
  

  let handleAddToWatchList = (movieObj) => {
    let newWtachList = [...watchList, movieObj]
    localStorage.setItem('moviesApp', JSON.stringify(newWtachList))
    setWatchList(newWtachList);
    console.log(newWtachList)
  }

  let handleRemoveFromWatchList = (movieObj) => {
  let filteredWatchList = watchList.filter((movie) => {
    return movie.imdbID !== movieObj.imdbID;  
  });
  setWatchList(filteredWatchList);
  localStorage.setItem('moviesApp', JSON.stringify(filteredWatchList));
  console.log(filteredWatchList);

}

  useEffect(()=>{
    let moviesFromStrg = localStorage.getItem('moviesApp');
    if(!moviesFromStrg){
      return;
    }
    setWatchList(JSON.parse(moviesFromStrg));
  }, [])

  return (
    <>

      <BrowserRouter>
      
        <Navbar/>
        <Routes>
          <Route path='/' element={<> <Banner/><Movies watchList={watchList} handleAddToWatchList={handleAddToWatchList}  handleRemoveFromWatchList={handleRemoveFromWatchList} /> </>}/>
          <Route path='/watchlist' element={<WatchList watchList={watchList} handleRemoveFromWatchList={handleRemoveFromWatchList} setWatchList={setWatchList} />}/>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
