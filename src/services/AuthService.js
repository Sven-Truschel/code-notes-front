import axios from 'axios'
const url = 'https://64.227.59.229:5000/users';
export default {
    login(credentials) {
        return axios
            .post(url + '/login', credentials)
            .then(response => response.data);
    },
    signUp(credentials) {
        return axios
            .post(url + '/signup', credentials)
            .then(response => response.data);
    },
};