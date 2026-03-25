import axiosInstance from './axiosConfig'

const TEAMS_URL = 'api/teams'

const teamsAPI = {
    getTeams: async () => {
        try {
            const response = await axiosInstance.get(`${TEAMS_URL}`)
            return response.data
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data?.message || 'Ошибка регистрации')
            } else if (error.request) {
                throw new Error('Сервер не отвечает')
            } else {
                throw new Error(error.message)
            }
        }
    },
}

export default teamsAPI
