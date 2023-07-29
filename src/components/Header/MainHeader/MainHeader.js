import {NavLink} from 'react-router-dom';

function MainHeader() {
    return (
        <header className="header header_type_main"> 
            <NavLink to="/" className="header__logo"></NavLink>
            <nav>
                <NavLink to="/signup" className="header__link header__link_type_signup">Регистрация</NavLink>
                <NavLink to="/signin" className="header__link header__link_type_login">Войти</NavLink>
            </nav>
        </header>
    );
  }
  
  export default MainHeader;