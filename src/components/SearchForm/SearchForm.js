import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return(
        <section className='section search'>
            <form className='search__form'>
                <div className='search__container'>
                    <input type="text" placeholder='Фильм' className='search__input' required minLength="2" maxLength="40" ></input>
                    <button type="submit" className='search__btn'>Поиск</button>
                </div>
                <FilterCheckbox />
            </form>
        </section>
    );
}

export default SearchForm;