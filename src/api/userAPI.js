import axiosInstance from './axiosConfig'

const USER_URL = 'api/user'

const userAPI = {
    getUserInfo: async (userId) => {
        const response = await axiosInstance.get(`${USER_URL}/${userId}`)
        return response.data
    },
    updateAvatar: async (formData) => {
        const response = await axiosInstance.put(`${USER_URL}/avatar`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data
    },
}

export default userAPI
