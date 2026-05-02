import axiosInstance from './axiosConfig'

const PROJECT_URL = 'api/projects'

const projectAPI = {
    get: async (projectId) => {
        const response = await axiosInstance.get(`${PROJECT_URL}/${projectId}`)
        return response.data
    },
    update: async (request) => {
        const response = await axiosInstance.put(`${PROJECT_URL}`, request)
        return response.data
    },
    add: async (request) => {
        const response = await axiosInstance.post(PROJECT_URL, request)
        return response.data
    },
}

export default projectAPI
