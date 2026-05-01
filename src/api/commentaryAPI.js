import axiosInstance from './axiosConfig'

const COMMENTARY_URL = 'api/commentaries'

const commentaryAPI = {
    updateContent: async (request) => {
        const response = await axiosInstance.post(`${COMMENTARY_URL}/updateContent`, request)
        return response.data
    },
    delete: async (id) => {
        await axiosInstance.delete(`${COMMENTARY_URL}/${id}`)
    },
}

export default commentaryAPI
