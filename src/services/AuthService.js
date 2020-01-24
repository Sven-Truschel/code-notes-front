import axios from 'axios'
const url = 'http://192.168.178.10:3000/users';
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