import axiosInstance from './axiosConfig'

const AUTH_URL = 'api/auth'

const authAPI = {
    registerUser: async (request) => {
        const response = await axiosInstance.post(`${AUTH_URL}/register`, request)
        return response.data
    },
    loginUser: async (request) => {
        const response = await axiosInstance.post(`${AUTH_URL}/login`, request)
        return response.data
    },
    verifyToken: async (request) => {
        const response = await axiosInstance.post(`${AUTH_URL}/verify`, request)
        return response.data
    },
}

export default authAPI
