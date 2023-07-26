import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({movies}) {
    return(
        <main className='content'>
            <SearchForm />
            <MoviesCardList movies={movies} />
        </main>
    );
}

export default Movies;