import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import PageWithForm from "../PageWithForm/PageWithForm";
import * as auth from '../../auth.js';

function Register() {
    const navigate = useNavigate();
    const data = {
        title: 'Добро пожаловать!',
        button :'Зарегистрироваться'
    }
    const [formError, setFormError] = useState('');
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onChange"
    }
    );

    const handleSubmitForm = (data) => {
        const { email, password, name } = data;
        auth.register(email, password, name)
        .then((res) => {
            navigate ('/signin', {replace:true});
            reset();
        })
        .catch((err) => {
            if (err === 409) {console.log(err); setFormError('Пользователь с данным email уже существует');}
            else if (err === 500) {setFormError('Ошибка сервера');}
        });
    }

    return (
        <main className="register">
            <PageWithForm data={data} isValid={isValid} formError={formError} handleSubmitForm = {handleSubmit(handleSubmitForm)}>
                <label className="account__form-label" htmlFor="name-input">Имя
                    <input 
                    name="name" 
                    placeholder=""
                    type="text" 
                    id='name-input' 
                    className="account__input" 
                    minLength="2" 
                    maxLength="30" 
                    required
                    {...register(`name`, {
                        required: 'Заполните это поле',
                        minLength: {
                            value: 2,
                            message: 'Минимум 2 символа'
                        },
                    })} />
                    {errors?.name && <span className="account__form-error account__form-error_type_input">{errors.name.message}</span>}
                </label>
                <label className="account__form-label" htmlFor="email-input">E-mail
                    <input 
                    name="email" 
                    placeholder="" 
                    type="email" 
                    id='email-input' 
                    className="account__input" 
                    minLength="2" 
                    maxLength="30" 
                    required 
                    {...register(`email`, {
                        required: 'Заполните это поле',
                        minLength: {
                            value: 2,
                            message: 'Минимум 2 символа'
                        },
                        pattern: {
                            value: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
                            message: 'Введите корректный email'
                        }
                    })}
                    />
                    {errors?.email && <span className="account__form-error account__form-error_type_input">{errors.email.message}</span>}
                </label>
                <label className="account__form-label" htmlFor="password-input">Пароль
                    <input 
                    name="password" 
                    placeholder=""
                    type="password"
                    id='password-input'
                    className="account__input" 
                    required 
                    {...register(`password`, {
                        required: 'Заполните это поле',
                    })} />
                    {errors?.password && <span className="account__form-error account__form-error_type_input">{errors.password.message}</span>}
                </label>
            </PageWithForm>
        </main>
    );
}

export default Register;