import PageWithForm from "../PageWithForm/PageWithForm";

function Login(){
    const data = {
        title: 'Рады видеть!',
        button :'Войти'
    }
    return (
        <main className="login">
            <PageWithForm data={data}>
                <label className="account__form-label" htmlffor="email-input">E-mail</label>
                <input name="accountEmail" placeholder="" type="email" id='email-input' className="account__input" minLength="2" maxLength="30" required />
                <label className="account__form-label" htmlfffor="password-input">Пароль</label>
                <input name="accountPassword" placeholder="" type="password" id='password-input' className="account__input" minLength="2" maxLength="30" required />
            </PageWithForm>
        </main>
    );
}

export default Login;