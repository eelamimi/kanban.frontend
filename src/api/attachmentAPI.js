import axiosInstance from './axiosConfig'

const ATTACHMENT_URL = 'api/attachments'

const attachmentAPI = {
    get: async (request) => {
        const response = await axiosInstance.get(`${ATTACHMENT_URL}/${request.id}`, {
            headers: { 'ProjectId': request.projectId }
        })
        return response.data
    },
}

export default attachmentAPI
