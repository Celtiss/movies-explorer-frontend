import PageWithForm from "../PageWithForm/PageWithForm";

function Login(){
    const data = {
        title: 'Рады видеть!',
        button :'Войти'
    }
    return (
        <section className="login">
            <PageWithForm data={data}>
                <label className="account__form-label" htmlffor="email-input">E-mail</label>
                <input name="accountEmail" type="email" id='email-input' className="account__input" required />
                <label className="account__form-label" htmlfffor="password-input">Пароль</label>
                <input name="accountPassword" type="password" id='password-input' className="account__input" required />
            </PageWithForm>
        </section>
    );
}

export default Login;