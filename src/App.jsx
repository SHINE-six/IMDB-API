import react, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './assets/search.svg'
import MovieCard from './components/MovieCard';


// d97c1638
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=d97c1638'

const App = () => {
  //variable
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //function
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  const handleChanges = (e) => {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    searchMovies('batman');
  }, [])


  //JSX elements
  return (
    <div className='app'>
      <h1 style={{ fontSize: '5rem', fontWeight: '900'}}>MovieSea</h1>

      <div className='search'>
        <input 
          type="text" 
          value={searchTerm}
          placeholder='Search Movie title'
          onChange={handleChanges}/>
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => searchMovies(searchTerm)}  
        />
      </div>

      {movies.length > 0 ? (
        <div className='movies'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App
