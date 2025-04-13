import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios';
import Pagination from './Pagination';

function Movies({handleAddToWatchlist, handleRemoveFromWatchlist, watchlist}) {

  const [movies, setMovies] = useState([])
  const [pageNo, setPageNo] = useState(1)

  const handlePrev = () => {
    if (pageNo == 1) {
      setPageNo(1)
    } else {
      setPageNo(pageNo - 1)
    }
  }

  const handleNext = () => {
    setPageNo(pageNo + 1)
  }

  useEffect (() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1c66aab3682c7d6e6ded07507257f349&language=en-US&page=${pageNo}`).then(function(res){
      setMovies(res.data.results)
    })
  }, [pageNo])
  return (
    <div>
      <div className='text-2xl m-5p font-bold text-center py-8'>
        Trending movies
      </div>
      <div className='flex flex-row flex-wrap justify-around gap-8'>
        {movies.map((movieObj)=>{
          return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_title} handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} watchlist={watchlist}/>
        })}
      </div>
      <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext} />
    </div>
  )
}

export default Movies