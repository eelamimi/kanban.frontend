import axiosInstance from './axiosConfig'

const USER_URL = 'api/user'

const userAPI = {
    getUserInfo: async (userId) => {
        try {
            const response = await axiosInstance.get(`${USER_URL}/${userId}`)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка загрузки пользователя')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default userAPI
