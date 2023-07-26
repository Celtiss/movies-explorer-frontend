import React from 'react';
import MoviesCard from  '../MoviesCard/MoviesCard';

function MoviesCardList({movies}) {
    return(
        <section className='section movies-list'>
            <ul className='movies-list__container'>
            {movies.map((movie) => (<MoviesCard key={movie._id} movie = {movie} />))}
            </ul>
            <button className='movies-list__btn-more'>Еще</button>
        </section>
    );
}

export default MoviesCardList;