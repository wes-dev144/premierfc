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
            if (typeof(response.data) != 'object') {
                console.log("WARNING API DATA IS NOT AN OBJECT")
            }
            
            return response
        });
        return this.response
    };
}

export default new Api();