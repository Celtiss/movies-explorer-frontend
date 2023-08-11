import {useState} from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PageWithForm from "../PageWithForm/PageWithForm";
import * as auth from '../../auth.js';

function Login({handleLogin}){
    const navigate = useNavigate();
    const data = {
        title: 'Рады видеть!',
        button :'Войти'
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
        const { email, password } = data;
        auth.login(email, password).then((res) => {
            if(res){
                handleLogin(true);
                navigate ('/movies', {replace:true});
                reset();
            }
          })
          .catch((err) => {
            if (err === 401) {console.log(err); setFormError('Неправильная почта или пароль');}
            else if (err === 500) {setFormError('Ошибка сервера');}
          });
      }

    return (
        <main className="login">
            <PageWithForm data={data} isValid={isValid} formError={formError} handleSubmitForm = {handleSubmit(handleSubmitForm)}>
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
                    minLength="2" 
                    maxLength="30" 
                    required
                    {...register('password', {
                        required: 'Введите пароль'
                    })}
                    />
                    {errors?.password && <span className="account__form-error account__form-error_type_input">{errors.password.message}</span>}
                </label>
            </PageWithForm>
        </main>
    );
}

export default Login;