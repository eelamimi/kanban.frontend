import axiosInstance from './axiosConfig'

const ISSUE_URL = 'api/issues'

const issueAPI = {
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
}

export default issueAPI