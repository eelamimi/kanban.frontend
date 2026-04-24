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
}

export default teamsAPI
