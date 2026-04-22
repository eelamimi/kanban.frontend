import axiosInstance from './axiosConfig'

const ISSUE_URL = 'api/issues'

const issueAPI = {
    get: async (request) => {
        try {
            const response = await axiosInstance.get(`${ISSUE_URL}/${request.issuePublicId}`, {
                headers: {
                    'ProjectId': request.projectId
                }
            })
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка получения проблемы')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    addIssue: async (formData) => {
        try {
            const response = await axiosInstance.post(ISSUE_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка добавления проблемы')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    moveIssue: async (request) => {
        try {
            const response = await axiosInstance.post(`${ISSUE_URL}/moveIssue`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка перемещение проблемы')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    addCommentary: async (request) => {
        try {
            const response = await axiosInstance.post(`${ISSUE_URL}/commentary`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка добавления комментария')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default issueAPI