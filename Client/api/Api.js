import axios from 'axios';
import config from '../client-config';

class Api{
    constructor() {
        this.url = config.API_URL
        this.response = ''
        this.google_api_key = config.GOOGLE_PLACES_API_KEY
    };

    async request(method, endpoint, {data={}, url=null}={}) {
        if (url == null) {
            url = this.url
        }
        this.response = await axios({
            method: method,
            url: url + '/' + endpoint,
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