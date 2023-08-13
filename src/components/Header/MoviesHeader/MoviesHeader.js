import {NavLink, useLocation} from 'react-router-dom';

function MoviesHeader({onBurgerMenu}) {
    const location = useLocation();
    const isMainRoute = location.pathname === '/';
    return (
        <header className={`header header_type_movies ${isMainRoute && 'header_color_grey'}`}> 
            <NavLink to="/" className="header__logo"></NavLink>
            <nav className='header__nav'>
                <div className="header__nav-movies">
                    <NavLink to="/movies" className="header__link header__link_type_movies">Фильмы</NavLink>
                    <NavLink to="/saved-movies" className="header__link header__link_type_saved-movies">Сохраненные фильмы</NavLink>
                </div>
                <NavLink to="/profile" className="user-account">
                    <p className='user-account__text'>Аккаунт</p>
                    <div className='user-account-icon'></div>
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