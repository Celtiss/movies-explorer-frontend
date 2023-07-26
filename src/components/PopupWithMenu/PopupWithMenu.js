import {NavLink, useLocation} from 'react-router-dom';
function PopupWithMenu({isOpen, onClose}){
    const location = useLocation();
    const isMainRoute = location.pathname === '/';
    const isMoviesRoute = location.pathname === '/movies';
    const isSavedMoviesRoute = location.pathname === '/saved-movies';
    return (
        <section className={`menu ${isOpen && 'menu_open'}`}>
            <div className='menu__container'>
                <button className="menu__close" onClick={onClose}></button>
                <nav className="menu__navigation">
                    <NavLink to="/" className={`menu__link ${isMainRoute && 'menu__link_active'}`} onClick={onClose}>Главная</NavLink>
                    <NavLink to="/movies" className={`menu__link ${isMoviesRoute && 'menu__link_active'}`} onClick={onClose}>Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={`menu__link ${isSavedMoviesRoute && 'menu__link_active'}`} onClick={onClose}>Сохраненные фильмы</NavLink>
                </nav>
                <NavLink to="/profile" className="header__link header__link_type_profile" onClick={onClose}>
                    <p className='header__profile-text'>Аккаунт</p>
                    <div className='header__profile-icon'></div>
                </NavLink>
            </div>
        </section>
    );
}

export default PopupWithMenu;