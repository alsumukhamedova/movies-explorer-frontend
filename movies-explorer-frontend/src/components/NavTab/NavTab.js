import React from 'react';
import { Link } from 'react-scroll';
import './NavTab.css';

function NavTab () {

    return (
        <section className='navTab'>
            <Link to='aboutProject' className = 'navTab__link' duration={700} smooth={true}>О проекте</Link>
            <Link to='techs' className = 'navTab__link' duration={700} smooth={true}>Технологии</Link>
            <Link to='aboutMe' className = 'navTab__link' duration={700} smooth={true}>Студент</Link>
        </section>
    );
}

export default NavTab;