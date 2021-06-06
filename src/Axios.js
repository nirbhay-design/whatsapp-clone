import axios from 'axios';

const instance = axios.create({
    baseUrl:"https://whatsapp-backend-nirbhay.herokuapp.com"
});
// when we deploy we need to just change the url here
export default instance;