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
  // const [currentUser, setCurrentUser] = useState({name: 'Виталий', email: 'pochta@yandex.ru'});
  const [isMenuPopupOpen, setMenuPopupState] = useState(false);
  const [movies, setMovies] = useState([]); // отфильтрованные по поиску фильмы
  const [renderedMovies, setRenderedMovies] = useState([]);
  const [renderedSavedMovies, setRenderedSavedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesKeywords, setSavedMoviesKeywords] = useState('');
  const [searchMainCheckbox, setSearchMainCheckbox] = useState(false);
  const [searchSavedMoviesCheckbox, setSearchSavedMoviesCheckbox] = useState(false);
  const [isSavedMovies, setIsSavedMovies] = useState(false);
  const localMovies = JSON.parse(localStorage.getItem('localMovies')) || [];
  const localSavedMovies = JSON.parse(localStorage.getItem('localSavedMovies')) || [];
  // const localMainCheckbox = localStorage.getItem('checkbox');

  //Получаем данные пользователя и фильмы с сервера
  useEffect(() => {
    if(loggedIn===true) {
        Promise.all([moviesApi.getMovies(), mainApi.getSavedMovies(), mainApi.getUserInfo()])
        .then(([movies, savedMovies, userData]) => {
            setIsSavedMovies(true);
            setCurrentUser(userData);
            // setMovies(movies);
            setSavedMovies(savedMovies);
            ShowSavedMovies();
            localStorage.setItem('localMovies', JSON.stringify(movies));
            localStorage.setItem('localSavedMovies', JSON.stringify(savedMovies));
        })
        .catch((err) => { //попадаем сюда если один из промисов завершаться ошибкой
            console.log(err);
        })
    }
}, [loggedIn]);

useEffect(() => {
  setRenderedSavedMovies(savedMovies);
  setRenderedMovies(movies);
}, [isSavedMovies, savedMovies, movies])

