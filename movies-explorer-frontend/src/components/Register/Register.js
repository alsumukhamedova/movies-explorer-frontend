import React from 'react';
import {Link} from 'react-router-dom';
import { useForm} from 'react-hook-form';
import Form from '../Form/Form.js';
import logo from '../../images/logo.svg';
import './Register.css';

function Register ({onSubmit, isErrorMessage}) {

    const { register, formState: {errors, isValid}, handleSubmit } = useForm({mode: 'onChange'});

    function submit (data) {
        onSubmit(data);
    }

    return (
        <section className='register'>
            <Link to='/'>
                <img  className="header__logo" src={logo} alt="лого"/>
            </Link>

            <h1 className='register__title'>Добро пожаловать!</h1>

            <Form onSubmit={handleSubmit(submit)}>
                <label className = 'form__label' htmlFor='name'> Имя </label>
                <input className='form__input'
                       type='text'
                       name = 'name'
                       id='name'
                       {...register('name', {required: true,
                           minLength: 2,
                           maxLength: 30,
                           pattern: /[a-zа-яё ]/i})}/>

                <span className='form__input-error-text'>
                    {errors.name?.type === "required" && "Пожалуйста, заполните поле"}
                    {errors.name?.type === "pattern" && "Поле содержит недопустимые символы"}
                    {errors.name?.type === "minLength" && "Минимальное  значение должно быть не меньше 2-х символов"}
                    {errors.name?.type === "maxLength" && "Достигнута максимальная длина поля"}
                </span>

                <label className = 'form__label' htmlFor='email'> E-mail </label>
                <input className='form__input'
                       type='email'
                       name = 'email'
                       id='email'
                       {...register('email', {required: true,
                           pattern: /([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,})\.([A-z]{2,8})/})}/>
                <span className='form__input-error-text'>
                    {errors.email?.type === "required" && "Пожалуйста, заполните поле"}
                    {errors.email?.type === "pattern" && "Поле содержит недопустимые символы"}
                </span>


                <label className = 'form__label' htmlFor='password'> Пароль </label>
                <input className='form__input'
                       type='password'
                       required
                       name = 'password'
                       id='password'
                       {...register('password', {required: true})}/>
                <span className='form__input-error-text'>{errors.password?.type === "required" && "Пожалуйста, заполните поле"} </span>

                <span className={'form__submit-error' +  (isErrorMessage?' form__submit-error_visible':'')}>Во время регистрации произошла ошибка</span>

                <button disabled={!isValid} className={'form__button form__button-register' +  (!isValid?' form__button_disabled':'')} type='submit'>Зарегистрироваться</button>
            </Form>

            <p className="register__text">Уже зарегистрированы?
                <Link to='signin' className="register__link"> Войти</Link>
            </p>
        </section>
    )
}

export default Register;