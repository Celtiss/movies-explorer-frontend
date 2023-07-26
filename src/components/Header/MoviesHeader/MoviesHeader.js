import {NavLink} from 'react-router-dom';

function MoviesHeader({onBurgerMenu}) {
    return (
        <header className=" header header_type_movies"> 
            <NavLink to="/" className="header__logo"></NavLink>
            <nav className='header__nav'>
                <div className="header__nav-movies">
                    <NavLink to="/movies" className="header__link header__link_active header__link_type_movies">Фильмы</NavLink>
                    <NavLink to="/saved-movies" className="header__link header__link_type_saved-movies">Сохраненные фильмы</NavLink>
                </div>
                <NavLink to="/profile" className="header__link header__link_type_profile">
                    <p className='header__profile-text'>Аккаунт</p>
                    <div className='header__profile-icon'></div>
                </NavLink>
            </nav>
            <button type='button' className='header__menu-btn' onClick={onBurgerMenu}>
                <div className='header__menu-icon'></div>
                <div className='header__menu-icon'></div>
                <div className='header__menu-icon'></div>
            </button>
        </header>
    );
  }
  
  export default MoviesHeader;