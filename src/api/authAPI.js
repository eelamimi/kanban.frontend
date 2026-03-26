import axiosInstance from './axiosConfig'

const AUTH_URL = 'api/auth'

const authAPI = {
    registerUser: async (request) => {
        try {
            const response = await axiosInstance.post(`${AUTH_URL}/register`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка регистрации')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },

    loginUser: async (request) => {
        try {
            const response = await axiosInstance.post(`${AUTH_URL}/login`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка авторизации')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },

    verifyToken: async (request) => {
        try {
            const response = await axiosInstance.post(`${AUTH_URL}/verify`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Токен недействителен')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default authAPI
