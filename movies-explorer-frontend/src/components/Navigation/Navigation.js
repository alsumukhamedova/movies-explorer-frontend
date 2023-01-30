import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css'
import ButtonImage from '../../images/profile.svg';

function Navigation ({isOpen, onClose}) {
    return (
        <section className={'navigation' +  (isOpen?' navigation_visible':'')}>
            <div className="navigation__container">
                <nav className="navigation__links">
                    <Link to='/' className='navigation__link' onClick={onClose}>Главная</Link>
                    <Link to='/movies' className='navigation__link' onClick={onClose}>Фильмы</Link>
                    <Link to='saved_movies' className='navigation__link' onClick={onClose}>Сохраненные фильмы</Link>
                </nav>

                <Link className = 'navigation__button' to='/profile' onClick={onClose}>
                    <p className='navigation__button-text'>Аккаунт</p>
                    <div className='navigation__button-icon'>
                        <img className='navigation__button-image' src={ButtonImage} alt='Профиль' />
                    </div>
                </Link>
                <button className='navigation__closeButton' onClick={onClose} type='button' />
            </div>
        </section>
    )
}

export default Navigation;