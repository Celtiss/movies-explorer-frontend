import {NavLink} from 'react-router-dom';
function NotFoundPage(){
    return (
        <section className="error-page">
            <div className="error-page__container">
                <h1 className="error-page__title">404</h1>
                <p className="error-page__text">Страница не найдена</p>
            </div>
            <NavLink to="/" className="error-page__link">Назад</NavLink>
        </section>
    );
}

export default NotFoundPage;