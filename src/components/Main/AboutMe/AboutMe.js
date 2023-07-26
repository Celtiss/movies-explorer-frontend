import {NavLink} from 'react-router-dom';
import Portfolio from '../Portfolio/Portfolio';
import student from '../../../images/main-img.png';

function AboutMe() {
    return (
        <section className="student section">
            <h1 className="section__title">Студент</h1>
            <div className="student__container">
                <div className='student__about'>
                    <h2 className="student__name">Виталий</h2>
                    <p className="student__job">Фронтенд-разработчик, 30 лет</p>
                    <p className="student__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. 
                    Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                    После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <NavLink to="https://github.com/Celtiss" target='blank' className="student__link">Github</NavLink>
                </div>
                <img className='student__img' src={student} alt="Cтудент" />
            </div>
            <Portfolio />
        </section>
    );
  }
  
  export default AboutMe;