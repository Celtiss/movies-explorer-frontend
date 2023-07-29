import {NavLink} from 'react-router-dom';

function Portfolio() {
    return (
        <div className='portfolio'>
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className='portfolio__items'>
                <li className='portfolio__item'>
                    <NavLink to="https://celtiss.github.io/how-to-learn/" target='blanck' className='portfolio__link'>
                        <p className='portfolio__link-text'>Статичный сайт</p>
                        <div className='portfolio__link-icon'></div>
                    </NavLink>
                </li>
                <li className='portfolio__item'>
                    <NavLink to="https://celtiss.github.io/russian-travel/" target='blanck' className='portfolio__link'>
                        <p className='portfolio__link-text'>Адаптивный сайт</p>
                        <div className='portfolio__link-icon'></div>
                    </NavLink>
                </li>
                <li className='portfolio__item'>
                    <NavLink to="https://mesto.sarena.nomoredomains.monster" target='blanck' className='portfolio__link'>
                        <p className='portfolio__link-text'>Одностраничное приложение</p>
                        <div className='portfolio__link-icon'></div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
  }
  
  export default Portfolio;