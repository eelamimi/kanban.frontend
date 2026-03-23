import axios from 'axios';
import AuthService from '../service/AuthService';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            AuthService.clearUserInfo()
            AuthService.redirectToLogin()
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
