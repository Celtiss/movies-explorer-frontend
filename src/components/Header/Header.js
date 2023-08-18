import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainHeader from './MainHeader/MainHeader';
import MoviesHeader from './MoviesHeader/MoviesHeader';

function Header({onBurgerMenu}) {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return(
            <Routes>
                <Route path="/" element={storedLoggedIn? <MoviesHeader onBurgerMenu={onBurgerMenu} /> : <MainHeader />} />
                <Route path="/movies" element={<MoviesHeader onBurgerMenu={onBurgerMenu} />} />
                <Route path="/saved-movies" element={<MoviesHeader onBurgerMenu={onBurgerMenu} />} />
                <Route path="/profile" element={<MoviesHeader onBurgerMenu={onBurgerMenu} />} />
            </Routes>
    );
}

export default Header;