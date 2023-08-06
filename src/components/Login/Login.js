import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PageWithForm from "../PageWithForm/PageWithForm";
import * as auth from '../../auth.js';

function Login({handleLogin}){
    const navigate = useNavigate();
    const data = {
        title: 'Рады видеть!',
        button :'Войти'
    }

    const [formValue, setFormValue] = useState({
        email:'',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({
        ...formValue,
        [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        auth.login(email, password).then((res) => {
            if(res){
                handleLogin(true);
                navigate ('/movies', {replace:true});
            }
          })
          .catch((err) => {
                console.log(err);
          });
      }

    return (
        <main className="login">
            <PageWithForm data={data} onSubmitForm = {handleSubmit}>
                <label className="account__form-label" htmlFor="email-input">E-mail</label>
                <input name="email" onChange={handleChange} value={formValue.email || ''} placeholder="" type="email" id='email-input' className="account__input" minLength="2" maxLength="30" required />
                <label className="account__form-label" htmlFor="password-input">Пароль</label>
                <input name="password" onChange={handleChange} value={formValue.password || ''} placeholder="" type="password" id='password-input' className="account__input" minLength="2" maxLength="30" required />
            </PageWithForm>
        </main>
    );
}

export default Login;