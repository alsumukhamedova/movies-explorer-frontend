import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FilterCheckBox.css';

function FilterCheckBox ({onShort, movies, searchMovie, isShort, text}) {

    const [isClicked, setIsClicked]= useState(false);

    const location = useLocation();

    function handleChangeTumbler() {
        onShort (!isShort)
        setIsClicked (true);
        if (location.pathname === '/movies'){
            localStorage.setItem('isShort', !isShort);
        }
    }

    useEffect(() => {
        if (location.pathname === '/movies'){
            console.log(localStorage.getItem('isShort'))
            if (localStorage.getItem('isShort')) {
                onShort(JSON.parse(localStorage.getItem('isShort')));
            }
        }

        if (location.pathname === '/saved_movies'){
            onShort(false);
        }

    }, [location]);

    useEffect(() => {
        if (isClicked === true) {
            searchMovie (text, movies)
        }
    }, [isShort, isClicked]);

    return(
        <section className='filterCheckBox'>
            <form className='filterCheckBox__form'>
                <input type="checkbox"
                       id='checkBox'
                       className='filterCheckBox__input'
                       checked={isShort}
                       onChange = {() => handleChangeTumbler()}/>
            </form>
            <p className='filterCheckBox__description'>Короткометражки</p>
        </section>
    )
}

export default FilterCheckBox;