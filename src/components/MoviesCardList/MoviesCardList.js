import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, savedMovies, handleClickMovie, handleDeleteCard }) {
  const location = useLocation();
  const isSavedMoviesRoute = location.pathname === '/saved-movies';

  // Список отображаемых на странице фильмов
  const [visibleMovies, setVisibleMovies] = useState([]);

  // Количество отображаемых фильмов
  const [moviesToShow, setMoviesToShow] = useState(16);

  // Отображать фильмы при нажатии на кнопку "Еще"
  const addMoviesOnPage = () => {
    const newMoviesToShow = moviesToShow + 16;
    setMoviesToShow(newMoviesToShow);
  };

  // Сохранить первые N фильмов в localstorage, чтобы они отображались даже при перезагрузке
  useEffect(() => {
    const storedMoviesToShow = localStorage.getItem('moviesToShow');
    if (storedMoviesToShow) {
      setMoviesToShow(parseInt(storedMoviesToShow));
    }
  }, []);
  
  // Следить за количеством отображаемых фильмов
  useEffect(() => {
    const visibleMoviesSlice = movies.slice(0, moviesToShow);
    setVisibleMovies(visibleMoviesSlice);
    // Сохранить первые N фильмов в localstorage, чтобы они отображались даже при перезагрузке
    localStorage.setItem('moviesToShow', moviesToShow.toString());
  }, [moviesToShow, movies]);
  // console.log(movies);

  return (
    <section className='section movies-list'>
      <ul className='movies-list__container'>
        {visibleMovies.map((movie) => (
          <MoviesCard key={movie.id ? movie.id : movie.movieId} movie={movie} savedMovies={savedMovies} handleClickMovie={handleClickMovie} handleDeleteCard={handleDeleteCard} />
        ))}
      </ul>
      {!isSavedMoviesRoute && (
        <button type='button' className='movies-list__btn-more' onClick={addMoviesOnPage}>
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
