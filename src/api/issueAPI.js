import axiosInstance from './axiosConfig'

const ISSUE_URL = 'api/issues'

const issueAPI = {
    get: async (request) => {
        const response = await axiosInstance.get(`${ISSUE_URL}/${request.issuePublicId}`, {
            headers: {
                'ProjectId': request.projectId
            }
        })
        return response.data
    },
    addIssue: async (formData) => {
        const response = await axiosInstance.post(ISSUE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },
    update: async (formData) => {
        const response = await axiosInstance.put(ISSUE_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },
    moveIssue: async (request) => {
        const response = await axiosInstance.post(`${ISSUE_URL}/moveIssue`, request)
        return response.data
    },
    addCommentary: async (formData) => {
        const response = await axiosInstance.post(`${ISSUE_URL}/commentary`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },
}

export default issueAPI