import React from 'react';
import {useLocation} from 'react-router-dom';

function MoviesCard({movie}) {
    const location = useLocation();
    const isSavedMoviesRoute = location.pathname === '/saved-movies';
    const hour = Math.floor(movie.duration / 60);
    const minutes = movie.duration % 60;
    return(
        <li className='card'>
            <div className='card__img'></div>
            <div className='card__description'>
                <h3 className='card__title'>{movie.name}</h3>
                {!isSavedMoviesRoute && (<button type="button" aria-label="Лайк" className={`card__btn card__like-btn ${movie.owner===true && 'card__like-btn_active'}`}></button>)}
                {isSavedMoviesRoute && (<button type="button" aria-label="Удалить" className={`card__btn card__delete-btn`}></button>)}
            </div>
            <p className='card__film-duration'>{hour}ч{minutes}м</p>
        </li>
    );
}

export default MoviesCard;