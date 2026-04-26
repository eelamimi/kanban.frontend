import axios from 'axios'
import AuthService from '../service/AuthService'
import { showError } from '../utils/errorHandler'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
    timeout: 30_000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const { token, userProfileId } = AuthService.getUserInfo()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            config.headers.UserProfileId = userProfileId
        }

        if (config.data instanceof FormData) {
            delete config.headers['Content-Type']
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
        if (error.code === 'ERR_NETWORK') {
            showError('Сервер не отвечает')
        }
        else {
            const message = error.response.data
            if (message)
                showError(message)
        }
        if (error.response?.status === 401) {
            showError('Вы не авторизованы')
            AuthService.clearUserInfo()
            AuthService.redirectToLogin()
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
