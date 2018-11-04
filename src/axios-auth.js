import axios from 'axios';

// Instance
const axiosAuth = axios.create({
    baseURL: 'https://sprmke-vue-boilerplate.firebaseio.com'
});

// Config defaults
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

export default axiosAuth