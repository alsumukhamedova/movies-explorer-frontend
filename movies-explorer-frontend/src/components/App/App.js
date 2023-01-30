import React, {useState, useEffect} from "react";
import {Route, Switch,  useHistory, useLocation, Redirect} from 'react-router-dom';
import './App.css';
import * as auth from '../../utils/auth.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import {ShortTime} from '../../utils/constants.js'

import NotFound from '../NotFound/NotFound.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import moviesApi from '../../utils/moviesApi.js'
import mainApi from '../../utils/mainApi.js';
import Header from "../Header/Header.js";
import Footer from '../Footer/Footer.js';

function App ( ) {

    const history = useHistory();
    const location = useLocation();

    const [currentUser,setCurrentUser] = useState('');
    const [movies, setMovies] = useState([]);
    const [movieCards, setMovieCards] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);
    const [savedMoviesCard, setSavedMovieCards] = useState([]);
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [isShort, setIsShort] = useState(false);
    const [message, setMessage] = useState('');
    const [messageOfSearch, setMessageOfSearch] = useState('');
    const [searchedSavedMoviesCard, setSearchedSavedMovieCards] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    useEffect (() => {
        tokenCheck()
    }, []);

    useEffect (() => {
        if (loggedIn){

            moviesApi.getCards()
                .then ((data) => {
                    localStorage.setItem('movies', JSON.stringify(data));
                    setMovies (
                        JSON.parse(localStorage.getItem('movies'))
                    )
                })
                .catch ((err) => {
                    console.log(err);
                    setMessageOfSearch('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
                })

            getSavedMovies()

            if (localStorage.getItem('movieCards')) {
                const loadMovies = JSON.parse(localStorage.getItem('movieCards'));
                setMovieCards(loadMovies.map((movie) => ({
                    movieId: movie.id,
                    country: movie.country,
                    image: `https://api.nomoreparties.co/${movie.image.url}`,
                    description: movie.description,
                    duration: movie.duration,
                    nameEN: movie.nameEN,
                    nameRU: movie.nameRU,
                    year: movie.year,
                    trailerLink: movie.trailerLink,
                    director: movie.director,
                    thumbnail: `https://api.nomoreparties.co/${movie.image.url}`
                })));
            }
        }
    }, [loggedIn]);

    function tokenCheck() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            if (token) {
                getUserInfo(token);
            }
        }
    }

    function getUserInfo (token) {
        auth.getUserInfo(token)
            .then((data) => {
                setLoggedIn(true);
                setCurrentUser(data);
                mainApi.getToken(token);
                history.push(location.pathname);
            })
            .catch((err) => console.log(err));
    }

    function onRegister(data) {
        auth.register(data.email,data.password, data.name)
            .then((res) => {
                if (res) {
                    onAuthorize(data);
                }
            })
            .catch ((err) => {
                console.log (err);
                setErrorMessage(true)
            })
    }

    function onAuthorize(data) {
        auth.authorize(data.email, data.password)
            .then ((data) => {
                if (data.token) {
                    getUserInfo(data.token);
                }
            })
            .catch (err => console.log(err));
    }

    function onUpdateUser (data) {
        mainApi.updateUser(data)
            .then((userStats) => {
                setCurrentUser(userStats);
                setMessage('Данные успешно обновлены')
            })
            .catch ((err) => {
                console.log (err);
                setMessage('Произошла ошибка при попытке обновить данные. Попробуйте позже')
            })
    }

    function searchMovie (text, movies) {
        const moviesFilter = movies.filter ((item) => (item.nameRU.toLowerCase().includes(text.toLowerCase())) && (isShort===true ? item.duration <= ShortTime : ' '));
        if (location.pathname === '/movies') {
            setMessageOfSearch('')
            setIsLoad(true);
            setTimeout (() => {
                setIsLoad(false);
                if (moviesFilter.length === 0) {
                    setMessageOfSearch('Ничего не найдено')
                } else {
                    setMessageOfSearch('')
                }
                setMovieCards(
                    moviesFilter.map((movie) => ({
                        movieId: movie.id,
                        country: movie.country,
                        image: `https://api.nomoreparties.co/${movie.image.url}`,
                        description: movie.description,
                        duration: movie.duration,
                        nameEN: movie.nameEN,
                        nameRU: movie.nameRU,
                        year: movie.year,
                        trailerLink: movie.trailerLink,
                        director: movie.director,
                        thumbnail: `https://api.nomoreparties.co/${movie.image.url}`
                    }))
                )
            }, 2000)

            localStorage.setItem('movieCards', JSON.stringify(moviesFilter))

        } else {
            setIsSearched(true);
            if (moviesFilter.length === 0) {
                setMessageOfSearch('Ничего не найдено')
            } else {
                setMessageOfSearch('')
            }
            setSearchedSavedMovieCards(moviesFilter)
        }
    }

    function isSavedMovie (data) {
        const result = savedMoviesCard.some((item) => {
            if (item.movieId === data.movieId) {
                return item;
            }
        })
        return result
    }

    function handleAction (data) {
        if (isSavedMovie(data) === false) {
            saveMovies (data)
        } else {
            deleteSavedMovie(data)
        }
    }

    function saveMovies (data) {
        mainApi.createMovies(data)
            .then ((data) => {
                getSavedMovies([data, ...savedMoviesCard])
            })
            .catch ((err) => {
                console.log(err);
            })
    }
    function deleteSavedMovie(data) {
        savedMoviesCard.forEach((item) => {
            if (item.movieId === data.movieId) {
                onDeleteMovie(item);
            }
        })
    }

    function getSavedMovies () {
        mainApi.getMovies()
            .then((data) => {
                setSavedMovieCards(
                    data.map((savedMovie) => ({
                            id: savedMovie._id,
                            movieId: savedMovie.movieId,
                            country: savedMovie.country,
                            image: savedMovie.image,
                            description: savedMovie.description,
                            duration: savedMovie.duration,
                            nameEN: savedMovie.nameEN,
                            nameRU: savedMovie.nameRU,
                            year: savedMovie.year,
                            trailerLink: savedMovie.trailerLink,
                            director: savedMovie.director,
                            thumbnail: savedMovie.thumbnail
                        })
                    )
                )})
            .catch ((err) => {
                console.log(err);
            })
    }

    function onDeleteMovie (data) {
        mainApi.deleteMovies(data, data.id)
            .then (() => {
                const result = savedMoviesCard.filter ( item => item.id !== (data.id) );
                setSavedMovieCards (result);
            })
            .catch ((err) => {
                console.log (err);
            })
    }

    function onClose () {
        setIsNavigationOpen(false);
    }

    function onLogAut () {
        localStorage.clear();
        setMovieCards([]);
        setSearchedSavedMovieCards([]);
        setLoggedIn(false);
        history.push('/')
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">

                    <Header className ="header header-main"
                            loggedIn= {loggedIn}
                            isOpen = {isNavigationOpen}
                            onClose = {onClose}
                            onClick = {setIsNavigationOpen}>
                    </Header>

                    <Switch>

                        <Route exact path = '/'>

                            <Main  loggedIn = {loggedIn}
                                   isOpen = {isNavigationOpen}
                                   onClose = {onClose}
                                   onClick = {setIsNavigationOpen}/>

                        </Route>

                        <Route path = '/signup'>
                            {loggedIn ? <Redirect to= '/movies'/> :
                                <Register onSubmit = {onRegister}
                                          isErrorMessage={errorMessage}/>}
                        </Route>

                        <Route path = '/signin'>
                            {loggedIn ? <Redirect to= '/movies'/> : <Login onSubmit = {onAuthorize}/>}
                        </Route>

                        <ProtectedRoute  path = '/movies'
                                         loggedIn = {loggedIn}
                                         component = {Movies}
                                         movieCards = {movieCards}
                                         isOpen = {isNavigationOpen}
                                         onClose = {onClose}
                                         onClick = {setIsNavigationOpen}
                                         searchMovie = {searchMovie}
                                         isSavedMovie = {isSavedMovie}
                                         movies={movies}
                                         isLoad = {isLoad}
                                         onShort = {setIsShort}
                                         isShort = {isShort}
                                         handleAction={handleAction}
                                         message= {messageOfSearch}>

                        </ProtectedRoute>

                        <ProtectedRoute path = '/saved_movies'
                                        getSavedMovies = {getSavedMovies}
                                        loggedIn = {loggedIn}
                                        component = {SavedMovies}
                                        isOpen = {isNavigationOpen}
                                        onClose = {onClose}
                                        onClick = {setIsNavigationOpen}
                                        movieCards = {savedMoviesCard}
                                        searchedMovie = {searchedSavedMoviesCard}
                                        onDeleteMovie = {onDeleteMovie}
                                        searchMovie = {searchMovie}
                                        onShort = {setIsShort}
                                        isShort = {isShort}
                                        isSearched = {isSearched}
                                        onSearched = {setIsSearched}
                                        message= {messageOfSearch}
                                        onSetMessage = {setMessageOfSearch}>

                        </ProtectedRoute>

                        <ProtectedRoute path = '/profile'
                                        loggedIn = {loggedIn}
                                        component={Profile}
                                        isOpen = {isNavigationOpen}
                                        onClose = {onClose}
                                        onClick = {setIsNavigationOpen}
                                        onLogAut = {onLogAut}
                                        onUpdateUser ={onUpdateUser}
                                        message= {message}
                                        onSetMessage = {setMessage}>

                        </ProtectedRoute>

                        <Route path = '*'>
                            <NotFound />
                        </Route>

                    </Switch>

                    <Footer />

                </div>
            </div>
        </CurrentUserContext.Provider>
    )
}

export default App;