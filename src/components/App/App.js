import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from "../ProtectedRoute";
import * as auth from '../../auth.js';

function App() {
  // Чтобы footer не отображался в этих роутах
  const location = useLocation();
  const navigate = useNavigate();
  const isMainRoute = location.pathname === '/';
  const isMoviesRoute = location.pathname === '/movies';
  const isSavedMoviesRoute = location.pathname === '/saved-movies';

  //Проверка на авторизацию пользователя
  const [loggedIn, setLoggedIn] = useState(null);

  // Состояния
  const [currentUser, setCurrentUser] = useState({_id: '', email: '', name: ''});
  const [isEditProfile, setEditProfile] = useState(false);
  const [isMenuPopupOpen, setMenuPopupState] = useState(false);
  const [isSavedMovies, setIsSavedMovies] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [renderedSavedMovies, setRenderedSavedMovies] = useState([]);
  const [searchMainCheckbox, setSearchMainCheckbox] = useState(false);
  const [searchSavedMoviesCheckbox, setSearchSavedMoviesCheckbox] = useState(false);


  //Получаем данные пользователя и фильмы с сервера получаем только один раз в самом начале
  useEffect(() => {
    if(loggedIn===true) {
        Promise.all([mainApi.getSavedMovies(), mainApi.getUserInfo()])
        .then(([savedMovies, userData]) => {
            setIsSavedMovies(true);
            setCurrentUser(userData);
            setSavedMovies(savedMovies);
        })
        .catch((err) => { //попадаем сюда если один из промисов завершаться ошибкой
            console.log(err);
        })
        // Если это не первичный вход пользователя, то не надо делать запрос за фильмами
        if(!localStorage.getItem('localMovies')){
          moviesApi.getMovies()
          .then((allMovies) => {
            localStorage.setItem('localMovies', JSON.stringify(allMovies));
          })
        }
    }
  }, [loggedIn]);

  //----------------------------------------------------------------------------------------
  useEffect(() => {
    checkToken();
  },[])

  // Проверка токена при заходе на страницу
  function checkToken (){
    auth.checkToken().then((data) => {
        if(data){
            setLoggedIn(true);
            navigate("/movies", {replace:true});
        }
    }).catch((err) => {
        console.log(err);
    });
  }

  function handleUserLogOut() {
    auth.logOut().then(() => {
      navigate ('/', {replace:true});
      localStorage.clear();
  })
  .catch((err) => {
      console.log(err);
  })
  }

  // Установка статуса авторизации пользователя
  function handleLogin(status){
    setLoggedIn(status);
  }

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

  //----------------------------------------------------------------------------------------

  // Рендер найденных карточек при перезагрузке страницы
  useEffect(() => {
    const localcheckbox = JSON.parse(localStorage.getItem('checkbox')) || false;
    setSearchMainCheckbox(localcheckbox);
    findMoviesByKeywords();
  }, []);

  // Динамичный чекбокс главной страницы
  useEffect(() => {
    findMoviesByKeywords();
  }, [searchMainCheckbox]);

  // Установить текущее значение чекбокса в стейт и в localStorage
  function handleSearchMainCheckbox(checkboxValue) {
    setSearchMainCheckbox(checkboxValue);
    localStorage.setItem('checkbox', JSON.stringify(checkboxValue));
  }

  // Установить ключевые слова в локальное хранилищеы
  function handleSearchMainFilm(keywords) {
    localStorage.setItem('keywords', keywords);
    findMoviesByKeywords();
  }

  // Поиск фильмов по ключевым словам
  function findMoviesByKeywords() {
    const keywords = localStorage.getItem('keywords');
    const localMovies = JSON.parse(localStorage.getItem('localMovies')) || [];
    const localcheckbox = JSON.parse(localStorage.getItem('checkbox')) || false;
    console.log(localcheckbox);
    const foundMovies = localMovies.filter((movie) => {
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      const searchWords = keywords.split(' ');
      return searchWords.some((word) => {
        const lowerKeyWord = word.toLowerCase();
        return nameENLowerCase.includes(lowerKeyWord) || nameRULowerCase.includes(lowerKeyWord);
      })
    });
    if(localcheckbox === true) {
      let checkedMovies = [];
      checkedMovies = foundMovies.filter((m) => {
        return m.duration <= 40;
      })
      localStorage.setItem('localFoundMovies', JSON.stringify(checkedMovies));
    } else if(localcheckbox === false) {
      localStorage.setItem('localFoundMovies', JSON.stringify(foundMovies));
    }
    const localFoundMovies = JSON.parse(localStorage.getItem('localFoundMovies')) || [];
    const updatedMovies = localFoundMovies.map((movie) => {
      const isLiked = savedMovies.some((savMovie) => savMovie.movieId === movie.id);
      const savedMovie = savedMovies.find((savMovie) => savMovie.movieId === movie.id); // Получить _id фильма
      return {
        ...movie,
        isLiked,
        _id: savedMovie ? savedMovie._id : null,
      };
    });
    setRenderedMovies(updatedMovies);
  }

  // ------------------------------------------------------------------------------------------------
  // Отоброжаем сохраненные фильмы
  useEffect(() => {
    const updateMovies = savedMovies.map((movie) => {
      return {
        ...movie,
        isLiked: true,
      };
    });

    isSavedMovies && setRenderedSavedMovies(updateMovies);
  }, [isSavedMovies, savedMovies]);

  // При поиске по ключевым словам в savedMovies устанавливаем им свойство isLiked: true
  useEffect(() => {
    console.log(filteredSavedMovies);
    const updatedMovies = filteredSavedMovies.map((movie) => {
      return {
        ...movie,
        isLiked: true,
      };
    });
    setRenderedSavedMovies(updatedMovies);
  }, [filteredSavedMovies]);

  // Динамичный чекбокс главной страницы
  useEffect(() => {
    findSavedMoviesByKeywords();
  }, [searchSavedMoviesCheckbox]);

  // Установить текущее значение чекбокса в стейт и в localStorage
  function handleSearchSavedCheckbox(checkboxValue) {
    setSearchSavedMoviesCheckbox(checkboxValue);
  }

  // Установить ключевые слова в локальное хранилищеы
  function handleSearchSavedFilm(keywords) {
    localStorage.setItem('SavedMoviesKeywords', keywords);
    findSavedMoviesByKeywords();
  }

  // Поиск фильмов по ключевым словам
  function findSavedMoviesByKeywords() {
    const keywords = localStorage.getItem('SavedMoviesKeywords');
    const foundMovies = savedMovies.filter((movie) => {
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      const searchWords = keywords.split(' ');
      return searchWords.some((word) => {
        const lowerKeyWord = word.toLowerCase();
        return nameENLowerCase.includes(lowerKeyWord) || nameRULowerCase.includes(lowerKeyWord);
      })
    });
    if(searchSavedMoviesCheckbox === true) {
      let checkedMovies = [];
      checkedMovies = foundMovies.filter((m) => {
        return m.duration <= 40;
      })
      setFilteredSavedMovies(checkedMovies);
    } else if(searchSavedMoviesCheckbox === false) {
      setFilteredSavedMovies(foundMovies);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
          <Header onBurgerMenu={handleBurgerMenuClick} />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
            
            <Route path='/movies' element=
            {<ProtectedRoute
            element={Movies} 
            loggedIn={loggedIn} 
            movies={renderedMovies}
            handleSearchMainFilm={handleSearchMainFilm}
            handleSearchMainCheckbox={handleSearchMainCheckbox}
            searchMainCheckbox={searchMainCheckbox}
             />} />
            
            <Route path='/saved-movies' element=
            {<ProtectedRoute 
            element={SavedMovies} 
            loggedIn={loggedIn} 
            movies={renderedSavedMovies}
            handleSearchSavedFilm={handleSearchSavedFilm}
            handleSearchSavedCheckbox={handleSearchSavedCheckbox}
            />} />
            
            <Route path='/profile' element={<ProtectedRoute element={Profile} loggedIn={loggedIn} 
            isEdit={isEditProfile} 
            onEditProfile={handleEditProfile} 
            onUpdateUser={handleUpdateUser} 
            handleLogin={handleLogin} 
            handleUserLogOut={handleUserLogOut} />} />
            
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
          {(isMainRoute || isMoviesRoute || isSavedMoviesRoute) && <Footer />}
          <PopupWithMenu isOpen={isMenuPopupOpen} onClose={handleBurgerMenuClose} />
          {/* <Preloader /> */}
      </div>
    </CurrentUserContext.Provider>
  ); 
}

export default App;
