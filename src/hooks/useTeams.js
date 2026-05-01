import { useCallback, useState } from 'react'
import teamsAPI from '../api/teamsAPI'

export const useTeams = () => {
    const [teams, setTeams] = useState([])
    const [isLoadingTeams, setIsLoadingTeams] = useState(true)

    const loadTeamsByUserId = useCallback(async (userId) => {
        try {
            const response = await teamsAPI.getTeams(userId)
            setTeams(response)
        } catch (error) {
            console.error('Error fetching teams:', error)
        } finally {
            setIsLoadingTeams(false)
        }
    }, [])

    return { teams, setTeams, isLoadingTeams, loadTeamsByUserId }
}