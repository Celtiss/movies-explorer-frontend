import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return(
        <section className='section search'>
            <form className='search__form'>
                <input type="text" placeholder='Фильм' className='search__input'></input>
                <button type="button" className='search__btn'>Поиск</button>
            </form>
            <FilterCheckbox />
        </section>
    );
}

export default SearchForm;