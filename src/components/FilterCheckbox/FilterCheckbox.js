import React from 'react';

function FilterCheckbox() {
    return(
        <div className='search__checkbox-container'>
            <label className="search__checkbox">
                <input type="checkbox" className="search__checkbox-input"></input>
                <span className="search__slider"></span>
            </label>
            <p className='search__checkbox-text'>Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;