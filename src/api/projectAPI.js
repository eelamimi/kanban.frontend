import axiosInstance from './axiosConfig'

const PROJECTS_URL = 'api/projects'

const projectsAPI = {
    getProject: async (projectId) => {
        try {
            const response = await axiosInstance.get(`${PROJECTS_URL}/${projectId}`)
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

export default projectsAPI
