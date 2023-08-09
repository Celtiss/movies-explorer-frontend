import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, errorMessage, handleClickMovie, handleDeleteMovie}) {
  // Список отображаемых на странице фильмов
  const [visibleMovies, setVisibleMovies] = useState([]);

  // Количество отображаемых фильмов
  const [moviesToShow, setMoviesToShow] = useState(16); // Изменили начальное значение на 16

  // Отображать фильмы при нажатии на кнопку "Еще"
  const addMoviesOnPage = () => {
    const newMoviesToShow = moviesToShow + 16;
    setMoviesToShow(newMoviesToShow);
  };

  // Следить за количеством отображаемых фильмов
  useEffect(() => {
    const visibleMoviesSlice = movies.slice(0, moviesToShow);
    setVisibleMovies(visibleMoviesSlice);
  }, [moviesToShow, movies]);


  return (
  <section className='section movies-list'>
    {errorMessage ?
      <p className='movies-list__err-message'>{errorMessage}</p> :
      movies.length === 0 ?
      <p className='movies-list__err-message'>Ничего не найдено</p> :
      <ul className='movies-list__container'>
        {visibleMovies.map((movie) => (
          <MoviesCard key={movie.id ? movie.id : movie.movieId} movie={movie} handleClickMovie={handleClickMovie} handleDeleteMovie={handleDeleteMovie} />
        ))}
      </ul>}
      {visibleMovies.length < movies.length && (
        <button type='button' className='movies-list__btn-more' onClick={addMoviesOnPage}>
          Еще
        </button>
      )}
  </section>
  );
}

export default MoviesCardList;
