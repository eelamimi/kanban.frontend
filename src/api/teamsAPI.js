import axiosInstance from './axiosConfig'

const TEAMS_URL = 'api/teams'

const teamsAPI = {
    getTeams: async (userId) => {
        const response = await axiosInstance.get(`${TEAMS_URL}?personUserId=${userId}`)
        return response.data
    },
    getTeam: async (teamId) => {
        const response = await axiosInstance.get(`${TEAMS_URL}/${teamId}`)
        return response.data
    },
    addTeam: async (request) => {
        const response = await axiosInstance.post(TEAMS_URL, request)
        return response.data
    },
    update: async (request) => {
        const response = await axiosInstance.put(TEAMS_URL, request)
        return response.data
    },
    deleteUser: async (teamId, userProfileId) => {
        const response = await axiosInstance.delete(`${TEAMS_URL}/${teamId}/${userProfileId}`)
        return response.data
    },
}

export default teamsAPI
