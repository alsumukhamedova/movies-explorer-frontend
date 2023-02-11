import React from 'react';
import './AboutMe.css';
import photoMe from '../../images/photoMe.png';

function AboutMe () {
    return (
        <section className='aboutMe' id='aboutMe'>
            <h3 className='main__section-title'>Студент</h3>
            <hr className="main__line"></hr>

            <div className='aboutMe__content'>
                <div className='aboutMe__textContent'>
                    <h2 className='aboutMe__title'>Алсу</h2>
                    <p className='aboutMe__description'>Фронтенд-разработчик, 22 года</p>

                    <p className='aboutMe__text'>Я живу в Москве. Студентка 4-ого курса МИЭМ НИУ ВШЭ. Поняла, что инженерное дело - не моё. На втором курсе заинтересовалась программированием, пробовала разное, но понравилось заниматься вёрсткой.
                    Решила пройти курс в Яндекс.Практикуме, чтобы знания были структурированными и полными. Сейчас нахожусь в активном поиске работы, чтобы применять свои знания на практике.</p>
                    <a href="https://github.com/alsumukhamedova" target="_blank" className='aboutMe__link' rel="noreferrer">Github</a>
                </div>

                <img  className='aboutMe__foto' src={photoMe} alt="фото"/>

            </div>

        </section>
    )
}

export default AboutMe;