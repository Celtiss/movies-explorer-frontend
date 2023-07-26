import React from 'react';
import {NavLink} from 'react-router-dom';

function Footer() {
    return(
        <footer className="footer"> 
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__info'>
                <p className='footer__copyright'>© 2023</p>
                <ul className='footer__links'>
                    <li className="footer__link"><NavLink className="footer__link" to="#">Яндекс.Практикум</NavLink></li>
                    <li className="footer__link"><NavLink className="footer__link" to="#">Github</NavLink></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;