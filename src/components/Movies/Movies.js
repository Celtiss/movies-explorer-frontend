import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({loggedIn, movies, searchMainCheckbox, handleSearchMainFilm, handleSearchMainCheckbox, handleClickMovie}) {
    const searchText = localStorage.getItem('keywords');
    const [formValue, setFormValue] = useState({
        search: searchText
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
        ...formValue,
        [name]: value
        });
    }
    const handleSubmit = () => {
        const { search } = formValue;
        handleSearchMainFilm(search);
    }

    return(
        <main className='content'>
            <SearchForm handleSubmit={handleSubmit} handleSearchCheckbox={handleSearchMainCheckbox} searchCheckbox={searchMainCheckbox} >
                <div className='search__container'>
                    <input type="text" name='search' onChange={handleChange} value={formValue.search || ''} placeholder='Фильм' className='search__input' required minLength="2" maxLength="40" ></input>
                    <button type="submit" className='search__btn'>Поиск</button>
                </div>
            </SearchForm>
            <MoviesCardList movies={movies} handleClickMovie={handleClickMovie} />
        </main>
    );
}

export default Movies;