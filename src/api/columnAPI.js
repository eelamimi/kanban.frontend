import axiosInstance from './axiosConfig'

const COLUMN_URL = 'api/columns'

const columnAPI = {
    add: async (request) => {
        const response = await axiosInstance.post(COLUMN_URL, request)
        return response.data
    },
    updatePosition: async (request) => {
        const response = await axiosInstance.put(`${COLUMN_URL}/updatePosition`, request)
        return response.data
    },
    updateRelation: async (request) => {
        const response = await axiosInstance.put(`${COLUMN_URL}/updateRelation`, request)
        return response.data
    },
    update: async (request) => {
        await axiosInstance.put(COLUMN_URL, request)
    },
    delete: async (id) => {
        await axiosInstance.delete(`${COLUMN_URL}/${id}`)
    },
}

export default columnAPI