import axiosInstance from './axiosConfig'

const COMMENTARY_URL = 'api/commentaries'

const commentaryAPI = {
    updateContent: async (request) => {
        try {
            const response = await axiosInstance.post(`${COMMENTARY_URL}/updateContent`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка обновления комментария')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default commentaryAPI