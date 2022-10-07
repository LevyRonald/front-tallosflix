import axios from 'axios'
import store from '../store/index.js'
const http = axios.create({
    baseURL: 'http://localhost:3000',
    // http://150.230.78.209:18000/le
    headers: {
        'accept': 'application/json',
        'content': 'application/json'
    }
})

http.interceptors.request.use(function (config){
    const token = store.state.token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (erro){
    return Promise.reject(erro)
})

export default http