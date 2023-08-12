import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import { CurrentUserContext} from '../../contexts/CurrentUserContext.js';

function Profile({isEdit, profileRes, onEditProfile, onUpdateUser, handleLogin, handleUserLogOut}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [serverRes, setServerRes] = useState(null);
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
    } = useForm({
        mode: "onChange"
    }
    );
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formValid, setFormValid] = useState(false);
    const buttonClassName = `profile__save-btn ${formValid ? 'profile__save-btn_active' : ''} `;
    
    function handleEdit() {
        onEditProfile();
    }

    useEffect(() => {
        profileRes === 409 && setServerRes('Пользоваетль с таким email уже сущестсвует');
        profileRes === 500 && setServerRes('Ошибка сервера');
    }, [profileRes])

    // Если поля ввода валидны и отличаются от начальных значений, то сделать кнопку активной
    useEffect(() => {
        if((((name !== currentUser.name) && name !=='') || ((email !== currentUser.email) && email!=='')) && isValid) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [name, email, isValid, currentUser])

    function handleSubmitUser(data) {
        onUpdateUser({
            name: data.name || currentUser.name,
            email: data.email || currentUser.email,
          });
          console.log(profileRes === 409)
          
    }

    function handleLogOut() {
        handleLogin(false);
        handleUserLogOut();
    }

    return (
        <main className="profile">
            <h1 className="profile__title">Привет, Виталий!</h1>
            { !isEdit && 
                <div className="profile__main"> 
                    <div className="profile__info">
                        <div className="profile__info-item">
                            <p className="profile__field">Имя</p>
                            <p className="profile__field">{currentUser.name}</p>
                        </div>
                        <div className="profile__info-item">
                            <p className="profile__field">E-mail</p>
                            <p className="profile__field">{currentUser.email}</p>
                        </div>
                    </div> 
                    <nav className="profile__menu-container">
                        <button type='button' className="profile__edit-btn" onClick={handleEdit}>Редактировать</button>
                        <NavLink to="/" className="profile__signout-btn" onClick={handleLogOut}>Выйти из аккаунта</NavLink>
                    </nav> 
                </div>
            }
            { isEdit && 
                <div className="profile__edit"> 
                    <form className="profile__form" onSubmit={handleSubmit(handleSubmitUser)}>
                        <div className="profile__form-item">
                            <p className="profile__form-title">Имя</p>
                            <input 
                            name="name" 
                            className="profile__form-input" 
                            placeholder={currentUser.name} 
                            type="text" 
                            minLength="2" 
                            maxLength="30"
                            {...register(`name`, {
                                minLength: {
                                    value: 2,
                                    message: 'Name должен быть минимум 2 символа'
                                },
                                onChange: (e) => setName(e.target.value),
                            })} />
                        </div>
                        <div className="profile__form-item">
                            <p className="profile__form-title">E-mail</p>
                            <input 
                            name='email' 
                            className="profile__form-input" 
                            placeholder={currentUser.email} 
                            type="email" 
                            minLength="2" 
                            maxLength="30" 
                            {...register(`email`, {
                                minLength: {
                                    value: 2,
                                    message: 'Email должен быть инимум 2 символа'
                                },
                                pattern: {
                                    value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
                                    message: 'Введите корректный email'
                                },
                                onChange: (e) => setEmail(e.target.value),
                            })}/>
                        </div>
                        <span className='profile__error'>{(errors?.name && errors.name.message) || (errors?.email && errors.email.message) || serverRes}</span>
                        <button type='submit' disabled={formValid ? false: true} className={buttonClassName}>Сохранить</button>
                    </form> 
                </div>
            }
        </main>
    );
  }
  
  export default Profile;