import axiosInstance from './axiosConfig'

const ROLES_URL = 'api/roles'

const rolesAPI = {
    add: async (request) => {
        try {
            const response = await axiosInstance.post(ROLES_URL, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка добавления роли')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    update: async (request) => {
        try {
            const response = await axiosInstance.put(ROLES_URL, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка изменения роли')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    delete: async (id) => {
        try {
            await axiosInstance.delete(`${ROLES_URL}/${id}`)
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.data || 'Ошибка удаления роли')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    updateUserRole: async (request) => {
        try {
            const response = await axiosInstance.put(`${ROLES_URL}/updateUserRole`, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.data || 'Ошибка изменения роли пользователя')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default rolesAPI