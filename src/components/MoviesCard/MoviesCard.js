import React from 'react';
import {useLocation} from 'react-router-dom';
import { currentUser } from '../../contexts/CurrentUserContext';

function MoviesCard({movie, handleClickMovie, handleDeleteMovie}) {
    const location = useLocation();
    const isSavedMoviesRoute = location.pathname === '/saved-movies';
    const hour = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    const cardLikeButtonClassName = ( 
        `card__btn card__like-btn ${movie.isLiked ? 'card__like-btn_active' : ''}` 
      );
    function handleLikeMovie(){
        handleClickMovie(movie);
    }
    function handleDeleteCard(){
        handleDeleteMovie(movie);
    }
    return(
        <li className='card'>
            <img alt={movie.name} src={movie.image.url ? `https://api.nomoreparties.co${movie.image.url}`: `${movie.image}`} className='card__img'></img>
            <div className='card__description'>
                <h2 className='card__title'>{movie.nameRU}</h2>
                {!isSavedMoviesRoute && (<button type="button" onClick={handleLikeMovie} aria-label="Сохранить" className={cardLikeButtonClassName}></button>)}
                {isSavedMoviesRoute && (<button type="button" onClick={handleDeleteCard} aria-label="Удалить" className={`card__btn card__delete-btn`}></button>)}
            </div>
            <p className='card__film-duration'>{hour}ч{minutes}м</p>
        </li>
    );
}
export default MoviesCard;