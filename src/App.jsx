import React, { useEffect, useState } from 'react'

import Navbar from './components/Navbar';
import Movies from './components/Movies';
import Banner from './components/Banner';
import WatchList from './components/WatchList';
import {BrowserRouter, Routes, Route} from 'react-router'

function App() {
  let [watchlist, setWatchlist] = useState([])

  let handleAddToWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj]
    localStorage.setItem('moviesApp', JSON.stringify(newWatchList))
    setWatchlist(newWatchList)
  }

  let handleRemoveFromWatchlist = (movieObj) => {
    let filteredWatchlist = watchlist.filter((movie) => {
      return movie.id != movieObj.id
    })
    localStorage.setItem('moviesApp', JSON.stringify(filteredWatchlist))
    setWatchlist(filteredWatchlist)
  }

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if (! moviesFromLocalStorage) {
      return
    }
    setWatchlist(JSON.parse(moviesFromLocalStorage))
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<><Banner/><Movies handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist}/></>} />
          <Route path='/watchlist' element={<WatchList watchlist={watchlist} setWatchlist={setWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App