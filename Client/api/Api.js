// import React from 'react';

// import apiType from '../constants/ApiTypes';
// import dispatcher from "../dispatcher";
import axios from 'axios';


class Api{
    constructor() {
        this.url = 'https://c1e04873-b61e-46f7-8c36-12233054c47f.mock.pstmn.io/'
        this.response = ''
    };

    async request(method, endpoint, data) {
        this.response = await axios({
            method: method,
            url: this.url + '/' + endpoint,
            data: data
        })
        .then((response) => {
            return response
        });
        console.log('GIVING DATA', this.response.data)
        return this.response
    };

}


export default new Api();