import React, { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, errorMessage, handleClickMovie}) {
  
  const [visibleMovies, setVisibleMovies] = useState([]); // Список отображаемых на странице фильмов
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Состояние для размера окна
  const [moviesToShow, setMoviesToShow] = useState(16);// Количество отображаемых фильмов

  // Отображать фильмы при нажатии на кнопку "Еще"
  const addMoviesOnPage = () => {
    const newMoviesToShow = moviesToShow + moviesToShow;
    setMoviesToShow(newMoviesToShow);
  };

  // Установить размер окна в стейт каждый раз при изменении размера окна
  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
  
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  
  useEffect(() => {
    if (windowWidth >= 1280) {
      setMoviesToShow(16);
    } else if (windowWidth >= 768) {
      setMoviesToShow(8);
    } else if (windowWidth >= 320 && windowWidth <= 480) {
      setMoviesToShow(5);
    }
  }, [windowWidth]);  

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
          <MoviesCard key={movie.id ? movie.id : movie.movieId} movie={movie} handleClickMovie={handleClickMovie} />
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
