import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import { CurrentUserContext} from '../../contexts/CurrentUserContext.js';

function Profile({isEdit, onEditProfile, onUpdateUser, handleLogin, handleUserLogOut}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    React.useEffect(() => {
        setName(currentUser?.name ?? '');
        setEmail(currentUser?.email ?? '');
      }, [currentUser]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleEdit() {
        onEditProfile();
    }

    function handleSubmitUser(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            email: email,
          });
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
                    <form className="profile__form" onSubmit={handleSubmitUser}>
                        <div className="profile__form-item">
                            <p className="profile__form-title">Имя</p>
                            <input name="name" className="profile__form-input" placeholder={''} value={name || ''} onChange={handleNameChange} type="text" minLength="2" maxLength="30"></input>
                        </div>
                        <div className="profile__form-item">
                            <p className="profile__form-title">E-mail</p>
                            <input name='email' className="profile__form-input" placeholder={''} value={email || ''} onChange={handleEmailChange} type="email" minLength="2" maxLength="30"></input>
                        </div>
                        <span className='profile__error'>При обновлении профиля произошла ошибка.</span>
                        <button type='submit' className="profile__save-btn">Сохранить</button>
                    </form> 
                </div>
            }
        </main>
    );
  }
  
  export default Profile;