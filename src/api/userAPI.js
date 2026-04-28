import axiosInstance from './axiosConfig'

const USER_URL = 'api/user'

const userAPI = {
    getUserInfo: async (userId) => {
        try {
            const response = await axiosInstance.get(`${USER_URL}/${userId}`)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка загрузки пользователя')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    updateAvatar: async (formData) => {
        try {
            const response = await axiosInstance.put(`${USER_URL}/avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка изменения аватара')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default userAPI
