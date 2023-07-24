import axios from 'axios';

const access = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null;
let headers = {
    // 'Content-type': 'application/json',
};
if (access) {
    headers.Authorization = 'Bearer ' + access;
}
export default axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers,
});
