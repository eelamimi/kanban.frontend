import axiosInstance from './axiosConfig'

const INVITE_URL = 'api/invites'

const inviteAPI = {
    getToken: async (request) => {
        const response = await axiosInstance.post(INVITE_URL, request)
        return response.data
    },
}

export default inviteAPI