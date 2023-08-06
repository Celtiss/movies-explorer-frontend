import React from 'react';

function FilterCheckbox({ searchCheckbox, handleSearchCheckbox }) {
  const handleChange = (event) => {
    const isChecked = event.target.checked;
    handleSearchCheckbox(isChecked);
  };

  return (
    <div className='search__checkbox-container'>
      <label className="search__checkbox">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={searchCheckbox}
          className="search__checkbox-input"
        />
        <span className="search__slider"></span>
      </label>
      <p className='search__checkbox-text'>Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
