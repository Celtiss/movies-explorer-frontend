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
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUserInfo () {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: "include",
        })
        .then(this._getResFromServer());
    }

    getSavedMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: this._headers,
            credentials: "include",
        })
        .then(this._getResFromServer());
    }

    // updateUserInfo(name, job) {
    //     return fetch(`${this._url}/users/me`, {
    //         method: 'PATCH',
    //         headers: this._headers,
    //         credentials: "include",
    //         body: JSON.stringify({
    //             name: `${name}`,
    //             about: `${job}`
    //         })
    //     })
    //     .then(this._getResFromServer());
    // }

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

    deleteMovie(_id) {
        return fetch(`${this._url}/movies/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: "include",
        })
        .then(this._getResFromServer());
    }
    
    // setCardLikes(id) {
    //     return fetch(`${this._url}/cards/${id}/likes`, {
    //         method: 'PUT',
    //         headers: this._headers,
    //         credentials: "include",
    //     })
    //     .then(this._getResFromServer());
    // }

    // deleteCardLike(id) {
    //     return fetch(`${this._url}/cards/${id}/likes`, {
    //         method: 'DELETE',
    //         headers: this._headers,
    //         credentials: "include",
    //     })
    //     .then(this._getResFromServer());
    // }
}

const mainApi = new MainApi ({
    url: 'http://localhost:3000',
    headers: {
        'content-type': 'application/json',
        //authorization: '88b8691a-7ac8-4b43-af84-6572693f6425'
    },
    credentials: "include",
});

export default mainApi;