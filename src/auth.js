export const BASE_URL = 'https://api.movies-tmr.nomoredomains.xyz';
// export const BASE_URL = 'http://localhost:3000';

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({email, password, name})
  })
  .then( (res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(res.status);
})
}; 

export const login  =  (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email: `${email}`,     
            password: `${password}`
        })
    })
    .then( (res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    })
};

export const logOut  =  () => {
    return fetch(`${BASE_URL}/signout`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json"
        },
        credentials: "include",
    })
    .then( (res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
};

export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    .then( (res) => {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}