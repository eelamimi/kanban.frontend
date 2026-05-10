import { useCallback, useState } from 'react'
import teamsAPI from '../api/teamsAPI'
import AuthService from '../service/AuthService'

export const useTeams = () => {
    const [teams, setTeams] = useState([])
    const [isLoadingTeams, setIsLoadingTeams] = useState(true)
    const [navTeams, setNavTeams] = useState([])

    const loadTeamsByUserId = useCallback(async (userId) => {
        try {
            const response = await teamsAPI.getTeams(userId)
            setTeams(response)

            const curUserId = AuthService.getUserInfo().userProfileId
            if (userId === curUserId) {
                setNavTeams(response)
            } else {
                const navTeams = await teamsAPI.getTeams(curUserId)
                setNavTeams(navTeams)
            }
        } catch (error) {
            console.error('Error fetching teams:', error)
        } finally {
            setIsLoadingTeams(false)
        }
    }, [])

    return {
        teams,
        setTeams,
        isLoadingTeams,
        loadTeamsByUserId,
        navTeams,
    }
}