import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function Movies ({movieCards, searchMovie, message, movies, isLoad, onShort, isShort, isSavedMovie, handleAction}) {

    return (
        <section>

            <SearchForm searchMovie = {searchMovie}
                        movies={movies}
                        onShort = {onShort}
                        isShort = {isShort}
                        movieCards={movieCards}
            />

            <Preloader isLoad = {isLoad}/>

            <p className = 'movies__massage'> {message}</p>

            <MoviesCardList movieCards = {movieCards}
                            isSavedMovie = {isSavedMovie}
                            isLoad = {isLoad}
                            handleAction = {handleAction}>
            </MoviesCardList>

        </section>
    );
}

export default Movies;