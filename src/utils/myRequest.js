import axios from 'axios'
import router from '@/router'

window.axios = axios;

const http = axios.create({
    baseURL: 'https://api.meirixindong.com/',
    timeout: 1000 * 180,
    //withCredentials : true
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    // 防止缓存，GET请求默认带_t参数
    if (config.method === 'get') {
        config.params = {
            ...config.params,
            ...{'_t': new Date().getTime()}
        }
    }
    config.headers['hkf'] = 'hkf'
    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    if (response.data.code === 401 || response.data.code === 10001) {
        router.replace({name: 'login'})
        return Promise.reject(response.data.msg)
    }
    return response
}, error => {
    console.error(error)
    return Promise.reject(error)
})

export default http