useEffect(() => {
  checkToken();
},[])

  function ShowSavedMovies() {
    const updateMovies = savedMovies.map((movie) => {
      return {
        ...movie,
        isLiked: true,
      };
    })
    setSavedMovies(updateMovies);
  }

  // useEffect(() => {
  //   handleLikeMovie();
  // }, [savedMovies, searchCheckbox]);

  // function handleLikeMovie() {
  //   const updateMovies = movies.map((movie) => {
  //     const isLiked = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  //     const savedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  //     return {
  //       ...movie,
  //       isLiked,
  //       _id: savedMovie ? savedMovie._id : null,
  //     };
  //   })
  //   setRenderedMovies(updateMovies);
  // }

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

 function handleClickMovie(movie) {
  //Лайкнут ли фильм?
  const isLiked = movie.isLiked;
  // Если нет, то добавляем фильм в избранное
  if (isLiked === false && isLiked!=null) {
    console.log(movie);
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        const updatedMovies = movies.map((m) => {
          console.log('movies',m.id, 'current movie',movie);
          return m.id === movie.id ? { ...m, isLiked: true, _id: newMovie._id } : m
        }
          
        );
        newMovie.isLiked = true;
        setMovies(updatedMovies);
        setSavedMovies([...savedMovies, newMovie]);
      })
      .catch((err) => console.log(err));
  } else if(isLiked===true) {
    handleDeleteCard(movie);
    // Если фильм уже в избранном, то удаляем его
  } else {
    console.log('что то пошло не так');
    console.log(movie);
  }
 }

 function handleDeleteCard(movie) {
  console.log(movie);
  mainApi
  .deleteMovie(movie._id)
  .then(() => {
    const updatedMovies = movies.map((m) => {
      return m.id === movie.movieId ? { ...m, isLiked: false } : m;
    }
    );
    setMovies(updatedMovies);
    setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== movie._id));
  })
  .catch((err) => console.log(err));
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

  // Установить текущее значение чекбокса в стейт и в localStorage
   function handleSearchMainCheckbox(agreement) {
    localStorage.setItem('checkbox', JSON.stringify(agreement));
    setSearchMainCheckbox(agreement);
   }

   function handleSearchSavedMoviesCheckbox(agreement) {
    setSearchSavedMoviesCheckbox(agreement);
   }

  // Показывать фильмы по тому же ключевым словам и чекбоксу из localStorage в случае перезагрузки страницы
  useEffect(() => {
    handleFilterMainFilm();
    let localCheckbox = JSON.parse(localStorage.getItem('checkbox'));
    setSearchMainCheckbox(localCheckbox);
    const localKeyWords = localStorage.getItem('keyWords');
    handleSearchMainFilm(localKeyWords);
  }, []);

  // Динамичный фильтр по чекбоксу
  useEffect(() => {
    handleFilterMainFilm();
  }, [searchMainCheckbox]);

  useEffect(() => {
    handleFilterSavedFilm(localSavedMovies, savedMoviesKeywords );
  }, [searchSavedMoviesCheckbox])

  // Установить ключевые слова в локальное хранилищеы
  function handleSearchMainFilm(keyWords) {
    localStorage.setItem('keyWords', keyWords);
    handleFilterMainFilm();
  }

  function handleSearchSavedFilm(keyWords) {
    setSavedMoviesKeywords(keyWords);
    handleFilterSavedFilm(savedMovies, keyWords);
  }

  // Задать свойство isLiked для фильмов
  function handleLikeMovie(moviesLikedSetting) {
    const updateMovies = moviesLikedSetting.map((movie) => {
      const isLiked = localSavedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
      const savedMovie = localSavedMovies.find((savedMovie) => {
        return savedMovie.movieId === movie.id;
      });
      return {
        ...movie,
        isLiked,
        _id: savedMovie ? savedMovie._id : null,
      };
    });
    return updateMovies;
  }

  // Отфильтровать фильмы по ключевым словам поиска
  function FilterMovies(movies, keyWords) {
    let filteredMovies = movies.filter((movie) => {
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      const searchWords = keyWords.split(' ');
      return searchWords.some((word) => {
        const lowerKeyWord = word.toLowerCase();
        return nameENLowerCase.includes(lowerKeyWord) || nameRULowerCase.includes(lowerKeyWord);
      })
    });
    return handleLikeMovie(filteredMovies);
  }

  // Отфильтровать фильмы по ключевым словам поиска
  function FilterSavedMovies(movies, keyWords) {
    return movies.filter((movie) => {
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      const searchWords = keyWords.split(' ');
      return searchWords.some((word) => {
        const lowerKeyWord = word.toLowerCase();
        return nameENLowerCase.includes(lowerKeyWord) || nameRULowerCase.includes(lowerKeyWord);
      })
    });
    // return handleLikeMovie(filteredMovies);
  }

  // Поиск среди фильмов по ключевым словам с учетом чекбокса
  function handleFilterMainFilm() {
    const localKeyWords = localStorage.getItem('keyWords');
    let filteredMovies = FilterMovies(localMovies, localKeyWords);
    if(searchMainCheckbox===true) {
      let checkedMovies = [];
      checkedMovies = filteredMovies.filter((m) => {
        return m.duration <= 40;
      })
      setMovies(checkedMovies);
    } else if(searchMainCheckbox===false){
      setMovies(filteredMovies);
    }
  }

  // Поиск сохраненных фильмов по ключевым словам с учетом чекбокса
  function handleFilterSavedFilm(movies, keyWords) {
    let filteredMovies = FilterSavedMovies( movies, keyWords);
    if(searchSavedMoviesCheckbox===true) {
      let checkedMovies = [];
      checkedMovies = filteredMovies.filter((m) => {
        return m.duration <= 40;
      })
      setSavedMovies(checkedMovies);
    } else if(searchSavedMoviesCheckbox===false){
      setSavedMovies(filteredMovies);
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
            savedMovies={savedMovies} 
            searchCheckbox={searchMainCheckbox}
            handleSearchCheckbox={handleSearchMainCheckbox} 
            handleSearchFilm={handleSearchMainFilm} 
            handleClickMovie={handleClickMovie} />} />
            
            <Route path='/saved-movies' element=
            {<ProtectedRoute 
            element={SavedMovies} 
            loggedIn={loggedIn} 
            searchCheckbox={searchSavedMoviesCheckbox}
            handleSearchCheckbox={handleSearchSavedMoviesCheckbox} 
            handleSearchFilm={handleSearchSavedFilm} 
            savedMovies={renderedSavedMovies} 
            handleDeleteCard={handleDeleteCard} />} />
            
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
