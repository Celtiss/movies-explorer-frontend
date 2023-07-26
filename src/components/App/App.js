import {Routes, Route, useLocation} from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PopupWithMenu from '../PopupWithMenu/PopupWithMenu';
import Preloader from '../Preloader/Preloader';
import movies from '../../utils/constants';

function App() {
  // Чтобы footer не отображался в этих роутах
  const location = useLocation();
  const isMainRoute = location.pathname === '/';
  const isMoviesRoute = location.pathname === '/movies';
  const isSavedMoviesRoute = location.pathname === '/saved-movies';

  // Состояния
  const [isEditProfile, setEditProfile] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: 'Виталий', email: 'pochta@yandex.ru'});
  const [isMenuPopupOpen, setMenuPopupState] = useState(false);

  let savedMovies = [];

  savedMovies = movies.filter((movie) => {
    return movie.owner === true;
  });

  console.log(savedMovies);

  function handleBurgerMenuClick() {
    setMenuPopupState(true);
  }

  function handleBurgerMenuClose() {
    isMenuPopupOpen && setMenuPopupState(false);
  }

  function handleEditProfile () {
    setEditProfile(true);
  }

   //Изменение профиля
   function handleUpdateUser(userData) {
    setCurrentUser(userData);
    setEditProfile(false);
}

  return (
    <div className='page'>
        <div className='page__content'>
            <Header onBurgerMenu={handleBurgerMenuClick} />
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/movies' element={<Movies movies={movies} />} />
              <Route path='/saved-movies' element={<SavedMovies savedMovies={savedMovies} />} />
              <Route path='/profile' element={<Profile user={currentUser} isEdit={isEditProfile} onEditProfile={handleEditProfile} onUpdateUser={handleUpdateUser} />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/signin' element={<Login />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            {(isMainRoute || isMoviesRoute || isSavedMoviesRoute) && <Footer />}
            <PopupWithMenu isOpen={isMenuPopupOpen} onClose={handleBurgerMenuClose} />
            {/* <Preloader /> */}
        </div>
    </div>
  );
}

export default App;
