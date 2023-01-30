import { Base_Url } from "./constants.js";

class MainApi {
    constructor () {
        this.baseurl = Base_Url;
    }

    handleResponse (res)  {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getToken = (token) => {
        this._token = `Bearer ${token}`;
        this.headers = {
            'Content-Type': 'application/json',
            'authorization' :  this._token
        }
    }

    getMovies () {
        return fetch (`${this.baseurl}/movies`, {
            headers: this.headers})
            .then((res)=>
                this.handleResponse (res)
            );
    }

    createMovies (data) {
        return fetch (`${this.baseurl}/movies`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)})
            .then((res)=>
                this.handleResponse (res)
            );
    }

    deleteMovies (data, id) {
        const movieId = id;
        return fetch (`${this.baseurl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(data)})
            .then((res)=>
                this.handleResponse (res)
            );
    }

    updateUser (data) {
        console.log(data);
        return fetch (`${this.baseurl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(data)})
            .then((res)=>
                this.handleResponse (res)
            );
    }
}

const mainApi = new MainApi();

export default mainApi;