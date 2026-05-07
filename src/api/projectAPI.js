import axiosInstance from './axiosConfig'

const PROJECT_URL = 'api/projects'

const projectAPI = {
    get: async (projectId, authorId = '', assigneeId = '') => {
        const params = new URLSearchParams()
        if (authorId) params.append('authorId', authorId)
        if (assigneeId) params.append('assigneeId', assigneeId)

        const queryString = params.toString()
        const url = queryString
            ? `${PROJECT_URL}/${projectId}?${queryString}`
            : `${PROJECT_URL}/${projectId}`

        const response = await axiosInstance.get(url)
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
