import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({savedMovies}) {
    return(
        <main className='content'>
            <SearchForm />
            <MoviesCardList movies={savedMovies} />
        </main>
    );
}

export default Movies;