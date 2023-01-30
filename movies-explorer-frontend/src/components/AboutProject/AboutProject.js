import React from 'react';
import './AboutProject.css';

function AboutProject () {
    return (
        <section className="aboutProject" id = 'aboutProject'>
            <h3 className='main__section-title'>O проекте</h3>
            <hr className="main__line"></hr>
            <div className="aboutProject__description">
                <div className="aboutProject__description-stage">
                    <h4 className="aboutProject__description-stage-title">Дипломный проект включал 5 этапов</h4>
                    <p className='aboutProject__description-stage-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="aboutProject__description-stage">
                    <h4 className="aboutProject__description-stage-title">На выполнение диплома ушло 5 недель</h4>
                    <p className='aboutProject__description-stage-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className='aboutProject__timeBar'>
                <div className='aboutProject__timeBar-backend'>
                    <p className = 'aboutProject__timeBar-backend-text'>1 неделя</p>
                </div>
                <div className='aboutProject__timeBar-frontend'>
                    <p className = 'aboutProject__timeBar-frontend-text'>4 недели</p>
                </div>
                <div className='aboutProject__timeBar-backend'>
                    <p className = 'aboutProject__timeBar-backend-text aboutProject__timeBar-text_bottom'>Back-end</p>
                </div>
                <div className='aboutProject__timeBar-frontend'>
                    <p className = 'aboutProject__timeBar-frontend-text aboutProject__timeBar-text_bottom'>Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;