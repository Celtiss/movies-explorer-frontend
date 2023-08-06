import React, {useState} from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
    function handleSubmitSearch(e) {
        e.preventDefault();
        props.handleSubmit();
    }
    return(
        <section className='section search'>
            <form className='search__form' onSubmit={handleSubmitSearch}>
                {props.children}
                <FilterCheckbox searchCheckbox={props.searchCheckbox} handleSearchCheckbox={props.handleSearchCheckbox} />
            </form>
        </section>
    );
}

export default SearchForm;