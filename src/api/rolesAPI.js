import axiosInstance from './axiosConfig'

const ROLES_URL = 'api/roles'

const rolesAPI = {
    add: async (request) => {
        const response = await axiosInstance.post(ROLES_URL, request)
        return response.data
    },
    update: async (request) => {
        const response = await axiosInstance.put(ROLES_URL, request)
        return response.data
    },
    delete: async (id) => {
        await axiosInstance.delete(`${ROLES_URL}/${id}`)
    },
    updateUserRole: async (request) => {
        const response = await axiosInstance.put(`${ROLES_URL}/updateUserRole`, request)
        return response.data
    },
}

export default rolesAPI