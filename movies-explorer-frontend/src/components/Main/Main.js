import React from 'react';
import Beginning from '../Beginning/Beginning.js';
import NavTab from '../NavTab/NavTab.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Technologies from '../Technologies/Technologies.js';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio.js';
import './Main.css';

function Main () {

    return (

        <main>
            <Beginning/>

            <NavTab />

            <AboutProject />

            <Technologies />

            <AboutMe />

            <Portfolio />

        </main>
    );
}

export default Main;