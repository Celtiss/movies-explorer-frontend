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
  const [isPreloader, setPreloader] = useState(false);
  const [moviesApiErr, setMoviesApiErr] = useState('');
  const [bestfilmErr, setBestfilmErr] = useState('');

  const errorMessageApi = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

  //Получаем данные пользователя и фильмы с сервера получаем только один раз в самом начале
  useEffect(() => {
    if(loggedIn===true) {
        Promise.all([mainApi.getSavedMovies(), mainApi.getUserInfo()])
        .then(([savedMovies, userData]) => {
            setCurrentUser(userData);
            setSavedMovies(savedMovies);
            setIsSavedMovies(true);
        })
        .catch((err) => { //попадаем сюда если один из промисов завершаться ошибкой
          console.log(err);
          setMoviesApiErr(errorMessageApi);
        })
        // Если это не первичный вход пользователя, то не надо делать запрос за фильмами
        if(!localStorage.getItem('localMovies')){
          setPreloader(true);
          moviesApi.getMovies()
          .then((allMovies) => {
            localStorage.setItem('localMovies', JSON.stringify(allMovies));
          })
          .catch((err) => setBestfilmErr(errorMessageApi));
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
    mainApi.updateUserInfo(userData.name, userData.email)
    .then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      setEditProfile(false);
    })
    .catch((err) => console.log(err));
  }

  //----------------------------------------------------------------------------------------

  // Рендер найденных карточек при перезагрузке страницы
  useEffect(() => {
    const localcheckbox = JSON.parse(localStorage.getItem('checkbox')) || false;
    setSearchMainCheckbox(localcheckbox);
    isSavedMovies && findMoviesByKeywords();
  }, [isSavedMovies]);

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
    setPreloader(false);
    localStorage.setItem('keywords', keywords);
    findMoviesByKeywords();
  }

  // Поиск фильмов по ключевым словам
  function findMoviesByKeywords() {
    const keywords = localStorage.getItem('keywords') || '';
    const localMovies = JSON.parse(localStorage.getItem('localMovies')) || [];
    const localcheckbox = JSON.parse(localStorage.getItem('checkbox')) || false;
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
    const updatedMovies = filteredSavedMovies.map((movie) => {
      return {
        ...movie,
        isLiked: true,
      };
    });
    setRenderedSavedMovies(updatedMovies);
  }, [filteredSavedMovies]);

  // Динамичный чекбокс страницы с сохраненными фильмами
  useEffect(() => {
    handleSearchSavedFilm('');
  }, [searchSavedMoviesCheckbox]);

  // Установить текущее значение чекбокса в стейт
  function handleSearchSavedCheckbox(checkboxValue) {
    setSearchSavedMoviesCheckbox(checkboxValue);
  }

  // Установить ключевые слова в локальное хранилищеы
  function handleSearchSavedFilm(keywords) {
    findSavedMoviesByKeywords(keywords);
  }

  // Поиск фильмов по ключевым словам
  function findSavedMoviesByKeywords(keywords) {
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

  // -----------------------------------------------------------------------------------------------------

  function handleClickMovie(movie) {
    // Лайкнут ли фильм?
    const isLiked = movie.isLiked;
    if (isLiked === false) {
      mainApi.saveMovie(movie)
      .then((newMovie) => {
        const updatedMovies = renderedMovies.map((movie) => {
          return movie.id === newMovie.movieId ? { ...movie, isLiked: true, _id: newMovie._id } : movie
        });
        console.log(updatedMovies);
        setRenderedMovies(updatedMovies);
        setSavedMovies([...savedMovies, newMovie]);
      })
    } else if (isLiked === true) {
      mainApi.deleteMovie(movie._id)
      .then(() => {
        const updatedMovies = renderedMovies.map((rendMovie) => {
          return rendMovie.id === movie.id ? { ...rendMovie, isLiked: false } : rendMovie;
        }
        );
        setRenderedMovies(updatedMovies);
        setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
      })
      .catch((err) => console.log(err));
    }
  }

  function handleDeleteMovie(movie) {
    const isLiked = movie.isLiked;
    if (isLiked === true) {
      mainApi.deleteMovie(movie._id)
      .then(() => {
        const updatedMovies = renderedMovies.map((rendMovie) => {
          return rendMovie.id === movie.movieId ? { ...rendMovie, isLiked: false } : rendMovie;
        }
        );
        setRenderedMovies(updatedMovies);
        setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
      })
      .catch((err) => console.log(err));
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
            isPreloader={isPreloader}
            message ={bestfilmErr}
            handleSearchMainFilm={handleSearchMainFilm}
            handleSearchMainCheckbox={handleSearchMainCheckbox}
            searchMainCheckbox={searchMainCheckbox}
            handleClickMovie={handleClickMovie}
             />} />
            
            <Route path='/saved-movies' element=
            {<ProtectedRoute 
            element={SavedMovies} 
            loggedIn={loggedIn} 
            movies={renderedSavedMovies}
            message={moviesApiErr}
            handleSearchSavedFilm={handleSearchSavedFilm}
            handleSearchSavedCheckbox={handleSearchSavedCheckbox}
            handleDeleteMovie={handleDeleteMovie}
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
