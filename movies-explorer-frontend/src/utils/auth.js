import { Base_Url } from "./constants.js";

export const register = (email, password, name) => {
    return fetch (`${Base_Url}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email, password, name})
    })
        .then ((response) => {
            if (response.status === 201) {
                return response.json ();
            }
            return Promise.reject(response.status);
        })
        .then ((res) => {
            return res;
        })
}

export const authorize = (email, password) => {
    return fetch (`${Base_Url}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then ((response) => {
            if (response.status === 200) {
                return response.json ();
            }
        })
        .then ((data) => {
            localStorage.setItem ('token', data.token);
            return data;
        })
}

export const getUserInfo = (token) => {
    return fetch (`${Base_Url}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then ((response) => {
            if (response.status === 200) {
                return response.json ();
            }
        })
}