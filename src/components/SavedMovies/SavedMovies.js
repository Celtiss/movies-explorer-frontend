import React, {useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies(props) {
    const [formValue, setFormValue] = useState({
        search: ''
    });

    useEffect(() => {
        localStorage.removeItem('savedKeywords');
        props.handleSearchSavedCheckbox(false);
        props.handleSearchSavedFilm('');
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
        ...formValue,
        [name]: value
        });
    }

    const handleSubmit = () => {
        const { search } = formValue;
        props.handleSearchSavedFilm(search);
    }

    return(
        <main className='content'>
            <SearchForm handleSubmit={handleSubmit} searchCheckbox={props.searchCheckbox}  handleSearchCheckbox={props.handleSearchSavedCheckbox}>
                <div className='search__container'>
                    <input type="text" name='search' onChange={handleChange} value={formValue.search || ''} placeholder='Фильм' className='search__input' required minLength="2" maxLength="40" ></input>
                    <button type="submit" className='search__btn'>Поиск</button>
                </div> 
            </SearchForm>
            <MoviesCardList movies={props.movies} errorMessage={props.message} handleClickMovie={props.handleClickMovie} />
        </main>
    );
}

export default SavedMovies;