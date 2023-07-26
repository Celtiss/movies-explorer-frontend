import PageWithForm from "../PageWithForm/PageWithForm";
function Register(){
    const data = {
        title: 'Добро пожаловать!',
        button :'Зарегистрироваться'
    }
    return (
        <section className="register">
            <PageWithForm data={data}>
                <label className="account__form-label" htmlffor="name-input">Имя</label>
                <input name="accountName" type="text" id='name-input' className="account__input" minLength="2" maxLength="30" required />
                <label className="account__form-label" htmlffor="email-input">E-mail</label>
                <input name="accountEmail" type="email" id='email-input' className="account__input" required />
                <label className="account__form-label" htmlffor="password-input">Пароль</label>
                <input name="accountPassword" type="password" id='password-input' className="account__input" required />
            </PageWithForm>
        </section>
    );
}

export default Register;