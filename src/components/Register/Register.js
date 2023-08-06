import {useState} from 'react';
import PageWithForm from "../PageWithForm/PageWithForm";
import * as auth from '../../auth.js';

function Register(){
    const [formValue, setFormValue] = useState({
        email:'',
        password: '',
        name: ''
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
        const { email, password, name } = formValue;
        auth.register(email, password, name).then((res) => {
            setFormValue({email: '', password: '', name: ''});
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const data = {
        title: 'Добро пожаловать!',
        button :'Зарегистрироваться'
    }
    return (
        <main className="register">
            <PageWithForm data={data} onSubmitForm = {handleSubmit}>
                <label className="account__form-label" htmlFor="name-input">Имя</label>
                <input name="name" onChange={handleChange} value={formValue.name || ''} placeholder="" type="text" id='name-input' className="account__input" minLength="2" maxLength="30" required />
                <label className="account__form-label" htmlFor="email-input">E-mail</label>
                <input name="email" onChange={handleChange} value={formValue.email || ''} placeholder="" type="email" id='email-input' className="account__input" minLength="2" maxLength="30" required />
                <label className="account__form-label" htmlFor="password-input">Пароль</label>
                <input name="password" onChange={handleChange} value={formValue.password || ''} placeholder="" type="password" id='password-input' className="account__input" required />
            </PageWithForm>
        </main>
    );
}

export default Register;