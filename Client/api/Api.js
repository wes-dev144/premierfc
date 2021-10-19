import axios from 'axios';

class Api{
    constructor() {
        // this.url = 'https://c1e04873-b61e-46f7-8c36-12233054c47f.mock.pstmn.io/'
        this.url = 'https://2a631fa4-8490-4fb4-aeea-d76b0a70b692.mock.pstmn.io'
        this.response = ''
        this.google_api_key = 'AIzaSyARYuJd50as6IifzUBhKpEsjlCg65TcTl0'
    };

    async request(method, endpoint, data) {
        this.response = await axios({
            method: method,
            url: this.url + '/' + endpoint,
            data: data
        })
        .then((response) => {
            if (typeof(response.data) != 'object') {
                console.log("WARNING API DATA IS NOT AN OBJECT")
            }
            
            return response
        });
        return this.response
    };
}

export default new Api();