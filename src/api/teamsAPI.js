import axiosInstance from './axiosConfig'

const TEAMS_URL = 'api/teams'

const teamsAPI = {
    getTeams: async (userId) => {
        try {
            const response = await axiosInstance.get(`${TEAMS_URL}?personUserId=${userId}`)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка загрузки команд')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    getTeam: async (teamId) => {
        try {
            const response = await axiosInstance.get(`${TEAMS_URL}/${teamId}`)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка загрузки команды')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    addTeam: async (request) => {
        try {
            const response = await axiosInstance.post(TEAMS_URL, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка добавления команды')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
    update: async (request) => {
        try {
            const response = await axiosInstance.put(TEAMS_URL, request)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response?.message || 'Ошибка изменения команды')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default teamsAPI
