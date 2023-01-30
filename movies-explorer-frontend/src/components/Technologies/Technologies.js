import React from 'react';
import './Technologies.css';

function Technologies () {
    return (
        <section className='technologies' id="technologies">
            <h3 className='main__section-title main__section-title-technologies'>Технологии</h3>
            <hr className="main__line main__line-technologies"></hr>
            <h2 className='technologies__title'>7 технологий</h2>
            <p className='technologies__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <div className='technologies__tabs'>
                <div className='technologies__tab'>
                    <p className='technologies__tab-text'>HTML</p>
                </div>

                <div className='technologies__tab'>
                    <p className='technologies__tab-text'>CSS</p>
                </div>

                <div className='technologies__tab'>
                    <p className='technologies__tab-text'>JS</p>
                </div>

                <div className='technologies__tab'>
                    <p className='technologies__tab-text'>React</p>
                </div>

                <div className='technologies__tab'>
                    <p className='technologies__tab-text'>Git</p>
                </div>

                <div className='technologies__tab'>
                    <p className='technologies__tab-text'>Express.js</p>
                </div>

                <div className='technologies__tab'>
                    <p className='technologies__tab-text'>mongoDB</p>
                </div>
            </div>
        </section>
    )
}

export default Technologies;