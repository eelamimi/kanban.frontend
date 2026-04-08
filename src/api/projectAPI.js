import axiosInstance from './axiosConfig'

const PROJECT_URL = 'api/projects'

const projectAPI = {
    getProject: async (projectId) => {
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
    moveIssue: async (request) => {
        try {
            const response = await axiosInstance.post(`${PROJECT_URL}/moveIssue`, request)
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
}

export default projectAPI
