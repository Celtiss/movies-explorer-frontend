import {NavLink, useLocation} from 'react-router-dom';

function PageWithForm(props){
    const location = useLocation();
    const isSignInRoute = location.pathname === '/signin';
    const isSignUpRoute = location.pathname === '/signup';

    const buttonClassName = `account__form-btn ${props.isValid && 'account__form-btn_active'} `;
    return (
        <div className="account">
            <NavLink to="/" className="account__logo"></NavLink>
            <h1 className="account__title">{props.data.title}</h1>
            <form className='account__form' onSubmit={props.handleSubmitForm}>
                {props.children}
                {props.formError && (<span className="account__form-error account__form-error_type_signup">{props.formError}</span>)}
                <button type='submit' disabled={props.isValid ? false: true} className={buttonClassName}>{props.data.button}</button>
            </form>
            {isSignUpRoute && (<p className="account__text">Уже зарегистрированы? <NavLink to="/signin" className="account__link">Войти</NavLink></p>)}
            {isSignInRoute && (<p className="account__text">Еще не зарегистрированы? <NavLink to="/signup" className="account__link">Регистрация</NavLink></p>)}
        </div>
    );
}

export default PageWithForm;