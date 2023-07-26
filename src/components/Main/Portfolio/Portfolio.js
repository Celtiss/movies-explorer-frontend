import {NavLink} from 'react-router-dom';

function Portfolio() {
    return (
        <div className='portfolio__container'>
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className='portfolio__links'>
                <li className='portfolio__link'>
                    <NavLink to="#" className='portfolio__link'>
                        <p className='portfolio__link-text'>Статичный сайт</p>
                        <div className='portfolio__link-icon'></div>
                    </NavLink>
                </li>
                <li className='portfolio__link'>
                    <NavLink to="#" className='portfolio__link'>
                        <p className='portfolio__link-text'>Адаптивный сайт</p>
                        <div className='portfolio__link-icon'></div>
                    </NavLink>
                </li>
                <li className='portfolio__link'>
                    <NavLink to="#" className='portfolio__link'>
                        <p className='portfolio__link-text'>Одностраничное приложение</p>
                        <div className='portfolio__link-icon'></div>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
  }
  
  export default Portfolio;