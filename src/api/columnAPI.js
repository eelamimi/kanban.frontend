import axiosInstance from './axiosConfig'

const COLUMN_URL = 'api/columns'

const columnAPI = {
    updateRelation: async (request) => {
        try {
            const response = await axiosInstance.post(`${COLUMN_URL}/updateRelation`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка обновления связи')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default columnAPI