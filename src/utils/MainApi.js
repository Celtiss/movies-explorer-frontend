class MainApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _getResFromServer() {
        return (res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        }
    }

    // Получить данные о пользователе
    getUserInfo () {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: "include",
        })
        .then(this._getResFromServer());
    }

    // Получить сохраненные фильмы пользователя
    getSavedMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
            credentials: "include",
        })
        .then(this._getResFromServer());
    }

    // Jбновить данные пользователя
    updateUserInfo(name, email) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify({
                email: `${email}`,
                name: `${name}`
            })
        })
        .then(this._getResFromServer());
    }

    // Сохранить фильм
    saveMovie(data) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._headers,
            credentials: "include",
            body: JSON.stringify({
                country: `${data.country}`,
                director: `${data.director}`,
                duration: `${data.duration}`,
                year: `${data.year}`,
                description: `${data.description}`,
                image: `https://api.nomoreparties.co${data.image.url}`,
                trailerLink: `${data.trailerLink}`,
                thumbnail: `https://api.nomoreparties.co${data.image.url}`,
                movieId: `${data.id}`,
                nameRU: `${data.nameRU}`,
                nameEN: `${data.nameEN}`,

            })
        })
        .then(this._getResFromServer());
    }

    // Удалить фильм
    deleteMovie(_id) {
        return fetch(`${this._url}/movies/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: "include",
        })
        .then(this._getResFromServer());
    }

}

const mainApi = new MainApi ({
    url: 'https://api.movies-tmr.nomoredomains.xyz',
    // url: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json',
    },
    credentials: "include",
});

export default mainApi;