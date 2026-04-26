import axiosInstance from './axiosConfig'

const ATTACHMENT_URL = 'api/attachments'

const attachmentAPI = {
    get: async (request) => {
        try {
            const response = await axiosInstance.get(`${ATTACHMENT_URL}/${request.id}`)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка получения приложения')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default attachmentAPI