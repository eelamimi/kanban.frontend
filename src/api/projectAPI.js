import axiosInstance from './axiosConfig'

const PROJECT_URL = 'api/projects'

const projectAPI = {
    get: async (projectId) => {
        try {
            const response = await axiosInstance.get(`${PROJECT_URL}/${projectId}`)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка загрузки проекта')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    update: async (request) => {
        try {
            const response = await axiosInstance.put(`${PROJECT_URL}`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка обновление проекта')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default projectAPI
