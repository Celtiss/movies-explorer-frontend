import React from 'react';
import {useLocation} from 'react-router-dom';
import MoviesCard from  '../MoviesCard/MoviesCard';

function MoviesCardList({movies}) {
    const location = useLocation();
    const isSavedMoviesRoute = location.pathname === '/saved-movies';
    return(
        <section className='section movies-list'>
            <ul className='movies-list__container'>
            {movies.map((movie) => (<MoviesCard key={movie._id} movie = {movie} />))}
            </ul>
            {!isSavedMoviesRoute && (<button className='movies-list__btn-more'>Еще</button>)}
        </section>
    );
}

export default MoviesCardList;