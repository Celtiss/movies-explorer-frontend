import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage(){
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <main className="error-page">
            <div className="error-page__container">
                <h1 className="error-page__title">404</h1>
                <p className="error-page__text">Страница не найдена</p>
            </div>
            <button onClick={goBack} className="error-page__link">Назад</button>
        </main>
    );
}

export default NotFoundPage;