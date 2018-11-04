import axios from 'axios';

// Instance
const axiosAuth = axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
});

// Config defaults
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';

export default axiosAuth