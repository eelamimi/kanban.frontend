import axiosInstance from './axiosConfig'

const COLUMN_URL = 'api/columns'

const columnAPI = {
    add: async (request) => {
        try {
            const response = await axiosInstance.post(COLUMN_URL, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка добавления колонки')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    updatePosition: async (request) => {
        try {
            const response = await axiosInstance.put(`${COLUMN_URL}/updatePosition`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка обновления позиции')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    updateRelation: async (request) => {
        try {
            const response = await axiosInstance.put(`${COLUMN_URL}/updateRelation`, request)
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