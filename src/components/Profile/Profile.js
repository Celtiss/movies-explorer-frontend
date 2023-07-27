import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';

function Profile({user, isEdit, onEditProfile, onUpdateUser}) {
    
    const [formValue, setFormValue] = useState({
        name:'',
        email: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
        ...formValue,
        [name]: value
        });
    }

    function handleEdit() {
        onEditProfile();
    }
    console.log(formValue);
    function handleSubmitUser(e) {
        e.preventDefault();
        onUpdateUser(formValue);
    }

    return (
        <main className="profile">
            <h2 className="profile__title">Привет, Виталий!</h2>
            { !isEdit && 
                <div className="profile__main"> 
                    <div className="profile__info">
                        <div className="profile__info-item">
                            <p className="profile__field">Имя</p>
                            <p className="profile__field">{user.name}</p>
                        </div>
                        <div className="profile__info-item">
                            <p className="profile__field">E-mail</p>
                            <p className="profile__field">{user.email}</p>
                        </div>
                    </div> 
                    <nav className="profile__menu-container">
                        <button type='button' className="profile__edit-btn" onClick={handleEdit}>Редактировать</button>
                        <NavLink to="/" className="profile__signout-btn">Выйти из аккаунта</NavLink>
                    </nav> 
                </div>
            }
            { isEdit && 
                <div className="profile__edit"> 
                    <form className="profile__form">
                        <div className="profile__form-item">
                            <p className="profile__form-title">Имя</p>
                            <input name="name" className="profile__form-input" placeholder='Виталий' value={formValue.name || ''} onChange={handleChange} type="text" minLength="2" maxLength="30"></input>
                        </div>
                        <div className="profile__form-item">
                            <p className="profile__form-title">E-mail</p>
                            <input name='email' className="profile__form-input" placeholder='pochta@yandex.ru' value={formValue.email || ''} onChange={handleChange} type="email" minLength="2" maxLength="30"></input>
                        </div>
                        <span className='profile__error'>При обновлении профиля произошла ошибка.</span>
                        <button type='submit' className="profile__save-btn" onSubmit={handleSubmitUser}>Сохранить</button>
                    </form> 
                </div>
            }
        </main>
    );
  }
  
  export default Profile;