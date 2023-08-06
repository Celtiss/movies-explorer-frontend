import {NavLink, useLocation} from 'react-router-dom';

function PageWithForm(props){
    const location = useLocation();
    const isSignInRoute = location.pathname === '/signin';
    const isSignUpRoute = location.pathname === '/signup';
    return (
        <div className="account">
            <NavLink to="/" className="account__logo"></NavLink>
            <h1 className="account__title">{props.data.title}</h1>
            <form className='account__form' onSubmit={props.onSubmitForm}>
                {props.children}
                {isSignUpRoute && (<span className="account__form-error account__form-error_type_signup">Что-то пошло не так...</span>)}
                {isSignInRoute && (<span className="account__form-error account__form-error_type_signin">Что-то пошло не так...</span>)}
                <button type='submit' className='account__form-btn'>{props.data.button}</button>
            </form>
            {isSignUpRoute && (<p className="account__text">Уже зарегистрированы? <NavLink to="/signin" className="account__link">Войти</NavLink></p>)}
            {isSignInRoute && (<p className="account__text">Еще не зарегистрированы? <NavLink to="/signup" className="account__link">Регистрация</NavLink></p>)}
        </div>
    );
}

export default PageWithForm;