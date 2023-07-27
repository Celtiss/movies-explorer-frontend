function AboutProject() {
    return (
        <section className="about section">
            <h1 className="section__title">О проекте</h1>
            <div className="about__content">
                <ul className="about__desc">
                    <li className="about__list">
                        <h2 className="about__list-title">Дипломный проект включал 5 этапов</h2>
                        <p className="about__list-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                    </li>
                    <li className="about__list">
                        <h2 className="about__list-title">На выполнение диплома ушло 5 недель</h2>
                        <p className="about__list-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>
                </ul>
                <div className="about__items">
                    <div className="about__item about__item_type_back">
                        <p className="about__item-text about__item-text_color_blue">1 неделя</p>
                        <h3 className="about__bar-heading">Back-end</h3>
                    </div>
                    <div className=" about__item about__item_type_front">
                        <p className="about__item-text about__item-text_color_white">4 недели</p>
                        <h3 className="about__bar-heading">Front-end</h3>
                    </div>
                </div>
            </div>
        </section>
    );
  }
  
  export default AboutProject;