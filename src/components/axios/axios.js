import Axios from 'axios';
const axios = Axios.create({withCredentials: true});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// axios.interceptors.request.use((config) => {

//     if (config.method === 'post') {
//         config.data = JSON.stringify(config.data);
//     }

//     return config;
// });

// Add a response interceptor
axios.interceptors.response.use(
    (response) => {
        let data = response.data.data;
        let code = response.data.code;
        let message = response.data.message;
        if(code != 0){
            return Promise.reject(message);
        }
        return data;
    },
    (error) => {
        // Do something with response error
        return Promise.reject(error);
    }
);
export default axios;