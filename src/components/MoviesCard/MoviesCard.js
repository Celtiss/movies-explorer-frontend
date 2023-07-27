import React from 'react';
import {useLocation} from 'react-router-dom';
import cardImg from '../../images/film-1.png';

function MoviesCard({movie}) {
    const location = useLocation();
    const isSavedMoviesRoute = location.pathname === '/saved-movies';
    const hour = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    return(
        <li className='card'>
            <img alt='фильм' src={cardImg} className='card__img'></img>
            <div className='card__description'>
                <h2 className='card__title'>{movie.name}</h2>
                {!isSavedMoviesRoute && (<button type="button" aria-label="Лайк" className={`card__btn card__like-btn ${movie.owner===true && 'card__like-btn_active'}`}></button>)}
                {isSavedMoviesRoute && (<button type="button" aria-label="Удалить" className={`card__btn card__delete-btn`}></button>)}
            </div>
            <p className='card__film-duration'>{hour}ч{minutes}м</p>
        </li>
    );
}

export default MoviesCard;