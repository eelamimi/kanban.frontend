import { useEffect, useState } from 'react'
import teamsAPI from '../api/teamsAPI'

export const useTeams = () => {
    const [teams, setTeams] = useState([])
    const [isLoadingTeams, setIsLoadingTeams] = useState(true)

    useEffect(() => {
        async function fetchTeams() {
            try {
                const response = await teamsAPI.getTeams()
                setTeams(response.teams)
            } catch (error) {
                console.error('Error fetching teams:', error)
            } finally {
                setIsLoadingTeams(false)
            }
        }

        fetchTeams()
    }, [])

    return { teams, isLoadingTeams }
}